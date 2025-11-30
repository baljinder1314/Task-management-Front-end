import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    priority: "low",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.task);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset form
    setFormData({
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      priority: "low",
    });

    const data = {
      title: formData.title,
      description: formData.description,
      start_time: formData.start_time,
      end_time: formData.end_time,
      priority: formData.priority,
      status: formData.status || "pending",
    };

    const createData = await dispatch(createTask(data));
    if (createTask.fulfilled.match(createData)) {
      navigate("/all-tasks");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-2">Create Task</h2>

      {error && <p></p>}
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows={3}
      ></textarea>

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

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
      >
        {loading ? "Loading...." : "Create Task"}
      </button>
    </form>
  );
}
