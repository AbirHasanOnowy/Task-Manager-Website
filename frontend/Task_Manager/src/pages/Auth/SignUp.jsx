import { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper'
import ProfilePictureSelector from '../../components/Inputs/ProfilePictureSelector'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
import axiosInstance from '../../utils/axiosInstance'
import { uploadImage } from '../../utils/uploadImage'

const SignUp = () => {
    const [profilePicture, setProfilePicture] = useState(null)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [adminInvitationToken, setAdminInvitationToken] = useState('')

    const [error, setError] = useState(null)

    const { updateUser } = useContext(UserContext) // Assuming UserContext is imported

    const navigate = useNavigate()

    let profileImageUrl = ''
    let profileImagePublicId = ''


    const handleSignup = async (e) => {
        e.preventDefault()

        if (!profilePicture) {
            setError('Profile picture is required')
            return
        }

        if (!fullName) {
            setError('Full name is required')
            return
        }

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

        // Upload profile picture if provided
        if (profilePicture) {
            const uploadedImage = await uploadImage(profilePicture)
            profileImageUrl = uploadedImage.url || '';
            profileImagePublicId = uploadedImage.publicId || '';
        }

        try {
            const responde = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
                profileImagePublicId,
                adminInvitationToken
            });
            const { token, role } = responde.data
            if (token) {
                localStorage.setItem('token', token)
                updateUser(responde.data) // Assuming updateUser is a function to update user context
                // Assuming you have a function to update user context or state
                // updateUser(responde.data)

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
                setError('An error occurred while Signing up. Please try again.')
            }
        }
    }
    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details bellow</p>
                <form onSubmit={handleSignup}>
                    <ProfilePictureSelector image={profilePicture} setImage={setProfilePicture} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                            label="Full Name"
                            required
                        />

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

                        <Input
                            value={adminInvitationToken}
                            onChange={(e) => setAdminInvitationToken(e.target.value)}
                            type="text"
                            label="Admin Invitation Token"
                            placeholder="6 Digit Code"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary"
                        onClick={handleSignup}>
                        SIGN UP
                    </button>

                    <div className="text-[13px] text-slate-800 mt-3 text-center">
                        <p>Already have an account? {"   "}<Link to="/login" className="font-medium text-primary hover:underline">Login</Link></p>
                    </div>
                </form>

            </div>
        </AuthLayout>
    )
}

export default SignUp