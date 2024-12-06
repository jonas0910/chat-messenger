import { User } from ".";

export type Conversation = {
    id: number;
    is_group: boolean;
    is_user: boolean;
    name: string;
    image: string;
    id_key: string;
    users: User[];
};