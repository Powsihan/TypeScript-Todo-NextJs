"use client";
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { addTask, updateTask } from '@/api/task';

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
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    useEffect(() => {
        if (mode === 'edit' && taskToView) {
            setTask({
                name: taskToView.name,
                description: taskToView.description,
            });
        } else {
            setTask({
                name: '',
                description: '',
            });
        }
    }, [mode, taskToView]);

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
                                    <Button text={mode === 'add' ? 'Add Task' : 'Update Task'} onClick={handleSubmit} loading={loading} />
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
