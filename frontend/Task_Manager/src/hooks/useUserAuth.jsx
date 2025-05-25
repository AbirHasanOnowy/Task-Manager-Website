import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return // Wait until loading is complete
        if (user) return // If user is already authenticated, do nothing
        if (!user) {
            clearUser() // Clear user data if not authenticated
            navigate('/login') // Redirect to login page
        } else {
            // User is authenticated, you can add any additional logic here if needed
        }
    }, [user, loading, clearUser, navigate])
    return (
        <div>useUserAuth</div>
    )
}

export default useUserAuth