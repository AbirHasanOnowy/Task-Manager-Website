import { createContext, useState, useEffect, Children } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        if (!token) {
            setLoading(false)
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE)
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
            } catch (error) {
                console.error('Failed to fetch user profile:', error)
                clearUser()
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])


    const updateUser = async (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', userData.token)
        setLoading(false)
    }


    const clearUser = () => {
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }



    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}
