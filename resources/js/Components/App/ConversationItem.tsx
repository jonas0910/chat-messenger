import { PencilSquareIcon } from "@heroicons/react/16/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";
import UserOptionsDropdown from "./UserOptionsDropdown";
import { Link, usePage } from "@inertiajs/react";
import { formatMessageDateShort } from "@/helpers";
import { Conversation } from "@/types/conversation";
import { GenericRouteParamsObject, RouteParams } from "../../../../vendor/tightenco/ziggy/src/js";

interface ConversationItemProps {
    conversation: Conversation;
    selectedConversation: Conversation;
    isUserOnline: boolean;
}

const ConversationItem = (
    { conversation, selectedConversation, isUserOnline }: ConversationItemProps
) => {
    const page = usePage();
    const currentUser = page.props.auth.user as any;
    let classes = "flex items-center justify-between p-4 cursor-pointer";
    if (selectedConversation ) {
        if(!selectedConversation.is_group && !conversation.is_group && selectedConversation.id === conversation.id){
            classes = "border-blue-500 bg-black/20"
        }
        if(selectedConversation.is_group && conversation.is_group && selectedConversation.id === conversation.id){
            classes = "border-blue-500 bg-black/20"
        }
    }
    return (
        <Link
            href={
                conversation.is_group ?
                route("chat.group", { id: conversation.id }) :
                route("chat.user", { id: conversation.id })
            }
            preserveState
            className={"conversation-item flex items-center gap-2 p-2 text-gray-300 transition-all cursor-pointer border-l-4 hover:bg-black/30" +
                classes +
                (conversation.is_user && currentUser.is_admin 
                    ? " pr-2"
                    : " pr-4"
                )
            }
        >
            {conversation.is_user && (
                <UserAvatar user={conversation} isOnline={isUserOnline} />
            )}
            {conversation.is_group && (
                <GroupAvatar group={conversation} />
            )}
            <div
                className={
                    `flex-1 text-xs max-w-full overflow-hidden ` +
                    (conversation.is_user && conversation.blocked_at
                        ? "opacity-50"
                        : ""
                    )
                }
            >
                <div className="flex gap-1 justify-between items-center">
                    <h3 className="text-sm font-semibold overflow-hidden text-nowrap text-ellipsis">
                        {conversation.name}
                    </h3>
                    {conversation.last_message_date && (
                        <span className="text-nowrap">
                            {/* {conversation.last_message_date} */}
                            {
                                formatMessageDateShort(conversation.last_message_date)
                            }
                        </span>
                    )}
                </div>
                {conversation.last_message && (
                    <p className="text-xs text-nowrap overflow-hidden text-ellipsis">
                        {conversation.last_message}
                    </p>
                )}
            </div>
            {
                currentUser.is_admin && conversation.is_user && (
                    <UserOptionsDropdown conversation={conversation} />
                )
            }
        </Link>
    );
};

export default ConversationItem;