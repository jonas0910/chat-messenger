import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "./UserAvatar";
import { formatMessageDateLong } from "@/helpers";

interface Message {
    sender_id: number;
    sender: {
        name: string;
    };
    created_at: string;
    message: string;
}

interface MessageItemProps {
    message: Message;
    attachmentClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, attachmentClick }) => {
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
                </div>

            </div>
        </div>
    );

};

export default MessageItem;