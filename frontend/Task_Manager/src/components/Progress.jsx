import React from 'react'

const Progress = ({ progress, status }) => {
    const getColor = (status) => {
        switch (status) {
            case 'In Progress':
                return 'text-cyan-500 bg-cyan-200 border border-cyan-500/10';
            case 'Completed':
                return 'text-indigo-500 bg-indigo-50 border border-indigo-500/20';
            case 'Pending':
                return 'text-violet-500 bg-violet-50 border border-violet-500/10';
            default:
                return 'text-yellow-500 bg-yellow-50 border border-yellow-500/10';
        }
    }

    return (
        <div className='w-full bg-gray-200 rounded-full h-1.5'>
            <div className={`${getColor(status)} h-1.5 rounded-full text-center text-xs font-medium`}
                style={{ width: `${progress}%` }}>
            </div>
        </div>
    )
}

export default Progress