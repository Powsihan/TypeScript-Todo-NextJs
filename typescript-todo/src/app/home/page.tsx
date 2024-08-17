"use client"
import Button from '@/components/Button'
import React from 'react'
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

const page = () => {
    return (
        <div>
            <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-semibold p-5`}>
                    To-Do-APP
                </h1>
                <div className="grid w-full place-items-end p-5">
                   <Button text="Add Task"/>
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
                            {/* {taskDetails.map((data, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td
                    className={`${styles["pointer-cursor"]} px-6 py-4 whitespace-nowrap`}
                  >
                    <div
                      onClick={() => {
                        setModalType("State");
                        let temp = { ...data };
                        setSelectedTask(temp);

                        setModalShow(true);
                      }}
                      className={`${styles["status-box"]} ${
                        data.status ? styles["completed"] : styles["pending"]
                      }`}
                    >
                      {data.status ? "Completed" : "Pending"}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap max-w-96 overflow-hidden overflow-ellipsis">
                    {data.description}
                  </td>
                  <td
                    className={`${styles["pointer-cursor"]} px-6 py-4 whitespace-nowrap flex flex-column gap-2`}
                  >
                    <VisibilityIcon
                      sx={{ color: "grey" }}
                      onClick={() => {
                        setModalType("View");
                        let temp = { ...data };
                        setSelectedTask(temp);
                        setModalShow(true);
                      }}
                    />
                    <EditIcon
                      sx={{ color: "green" }}
                      onClick={() => {
                        setModalType("Edit");
                        let temp = { ...data };
                        setSelectedTask(temp);
                        setModalShow(true);
                      }}
                    />
                    <DeleteIcon sx={{ color: "darkred" }} onClick={() => openDeleteConfirmationModal(data._id)}/>
                  </td>
                </tr>
              ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default page
