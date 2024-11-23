import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageItem from "@/Components/App/MessageItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import { useEffect, useRef, useState } from "react";

interface HomeProps {
    selectedConversation: any; // Replace 'any' with the appropriate type if known
    messages: any; // Replace 'any' with the appropriate type if known
}

function Home({ selectedConversation = null, messages = null }: HomeProps) {
    const [localMessages, setLocalMessages] = useState(messages);
    const messagesCtrRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setTimeout(() => {
        if (messagesCtrRef.current) {
            messagesCtrRef.current.scrollTop = messagesCtrRef.current.scrollHeight;
        }
      }, 10);
    }, [selectedConversation]);
    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);
    return (
        <>
            {!messages && (
                <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-16 text-slate-200">
                        Please select conversation to see messages
                    </div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader
                        selectedConversation={selectedConversation}
                    />
                    <div
                        ref={messagesCtrRef}
                        className="flex-1 p-5 overflow-y-auto"
                        style={{ height: "calc(100vh - 164px)" }}
                    >
                        {localMessages.length === 0 && (
                            <div className="flex justify-center items-center h-full ">
                                <div className="text-lg text-slate-200">
                                    No messages found
                                </div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex-1 flex flex-col ">
                                {localMessages.map((message: any) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* <MessageInput conversation={selectedConversation}/> */}
                </>
            )}
        </>
    );
}

Home.layout = (page: React.ReactNode) => {
    return (
        <AuthenticatedLayout>
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    );
};

export default Home;
