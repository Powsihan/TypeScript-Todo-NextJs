"use client";
import { deleteTask, GetAllTasks } from '@/api/task';
import Button from '@/components/Button'
import { get } from 'http';
import React, { useState, useEffect, use } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from '@mui/material';
import TaskModal from '@/components/TaskModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { getUserInfo, logoutUser } from '@/api/user';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'next/navigation';
import useLoaderStore from '@/store/useLoaderStore';

interface Task {
  name: string;
  description: string;
  status: boolean;
  _id: string;
}


const page = () => {
  const [taskDetails, setTaskDetails] = useState<Task[] | []>([]);
  const { loading, setLoading } = useLoaderStore();
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'add' | 'view' | 'edit'>('add');
  const [selectedTaskDetails, setSelectedTaskDetails] = useState<Task | null>(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const { userData, setUserData } = useUserStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      GetAllTasks((response) => {
        if (response?.status === 200) {
          setTaskDetails(response?.data);
        } else {
          setError('Failed to fetch tasks');
        }
      });
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  useEffect(() => {
    if (userData) {
      setUserData(userData);
    } else {
      try {
        setLoading(true);
        getUserInfo((res) => {
          setLoading(false);
          if (res && res.status === 200) {
            setUserData(res.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData, setUserData]);

  const openAddTaskModal = () => {
    setMode('add');
    setOpen(true);
  };

  const closeTaskModal = () => {
    setOpen(false);
    fetchTasks();
  };

  const openViewTaskModal = (task: Task) => () => {
    setMode('view');
    setSelectedTaskDetails(task);
    setOpen(true);
  };

  const openEditTaskModal = (task: Task) => () => {
    setMode('edit');
    setSelectedTaskDetails(task);
    setOpen(true);
  }


  const openDeleteTaskModal = (task: Task) => () => {
    setTaskToDelete(task._id);
    setOpenConfirmationModal(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    setLoading(true);
    try {
      deleteTask(taskToDelete, (response) => {
        setLoading(false);
        if (response.status === 200) {
          fetchTasks();
        } else {
          setError('Failed to delete task');
        }
      });
    } catch (error) {
      setError('An error occurred');
    } finally {
      setOpenConfirmationModal(false);
    }
  };


  const LogoutUser = () => {
    setLoading(true);
    logoutUser((response) => {
      setLoading(false);
      if (response.status === 200) {
        setUserData(null);
        router.push('/');
      } else {
        setError('Failed to logout');
      }
    });
  }





  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className={` text-4xl font-semibold p-5`}>
          To-Do-APP
        </h1>
        {userData && <h2 className="text-2xl font-semibold p-5">
          Welcome {userData.name} </h2>}
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="grid w-full place-items-center p-5">
          <Button text="Add Task" onClick={openAddTaskModal} />
        </div>
        <div
          className="overflow-x-auto"
          style={{ maxHeight: "500px", overflowY: "scroll" }}
        >
          <table
            className={`table-striped min-w-full divide-y divide-gray-200 border border-gray-300`}
          >
            <thead className="thead-fixed">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  TaskName
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {taskDetails.map((data, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap`}
                  >
                    <div
                      className={`status-box ${data.status ? "completed" : "pending"} cursor-pointer`}
                      onClick={openEditTaskModal(data)} >
                      {data.status ? "Completed" : "Pending"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap max-w-96 overflow-hidden overflow-ellipsis">
                    {data.description}
                  </td>
                  <td
                    className={`cursor-pointer px-6 py-4 whitespace-nowrap flex flex-column gap-2`}
                  >
                    <IconButton onClick={openViewTaskModal(data)}>
                      <VisibilityIcon
                        sx={{ color: "grey" }}
                      />
                    </IconButton>
                    <IconButton onClick={openEditTaskModal(data)}>
                      <EditIcon
                        sx={{ color: "green" }}
                      />
                    </IconButton>
                    <IconButton onClick={openDeleteTaskModal(data)}>
                      <DeleteIcon sx={{ color: "darkred" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end pt-7'>
          <Button text="Logout" onClick={LogoutUser} />
        </div>
      </div>
      <TaskModal open={open} onClose={closeTaskModal} mode={mode} taskToView={selectedTaskDetails} />
      <ConfirmationModal
        show={openConfirmationModal}
        message="Are you sure you want to delete this task?"
        heading="Confirmation To Delete Task"
        onConfirm={handleDeleteTask}
        onCancel={() => setOpenConfirmationModal(false)} />
    </div>
  )
}

export default page
