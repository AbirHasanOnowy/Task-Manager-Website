import { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePictureSelector = ({ image, setImage }) => {
    const imageRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)

            // Create a preview URL for the selected image
            // const reader = new FileReader()
            // reader.onloadend = () => {
            //     setPreviewUrl(reader.result)
            // }
            // reader.readAsDataURL(file)
            const preview = URL.createObjectURL(file)
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
        if (imageRef.current) {
            imageRef.current.value = ''
        }
    }

    const onChooseFile = () => {
        if (imageRef.current) {
            imageRef.current.click()
        }
    }



    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
                    <LuUser className="text-4xl text-primary" />

                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            )

                : (
                    <div className='relative'>
                        <img
                            src={previewUrl || URL.createObjectURL(image)}
                            alt="Profile Picture"
                            className='w-20 h-20 rounded-full object-cover'
                        />
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                            onClick={handleRemoveImage}
                        >
                            <LuTrash />
                        </button>
                    </div>
                )}
        </div>
    )
}

export default ProfilePictureSelector