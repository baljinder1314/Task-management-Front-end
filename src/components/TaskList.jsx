import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../features/tasks/taskSlice";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.task);

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

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={(id) => handleDelete(id)}
          />
        ))
      ) : (
        <center className="text-2xl text-green-500 font-bold">
          {loading ? "" : "No tasks yet"}
        </center>
      )}
    </div>
  );
}
