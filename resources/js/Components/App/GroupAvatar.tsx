import { UsersIcon } from "@heroicons/react/16/solid";

interface GroupAvatarProps {
    group?: any;
}
const GroupAvatar = ({group}:GroupAvatarProps)=>{
    return (
        <div>
            <div className={`avatar placeholder`}>
                <div className={`bg-gray-400 text-gray-800 rounded-full w-8`}>
                    <span className="text-xl">
                        <UsersIcon className="w-4" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default GroupAvatar;