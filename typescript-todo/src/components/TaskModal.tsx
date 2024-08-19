"use client";
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { addTask, updateTask } from '@/api/task';
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useLoaderStore from '@/store/useLoaderStore';

interface Props {
    open: boolean;
    onClose: () => void;
    mode: 'add' | 'edit' | 'view';
    taskToView?: Task | null;
}
interface Task {
    name: string;
    description: string;
    _id?: string;
    status?: boolean;
}

const AddTask = ({ open, onClose, mode, taskToView }: Props) => {

    if (!open) return null;

    const [task, setTask] = useState<Task>({
        name: '',
        description: '',
        status: false,
    });
    const [error, setError] = useState<string | null>(null);
    const { loading, setLoading } = useLoaderStore();



    useEffect(() => {
        if (mode === 'edit' && taskToView) {
            setTask({
                name: taskToView.name,
                description: taskToView.description,
                status: taskToView.status || false,
            });
        } else {
            setTask({
                name: '',
                description: '',
                status: false,
            });
        }
    }, [mode, taskToView]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!task.name) {
            setError('Task name is required');
            setLoading(false);
            return;
        }
        setError(null);

        if (mode === 'add') {

            addTask(task, (response) => {
                setLoading(false);
                if (response.status === 200) {
                    onClose();
                } else if (response.status === 404) {
                    setError("Task Already Exist");
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });
        } else if (mode === 'edit' && taskToView?._id) {
            updateTask(taskToView._id, task, (response) => {
                setLoading(false);
                if (response.status === 200) {
                    onClose();
                } else {
                    setError('Failed to update task. Please try again later.');
                }
            });
        }
    }
    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={onClose}
                    ></div>

                    <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                            <h3 className="text-2xl font-bold text-blue-900">
                                {mode === 'add' ? 'Create New Task' : mode === 'edit' ? 'Edit Task' : 'View Task'}
                            </h3>
                            {mode === "view" && (
                                taskToView?.status ? (
                                    <CheckCircleIcon
                                        sx={{ color: "green" }}
                                    />
                                ) : (
                                    <PendingIcon
                                        sx={{ color: "orange" }}
                                    />
                                ))}
                        </div>

                        {mode === 'view' ? (
                            <div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Task Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={taskToView?.name || ''}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        disabled
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Task Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        value={taskToView?.description || ''}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        disabled
                                    />
                                </div>
                                <div className='flex justify-end'>
                                    <Button text="Close" onClick={onClose} secondary />
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={task.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Type task name"
                                            required
                                        />
                                    </div>
                                    {mode === 'edit' && (
                                        <label className="inline-flex items-center me-5 cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" name="status"
                                                checked={task.status || false}
                                                onChange={handleChange} />
                                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</span>
                                        </label>
                                    )}
                                    <div>
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Task Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            value={task.description}
                                            onChange={handleChange}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Write task description here"
                                        />
                                    </div>
                                </div>
                                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                                <div className='flex justify-end'>
                                    <Button text={mode === 'add' ? 'Add Task' : 'Update Task'} onClick={handleSubmit}  />
                                    <Button text="Cancel" onClick={onClose} secondary />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTask;
