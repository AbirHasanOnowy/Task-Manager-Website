import React from 'react'

const AuthLayout = ({ children }) => {
    return <div className='flex '>
        <div className='w-full h-[100vh] md:w-[60vw] px-12 pt-8 pb-12'>
            <h2 className='text-lg font-medium text-black'>Task Manager</h2>
            {children}
        </div>

        <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bluebg.jpg')] bg-cover bg-no-repeat bg-center overflow-hidden">
            {/* <img src="/bluebg.jpg" alt="front" className='w-64 lg:w-[90%]' /> */}
        </div>

    </div>
}

export default AuthLayout