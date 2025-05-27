import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuUser } from 'react-icons/lu'
import Modal from '../Modal'
import AvatarGroup from '../AvatarGroup'

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tempSelectedUsers, setTempSelectedUsers] = useState([])

    const getAllUsers = async () => {
        try {
            // Fetch all users from the API
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
            if (response.data?.length > 0) {
                // Set the fetched users to state
                setAllUsers(response.data)
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId); // Remove
            } else {
                return [...prev, userId]; // Add
            }
        });
    };


    const handleAssign = () => {
        // Update the selected users state with the temporary selection
        setSelectedUsers(tempSelectedUsers)
        // Close the modal
        setIsModalOpen(false)
    }

    const selectedUserAvatar = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl);

    useEffect(() => {
        // Fetch all users when the component mounts
        getAllUsers()
    }, [])

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([])
        }

        return () => { }
    }, [selectedUsers])
    return (
        <div className='space-y-4 mt-2'>
            {selectedUserAvatar.length === 0 && (
                <button
                    className="w-full flex items-center gap-3 text-[14px] font-medium text-gray-700 hover:text-primary px-4 py-3 rounded-md border border-gray-200/50 hover:border-primary cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <LuUser className='text-base' /> Add Members
                </button>
            )}

            {selectedUserAvatar.length > 0 && (
                <div className='cursor-pointer' onClick={() => setIsModalOpen(true)}>
                    <AvatarGroup
                        avatars={selectedUserAvatar}
                        maxVisible={3}
                        className='w-full h-10'
                    />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Select Users"
            >

                <div className='space-y-4 h-[60vh] overflow-y-auto'>
                    {allUsers.map((user) => (
                        <div
                            key={user._id}
                            className='flex items-center gap-4 p-3 border-b border-gray-200'
                        >
                            <img
                                src={user.profileImageUrl || '../../../public/picDefault.png'}
                                alt={user.name}
                                className='w-10 h-10 rounded-full' />

                            <div className='flex-1'>
                                <p className='font-medium text-gray-800 '>
                                    {user.name}
                                </p>
                                <p className='text-[13px] text-gray-500'>
                                    {user.email}
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                checked={tempSelectedUsers.includes(user._id)}
                                onChange={() => toggleUserSelection(user._id)}
                                className='w-4 h-4 text-primary bg-gray-300 border-gray-300 rounded-sm outline-none'
                            />
                        </div>
                    ))}
                </div>

                <div className='flex justify-end gap-4 pt-4'>
                    <button
                        className='card-btn'
                        onClick={() => setIsModalOpen(false)}>
                        CANCEL
                    </button>
                    <button
                        className='card-btn-fill'
                        onClick={handleAssign}>
                        DONE
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SelectUsers