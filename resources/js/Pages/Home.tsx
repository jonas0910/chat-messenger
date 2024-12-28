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
    const defaultAttachment: PreviewAttachment = {
        attachments: null,
        index: null,
    };
    const [previewAttachment, setPreviewAttachment] =
        useState<PreviewAttachment>(defaultAttachment);

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
        // <>
        //     <div className="h-3/4 flex flex-col bg-gray-100">
        //         {/* Nombre (Siempre visible) */}
        //         <div className="bg-blue-500 text-white p-4">
        //             Aquí va el nombre, esto siempre se muestra
        //         </div>

        //         {/* Mensajes (Cambia de tamaño dinámicamente) */}
        //         <div className="flex-1 overflow-y-auto p-4">
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //             {/* Aquí irán los mensajes */}
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Hola, ¿cómo estás?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 ¡Todo bien! ¿Y tú?
        //             </div>
        //             <div className="bg-gray-200 p-2 mb-2 rounded">
        //                 Estoy bien, gracias.
        //             </div>
        //         </div>

        //         {/* Input (Crece hacia arriba cuando se escribe) */}
        //         <div className="bg-gray-200 p-4">
        //             <textarea
        //                 id="input"
        //                 className="w-full resize-none overflow-hidden bg-white text-black p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 rows={1}
        //                 placeholder="Escribe un mensaje..."
        //                 onInput={(e) => {
        //                     // Ajustar dinámicamente el alto del textarea
        //                     (e.target as HTMLTextAreaElement).style.height =
        //                         "auto";
        //                     (e.target as HTMLTextAreaElement).style.height = `${
        //                         (e.target as HTMLTextAreaElement).scrollHeight
        //                     }px`;
        //                 }}
        //             ></textarea>
        //         </div>
        //     </div>
        // </>
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
                    <div className="h-[calc(100vh-50px)] flex flex-col relative">
                        <ConversationHeader
                            selectedConversation={selectedConversation}
                        />
                        <div
                            ref={messagesCtrRef}
                            // className=" p-5 overflow-y-auto max-h-[calc(100vh-180px)] "
                            className="flex-1 max-h-[calc(100vh-180px)]  overflow-y-auto p-4"
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
                    </div>
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
