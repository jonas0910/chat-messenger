import { User } from ".";

// export type Conversation = {
//     id: number;
//     is_group: boolean;
//     is_user: boolean;
//     name: string;
//     image: string;
//     id_key: string;
//     users: User[];
// };

interface ConversationBase {
    id: number;
    is_group: boolean;
    is_user: boolean;
    name: string;
    image: string;
    id_key: string;
}

export interface Conversation extends ConversationBase {
    users: User[];
    blocked_at: string;
    last_message_date: string;
    last_message: string;

}