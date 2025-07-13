import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import Task from "./Task";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from './app/tasksSlice';

const Column = ({ status }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const [form, setForm] = useState({ id: "", title: "", status });
  const [isOpen, setIsOpen] = useState(false);
  const [cols, setCols] = useState(true);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COLUMN",
    item: { status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["TASK"],
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (id, newStatus) => {
    dispatch(updateTask({ id, status: newStatus }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = { ...form, id: Date.now().toString() };
    dispatch(addTask(newTask));
    setForm({ id: "", title: "", status });
    setIsOpen(false);
  };

  return (
    <>
      {cols ? 
        <div ref={(node) => drag(drop(node))} 
          className={`bg-gray-200 w-64 p-4 rounded-lg shadow-m transition-all ${
            isOver ? "bg-gray-300" : ""
          } ${isDragging ? "opacity-50" : ""}`}
        >
          <button
            onClick={() => setCols(prev => !prev)}
            className="absolute right-10 top-1"
          >
            ➡️
          </button>
          <h2 className={`text-lg font-bold mb-2 capitalize `}>{status}</h2>

          <div className="space-y-2">
            {Array.isArray(tasks) &&
              tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Task key={task.id} id={task.id} title={task.title} />
                ))}
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-[#172B4D] bg-transparent hover:bg-gray-300 focus:outline-none font-medium rounded-lg text-sm px-8 py-2.5 mt-2"
          >
            {isOpen ? "Cancel" : "+ Add a Card"}
          </button>

          {isOpen && (
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                type="text"
                placeholder="Task title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border p-2 w-full mb-2 rounded"
                autoFocus
              />
              <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
                Add
              </button>
            </form>
          )}
        </div>
        :
        <div
          onClick={() => setCols(prev => !prev)}
          className="rounded-lg cursor-pointer h-20 w-10 bg-gray-400 absolute"
        >
          <h5 className={`font-bold h-fit w-fit mt-10 ${cols?'':'rotate-90'} `}>{status}</h5>
        </div>
      }
    </>
  );
};

export default Column;