import { useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from './app/tasksSlice';

const Task = ({ id, title }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const checkHandler = () => {
    setIsChecked((prev) => !prev);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editValue.trim()) return;

    dispatch(updateTask({ id, title: editValue }));
    setIsEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      ref={drag}
      className={`flex items-center justify-between mb-2 h-fit w-full px-2 py-2 rounded-lg ${
        isChecked ? "bg-green-400" : "bg-gray-400"
      }`}
    >
      <input checked={isChecked} onChange={checkHandler} type="checkbox" />

      {isEdit ? (
        <form onSubmit={handleEdit} className="flex items-center">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="outline-none px-1 py-0.5"
            autoFocus
          />
          <button type="submit" className="absolute left-3/4 mr-2 text-white rounded-full h-6 w-6 flex items-center justify-center">
            ✔
          </button>
        </form>
      ) : (
        <h3 className="font-bold">{title}</h3>
      )}
      {!isEdit && (
        <div className="flex">
          <button
            onClick={handleDelete}
            className="mr-2 text-white rounded-full h-6 w-6 flex items-center justify-center"
          >
            ❌
          </button>
          <button
            onClick={() => {
              setIsEdit(true);
              setEditValue(title);
            }}
            className="text-white rounded-full h-6 w-6 flex items-center justify-center"
          >
            🎨
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;