import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageInput from "@/Components/App/MessageInput";
import MessageItem from "@/Components/App/MessageItem";
import { useEventBus } from "@/EventBus";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Conversation } from "@/types/conversation";
import { Message, MessageGet } from "@/types/messages";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Attachment, PreviewAttachment } from "@/types/attachment";
import AttachmentPreviewModal from "@/Components/App/AttachmentPreviewModal";

interface HomeProps {
    selectedConversation: Conversation | null; // Replace 'any' with the appropriate type if known
    messages: MessageGet | null; // Replace 'any' with the appropriate type if known
}



function Home({ selectedConversation = null, messages = null }: HomeProps) {
    const [noMoreMessages, setNoMoreMessages] = useState(false);
    const [scrollFromBottom, setScrollFromBottom] = useState<number | null>(
        null
    );
    const loadMoreIntersect = useRef<HTMLDivElement>(null);
    const [localMessages, setLocalMessages] = useState<Message[]>([]);
    const messagesCtrRef = useRef<HTMLDivElement>(null);
    const [showAttachmentPreview, setShowAttachmentPreview] = useState(false);
    const defaultAttachment: PreviewAttachment = { attachments: null, index: null };
    const [previewAttachment, setPreviewAttachment] = useState<PreviewAttachment>(defaultAttachment);

    const { on } = useEventBus();
    const messageCreated = (message: Message) => {
        if (
            selectedConversation &&
            selectedConversation?.is_group &&
            selectedConversation?.id == message.group_id
        ) {
            setLocalMessages((prevMessages: Message[]) => {
                return [...prevMessages, message];
            });
        }
        if (
            selectedConversation &&
            selectedConversation?.is_user &&
            // true
            (selectedConversation?.id === message.sender_id ||
                selectedConversation?.id == message.receiver_id)
        ) {
            setLocalMessages((prevMessages: Message[]) => {
                return [...prevMessages, message];
            });
        }
    };

    const loadMoreMessages = useCallback(() => {
        if (noMoreMessages) {
            return;
        }
        const firstMessage = localMessages[0];
        axios
            .get(route("message.loadOlder", firstMessage.id))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true);
                    return;
                }
                const scrollHeight = messagesCtrRef.current?.scrollHeight;
                const scrollTop = messagesCtrRef.current?.scrollTop;
                const clientHeight = messagesCtrRef.current?.clientHeight;
                const tmpScrollFromBottom =
                    scrollHeight! - scrollTop! - clientHeight!;
                console.log(tmpScrollFromBottom);
                setScrollFromBottom(scrollHeight! - scrollTop! - clientHeight!);

                setLocalMessages((prevMessages: Message[]) => {
                    return [...data.data.reverse(), ...prevMessages];
                });
            });
    }, [localMessages, noMoreMessages]);

    const onAttachmentClick = (a: Attachment, ind: number) => {
        setPreviewAttachment({ attachments: a, index: ind });
        setShowAttachmentPreview(true);
    };

    useEffect(() => {
        setTimeout(() => {
            if (messagesCtrRef.current) {
                messagesCtrRef.current.scrollTop =
                    messagesCtrRef.current.scrollHeight;
            }
        }, 10);

        const offCreated = on("message.created", messageCreated);
        setScrollFromBottom(0);
        setNoMoreMessages(false);
        return () => {
            offCreated();
        };
    }, [selectedConversation]);
    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
        // setLocalMessages(messages ? messages : []);
    }, [messages]);

    useEffect(() => {
        if (messagesCtrRef.current && scrollFromBottom !== null) {
            messagesCtrRef.current.scrollTop =
                messagesCtrRef.current.scrollHeight -
                messagesCtrRef.current.offsetHeight -
                scrollFromBottom;
        }

        if (noMoreMessages) {
            return;
        }

        const obserser = new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (entry) => entry.isIntersecting && loadMoreMessages()
                );
            },
            {
                rootMargin: "0px 0px 250px 0px",
            }
        );
        if (loadMoreIntersect.current) {
            setTimeout(() => {
                obserser.observe(loadMoreIntersect.current!);
            }, 100);
        }

        return () => {
            obserser.disconnect();
        };
    }, [localMessages]);
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
                        style={{ height: "calc(100vh - 200px)" }}
                    >
                        {localMessages?.length === 0 && (
                            <div className="flex justify-center items-center h-full ">
                                <div className="text-lg text-slate-200">
                                    No messages found
                                </div>
                            </div>
                        )}
                        {localMessages?.length > 0 && (
                            <div className="flex-1 flex flex-col ">
                                <div
                                    ref={loadMoreIntersect}
                                    style={{ height: "1px" }}
                                ></div>
                                {localMessages.map((message: Message) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                        attachmentClick={onAttachmentClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
            {previewAttachment.attachments && (
                <AttachmentPreviewModal
                    attachments={previewAttachment.attachments}
                    index={previewAttachment.index}
                    show={showAttachmentPreview}
                    onClose={() => setShowAttachmentPreview}
                />
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
