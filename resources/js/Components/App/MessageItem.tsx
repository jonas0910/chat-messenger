import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helpers";
import { Message } from "@/types/messages";
import MessageAttachments from "./MessageAttachments";
import { Attachment, PreviewAttachment } from "@/types/attachment";

interface MessageItemProps {
    message: Message;
    attachmentClick: (attachment: Attachment, index: number) => void;
}

const MessageItem = ({ message, attachmentClick } : MessageItemProps) => {
    const currentUser = usePage().props.auth.user;
    return (
        <div
            className={
                "chat " +
                (message.sender_id === currentUser.id
                    ? "chat-end"
                    : "chat-start"
                )
            }
        >
            {<UserAvatar user={message.sender} />}
            <div className="chat-header">
                {
                    message.sender_id !== currentUser.id
                        ? message.sender.name
                        : "You"
                }
                <time className="text-xs opacity-50 ml-2">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={
                    "chat-bubble relative " +
                    (message.sender_id === currentUser.id
                        ? "chat-bubble-info"
                        : "")   
                }
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                    <MessageAttachments 
                        attachments={message.attachments}
                        attachmentClick={attachmentClick}
                    />
                </div>
            </div>
        </div>
    );

};

export default MessageItem;