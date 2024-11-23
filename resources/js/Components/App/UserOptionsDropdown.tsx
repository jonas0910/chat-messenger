import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  ShieldCheckIcon,
  Square2StackIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { Fragment } from 'react/jsx-runtime';

interface UserOptionsDropdownProps {
    conversation: any;
}
const UserOptionsDropdown = ({conversation}:UserOptionsDropdownProps) => {
    const onBlockUser = ()=>{
        console.log('Block user');
    }
    const changeUserRole = ()=>{
        console.log('Change user role');
    }
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className='p-1'>
                            <Menu.Item>
                                {
                                    ({active})=>(
                                        <button
                                            onClick={onBlockUser}
                                            className={`${
                                                active
                                                ? "bg-black/20 text-white"
                                                : "text-gray-100" 
                                            }   group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {conversation.blocked_at && (
                                                <>
                                                    <LockOpenIcon className="w-5 h-5 mr-2" />
                                                    Unblock User
                                                </>
                                            )}
                                            {!conversation.blocked_at && (
                                                <>
                                                    <LockClosedIcon className="w-5 h-5 mr-2" />
                                                    Block User
                                                </>
                                            )}
                                        </button>
                                    )
                                }
                            </Menu.Item>
                        </div>
                        <div className='p-1'>
                            <Menu.Item>
                                {
                                    ({active})=>(
                                        <button
                                            onClick={changeUserRole}
                                            className={`${
                                                active
                                                ? "bg-black/20 text-white"
                                                : "text-gray-100" 
                                            }   group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                        >
                                            {conversation.is_admin && (
                                                <>
                                                    <UserIcon className="w-5 h-5 mr-2" />
                                                    Make regular user
                                                </>
                                            )}
                                            {!conversation.is_admin && (
                                                <>
                                                    <ShieldCheckIcon className="w-5 h-5 mr-2" />
                                                    Make admin
                                                </>
                                            )}
                                        </button>
                                    )
                                }
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default UserOptionsDropdown;