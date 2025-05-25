import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, onChange, type, label, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <label className="text-[13px]  text-slate-800">{label}</label>
            <div className='input-box'>
                <input
                    type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
                    value={value}
                    onChange={(e) => onChange(e)}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                />

                {type === 'password' && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </>
                )
                }
            </div>
        </div>
    )
}

export default Input