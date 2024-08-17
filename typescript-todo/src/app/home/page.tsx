"use client";
import { GetAllTasks } from '@/api/task';
import Button from '@/components/Button'
import { get } from 'http';
import React, { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from '@mui/material';

interface Task {
  name: string;
  description: string;
  status: boolean;
  _id: string;
}

const page = () => {
  const [taskDetails, setTaskDetails] = useState<Task[] | []>([]);



  useEffect(() => {
    GetAllTasks((response) => {
      if (response?.status === 200) {
        setTaskDetails(response?.data);
      }
    });
  }, []);



  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className={` text-4xl font-semibold p-5`}>
          To-Do-APP
        </h1>
        <div className="grid w-full place-items-end p-5">
          <Button text="Add Task" />
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
                    >
                      {data.status ? "Completed" : "Pending"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap max-w-96 overflow-hidden overflow-ellipsis">
                    {data.description}
                  </td>
                  <td
                    className={`cursor-pointer px-6 py-4 whitespace-nowrap flex flex-column gap-2`}
                  >
                    <IconButton>
                      <VisibilityIcon
                        sx={{ color: "grey" }}
                      />
                    </IconButton>
                    <IconButton>
                      <EditIcon
                        sx={{ color: "green" }}
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon sx={{ color: "darkred" }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
