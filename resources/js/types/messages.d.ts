import { User } from ".";
import { Attachment } from "./attachment";

interface MessageBase {
    id: number;
    sender_id: number;
    receiver_id: number;
    group_id: number;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface Message extends MessageBase {
    sender: User;
    attachments: Attachment[];
}
export interface MessageGet extends MessageBase {
    data: Message[];
}