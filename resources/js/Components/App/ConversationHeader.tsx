import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import { Link } from "@inertiajs/react"
import UserAvatar from "./UserAvatar"
import GroupAvatar from "./GroupAvatar"

type ConversationHeaderProps = {
	selectedConversation: {
		is_user: boolean;
		is_group: boolean;
		name: string;
		users: { length: number };
	};
};

const ConversationHeader = ({ selectedConversation }: ConversationHeaderProps) => {
	
	return (
		<>
			{selectedConversation && (
				<div className="p-3 flex justify-between items-center border-b border-slate-700">
					<div className="flex items-center gap-3">
						<Link
							href={route('dashboard')}
							className="inline-block sm:hidden"
						>
							<ArrowLeftIcon className="w-6" />
						</Link>
						{
							selectedConversation.is_user && (
								<UserAvatar user={selectedConversation} />
							)
						}
						{selectedConversation.is_group && <GroupAvatar/>}
						<div>
							<h3>{selectedConversation.name}</h3>
							{selectedConversation.is_group && (
								<p className="text-xs text-slate-200">
									{selectedConversation.users.length} members
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default ConversationHeader;