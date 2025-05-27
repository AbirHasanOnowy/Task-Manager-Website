import { useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropdown from '../../components/Inputs/SelectDropdown'
import SelectUsers from '../../components/Inputs/SelectUsers'
import TodoListInput from '../../components/Inputs/TodoListInput'
import AddAttachmentsInput from '../../components/Inputs/AddAttachmentsInput'

const CreateTask = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { taskId } = location.state || {}

    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        assignedTo: [],
        todoChecklist: [],
        attachments: []
    })

    const [currentTask, setCurrentTask] = useState(null)

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

    const handleValueChange = (key, value) => {
        setTaskData((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const clearData = () => {
        setTaskData({
            title: '',
            description: '',
            priority: 'Low',
            dueDate: '',
            assignedTo: [],
            todoChecklist: [],
            attachments: []
        })
        setCurrentTask(null)
        setError(null)
        setLoading(false)
        setOpenDeleteAlert(false)
    }

    const createTask = async () => {
        setLoading(true)
        try {
            const todoList = taskData.todoChecklist.map(item => ({
                text: item,
                completed: false
            }))
            const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString(),
                todoChecklist: todoList
            })
            if (response.data) {
                toast.success("Task created successfully")
                clearData()
            } else {
                toast.error("Failed to create task")
            }
        } catch (error) {
            console.error("Error creating task:", error)
            toast.error("Failed to create task")
        } finally {
            setLoading(false)
        }
    }

    const updateTask = async () => { }

    const handleSubmit = async () => {
        setError(null)

        if (!taskData.title.trim()) {
            setError("Title is required")
            return
        }

        if (!taskData.description.trim()) {
            setError("Description is required")
            return
        }

        if (!taskData.dueDate) {
            setError("Due Date is required")
            return
        }

        if (taskData.assignedTo?.length === 0) {
            setError("At least one user must be assigned to the task")
            return
        }

        if (taskData.todoChecklist?.length === 0) {
            setError("At least one item must be added to the TODO checklist")
            return
        }

        if (taskId) {
            await updateTask()
            return
        }

        createTask()
    }

    const getTaskDetailsById = async (taskId) => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId))
            if (response.data) {
                setCurrentTask(response.data)
                setTaskData({
                    title: response.data.title,
                    description: response.data.description,
                    priority: response.data.priority,
                    dueDate: response.data.dueDate ? moment(response.data.dueDate).format('YYYY-MM-DD') : null,
                    assignedTo: response.data.assignedTo || [],
                    todoChecklist: response.data.todoChecklist || [],
                    attachments: response.data.attachments || []
                })
            }
        } catch (error) {
            console.error("Error fetching task details:", error)
            toast.error("Failed to fetch task details")
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))
            if (response.data) {
                toast.success("Task deleted successfully")
                navigate('/admin/tasks')
            }
        } catch (error) {
            console.error("Error deleting task:", error)
            toast.error("Failed to delete task")
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout activeMenu="Create Task">
            <div className='mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
                    <div className='form-card col-span-3'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-xl md:text-xl font-medium'>
                                {taskId ? 'Update Task' : 'Create Task'}
                            </h2>

                            {taskId && (
                                <button className='flex items-center gap-1.5 text-[13px] font-medium text-rose-50 rounded px-2 py-1 border border-rose-100 hover:bg-rose-300 cursor-pointer'
                                    onClick={() => setOpenDeleteAlert(true)}>
                                    <LuTrash2 className='text-base' />
                                    Delete
                                </button>
                            )}
                        </div>
                        {/* Task Form Bellow */}
                        <div className='mt-4'>
                            <label className='text-xs font-medium text-slate-600 '>
                                Task Title
                            </label>
                            <input
                                type='text'
                                value={taskData.title}
                                onChange={(e) => handleValueChange('title', e.target.value)}
                                className='form-input'
                                placeholder='Enter task title'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='text-xs font-medium text-slate-600 '>
                                Description
                            </label>
                            <textarea
                                value={taskData.description}
                                type='text'
                                rows={4}
                                onChange={(e) => handleValueChange('description', e.target.value)}
                                className='form-input'
                                placeholder='Enter task description'
                            />
                        </div>
                        <div className='grid grid-cols-12 gap-4 mt-2'>
                            <div className='col-span-6 md:col-span-4'>
                                <label className='text-xs font-medium text-slate-600'>
                                    Priority
                                </label>
                                <SelectDropdown
                                    options={PRIORITY_DATA}
                                    value={taskData.priority}
                                    onChange={(value) => handleValueChange('priority', value)}
                                    placeholder='Select priority'
                                />
                            </div>

                            <div className='col-span-6 md:col-span-4'>
                                <label className='text-xs font-medium text-slate-600 '>
                                    Due Date
                                </label>
                                <input
                                    type='date'
                                    value={taskData.dueDate !== null ? taskData.dueDate : ''}
                                    onChange={(e) => handleValueChange('dueDate', e.target.value)}
                                    className='form-input'
                                />
                            </div>

                            <div className='col-span-6 md:col-span-4'>
                                <label className='text-xs font-medium text-slate-600 '>
                                    Assigned To
                                </label>
                                <SelectUsers
                                    selectedUsers={taskData.assignedTo}
                                    setSelectedUsers={(users) => handleValueChange('assignedTo', users)}
                                />
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label className='text-xs font-medium text-slate-600'>
                                TODO Checklist
                            </label>

                            <TodoListInput
                                todoList={taskData?.todoChecklist}
                                setTodoList={(todo) => handleValueChange("todoChecklist", todo)}
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='text-xs font-medium text-slate-600 '>
                                Add Attachments
                            </label>
                            <AddAttachmentsInput
                                attachments={taskData.attachments}
                                setAttachments={(value) => handleValueChange('attachments', value)}
                            />
                        </div>

                        {error && (
                            <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
                        )}
                        <div className='flex justify-end mt-7'>
                            <button
                                className='add-btn'
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {taskId ? 'Update Task' : 'Create Task'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default CreateTask