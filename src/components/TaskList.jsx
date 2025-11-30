import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../features/tasks/taskSlice";
import TaskCard from "./TaskCard";
import EditTaskForm from "./EditTaskForm";

export default function TaskList() {
  const [editTask, setEditTask] = useState(null);
  const dispatch = useDispatch();
  const { tasks, loading, error, search } = useSelector((state) => state.task);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      task.priority.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return; // ❌ user cancelled
    }

    // ✅ user confirmed
    dispatch(deleteTask(id));
  };

  return (
    <div className="grid gap-4 mt-6">
      {(loading && (
        <center className="text-2xl text-green-500 font-bold">
          Loading...
        </center>
      )) || <center className="text-2xl text-red-500 font-bold">{}</center>}

      {editTask && (
        <EditTaskForm task={editTask} onClose={() => setEditTask(null)} />
      )}

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={() => handleDelete(task._id)}
            onEdit={() => setEditTask(task)}
          />
        ))
      ) : (
        <center className="text-2xl text-red-500 font-bold">
          No matching tasks
        </center>
      )}
    </div>
  );
}
