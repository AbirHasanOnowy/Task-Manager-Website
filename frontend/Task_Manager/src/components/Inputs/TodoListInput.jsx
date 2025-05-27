import { useState } from "react";
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2"
const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState('')

    // add todo item
    const handleAddOption = () => {
        if (option.trim() === '') return;
        setTodoList([...todoList, option.trim()]);
        setOption('');
    }

    // remove todo item
    const handleRemoveOption = (index) => {
        const updatedList = todoList.filter((_, i) => i !== index);
        setTodoList(updatedList);
    }
    return (
        <div>
            {todoList.map((item, index) => (
                <div
                    key={item}
                    className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
                >
                    <p className="text-xs text-black">
                        <span className="text-xs text-gray-400 font-semibold mr-2">
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                        {item}
                    </p>
                    <button
                        className="cursor-pointer"
                        onClick={() => handleRemoveOption(index)}
                    >
                        <HiOutlineTrash className="text-lg text-red-500" />
                    </button>
                </div>
            ))}
            <div className="flex items-center gap-5 mt-4">
                <input
                    type="text"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    placeholder="Enter task"
                    className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
                />
                <button
                    className="card-btn text-nowrap"
                    onClick={handleAddOption}
                >
                    <HiMiniPlus className="text-lg" /> Add
                </button>
            </div>
        </div>
    )
}

export default TodoListInput