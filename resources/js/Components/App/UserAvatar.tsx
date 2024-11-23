interface UserAvatarProps {
    user: any;
    isOnline?: boolean;
    profile?: boolean;
}
const UserAvatar = ({ user, isOnline, profile = false }: UserAvatarProps) => {
    let onlineClass = isOnline ? "online" : "offline";

    const sizeClass = profile ? "w-40" : "w-10";
    return <div>
        {
            user.avatar_url && (
                <div className={`chat-image avatar ${onlineClass}`}>
                    <div className={`rounded-full ${sizeClass}`}>
                        <img src={user.avatar_url} alt="User" />
                    </div>
                </div>
            )
        }
        {
            !user.avatar_url && (
                <div className={`chat-image avatar placeholder ${onlineClass}`}>
                    <div className={`rounded-full ${sizeClass} bg-gray-200 text-gray-500`}>
                        <span className="text-xl">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
            )
        }
    </div>;
};

export default UserAvatar;
