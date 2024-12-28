import ConversationItem from "@/Components/App/ConversationItem";
import TextInput from "@/Components/TextInput";
import { useEventBus } from "@/EventBus";
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/messages";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface ChatLayoutProps {
    children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
    const page = usePage();
    const conversations = page.props.conversations as [];
    console.log("conversationsssss",conversations);
    const selectedConversation = page.props.selectedConversation as Conversation;

    const [localConversations, setLocalConversations] = useState<any>([]);
    const [sortedConversations, setSortedConversations] = useState<any>([]);
    const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: any }>({});
    const isUserOnline = (userId: number) => onlineUsers[userId];
    const { on } = useEventBus();

    const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation: Conversation) => {
                return conversation.name.toLowerCase().includes(search);
            })
        );
    };

    const messageCreated = (message: Message) => {
        console.log("Message received for updating sidebar:", message);
        setLocalConversations((oldUsers: any) => {
            console.log("oldUsers", oldUsers);
            return oldUsers.map((user: any) => {
                if (
                    message.group_id && // Mensaje para un grupo
                    user.is_group &&
                    user.id == message.group_id
                ) {
                    return {
                        ...user,
                        last_message: message.message,
                        last_message_date: message.created_at,
                    };
                }
    
                if (
                    !message.group_id && // Mensaje directo
                    !user.is_group &&
                    (user.id == message.receiver_id || user.id == message.sender_id) 
                    // no puse el igual estricto (===) porque el id es un string y el otro es un number
                ) {
                    return {
                        ...user,
                        last_message: message.message,
                        last_message_date: message.created_at,
                    };
                }
    
                return user; // Si no aplica, devuelve la conversación sin cambios
            });
        });
    };
    

    useEffect(() => {
       const offCreated = on("message.created", messageCreated);
         return () => {
              offCreated();
         };
    }, [on]);


    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a: Conversation, b: Conversation) => {
                if (a.blocked_at && !b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        Echo.join("online")
            .here((users: any) => {
                const onlineUsersObject = Object.fromEntries(
                    users.map((user: { id: string }) => [user.id, user])
                );
                setOnlineUsers((prev) => ({ ...prev, ...onlineUsersObject }));
            })
            .joining((user: { id: string }) => {
                setOnlineUsers((prev) => ({ ...prev, [user.id]: user }));
            })
            .leaving((user: { id: string }) => {
                setOnlineUsers((prev) => {
                    const updatedUsers = { ...prev };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((error: any) => {
                console.error("error", error);
            });
    }, []);

    return (
        <>
            <div className="flex-1 flex overflow-hidden">
                <div
                    className={`transition-all w-1/4 sm:w-[220px] md:w-[300px] bg-slate-800
                    flex flex-col overflow-hidden ${
                        selectedConversation ? "-ml-[100%] sm:ml-0" : ""
                    }`}
                >
                    <div className="flex itms-center justify-between py-2 px-3 text-xl font-medium">
                        My conversations
                        <div
                            className="tooltip tooltp-left"
                            data-tip="Create new Group"
                        >
                            <button className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-6 h-6 inline-block ml-2s" />
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Search conversations"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                            sortedConversations.map((conversation: Conversation) => (
                                <ConversationItem
                                    key={`${
                                        conversation.is_group ? "group" : "user"
                                    }${conversation.id}`}
                                    conversation={conversation}
                                    isUserOnline={
                                        isUserOnline(conversation.id)
                                    }
                                    selectedConversation={selectedConversation}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex-1 h-screen flex-col">{children}</div>
            </div>
        </>
    );
};

export default ChatLayout;
