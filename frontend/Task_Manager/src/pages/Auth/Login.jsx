import AuthLayout from '../../components/layouts/AuthLayout'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { updateUser } = useContext(UserContext) // Assuming UserContext is imported

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (!password) {
            setError('Password is required')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            return
        }

        setError('') // Clear any previous error messages
        try {
            setLoading(true) // Set loading state to true
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            })

            const { token, role } = response.data

            if (token) {
                localStorage.setItem('token', token)
                updateUser(response.data) // Assuming updateUser is a function to update user context

                if (role === 'admin') {
                    navigate('/admin/dashboard')
                } else if (role === 'member') {
                    navigate('/user/dashboard')
                }
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message)
            } else {
                setError('An error occurred while logging in. Please try again.')
            }
        } finally {
            setLoading(false) // Reset loading state
        }
    }
    return (
        <AuthLayout>
            <div className="lg:w-70% h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black"> Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to login</p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        label="Email Address"
                        placeholder="yourmail@email.com"
                    />

                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label="User Password"
                        placeholder="Min 8 characters"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                        onClick={handleLogin}
                        disabled={loading} // Disable button while loading
                    >
                        LOGIN
                    </button>
                    <div className="text-[13px] text-slate-800 mt-3 text-center">
                        <p>Don't have an account? {"   "}<Link to="/signup" className="font-medium text-primary hover:underline">SignUp</Link></p>
                    </div>
                </form>
            </div>
        </AuthLayout >
    )
}

export default Login