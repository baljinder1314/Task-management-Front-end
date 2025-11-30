import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../features/tasks/taskSlice";

export default function EditTaskForm({ task, onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.task);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    priority: "low",
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        start_time: task.start_time || "",
        end_time: task.end_time || "",
        priority: task.priority || "low",
        status: task.status || "pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      updateTask({ id: task._id, data: formData })
    );
    if (updateTask.fulfilled.match(response)) {
      onClose(); // close modal
    }
  };

  return (
    <form
      className="p-6 bg-white shadow-xl rounded-xl space-y-4 max-w-md mx-auto"
      onSubmit={handleUpdate}
    >
      <h2 className="text-2xl font-bold text-center">Edit Task</h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows={3}
      ></textarea>

      {/* Time row */}
      <div className="flex gap-3">
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-1/2 border p-3 rounded-lg"
          required
        />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-1/2 border p-3 rounded-lg"
          required
        />
      </div>

      {/* Priority */}
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      {/* Status */}
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="in-progress">In-progress</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        {loading ? "Updating... " : "Update Task"}
      </button>
    </form>
  );
}
