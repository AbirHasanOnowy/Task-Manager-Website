import toast from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect, useState } from 'react'
import { LuFileSpreadsheet } from 'react-icons/lu'
import UserCard from '../../components/cards/UserCard'

const ManageUsers = () => {
    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
            if (response.data?.length > 0) {
                setAllUsers(response.data)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Failed to fetch users")
        }
    }

    // Download task report
    const handleDownloadReport = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
                responseType: 'blob' // Important for downloading files
            })
            // Create a URL for the blob response
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'user_details.xlsx') // Set the file name
            document.body.appendChild(link)
            link.click()
            // document.body.removeChild(link)
            link.parentNode.removeChild(link) // Clean up the link element 
            window.URL.revokeObjectURL(url) // Free up memory
        } catch (error) {
            console.error("Error downloading report:", error)
            toast.error("Failed to download report")
        }
    }


    useEffect(() => {
        getAllUsers()
        return () => { }
    }, [])
    return (
        <DashboardLayout activeMenu="Team Members">
            <div className='mt-5 mb-10'>
                <div className='flex md:flex-row md:items-center justify-between'>
                    <h2 className='text-xl md:text-xl font-medium'>
                        Team Members
                    </h2>
                    <button className='flex md:flex download-btn'
                        onClick={handleDownloadReport}>
                        <LuFileSpreadsheet className='text-lg' />
                        Download Report
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-4 mt-4'>
                    {allUsers?.map((user) => (
                        <UserCard key={user._id} userInfo={user} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ManageUsers