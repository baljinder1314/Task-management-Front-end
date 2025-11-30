import axios from "axios";

const BASE_URL = `http://localhost:8000`;

// Create Task
const createTask = async (taskData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/task/create`,
    taskData,
    { withCredentials: true }
  );
  return response.data;
};

// Get All Tasks
const getTasks = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/task/get-all-task`, {
    withCredentials: true,
  });
  return res.data;
};

// Update Task
const updateTask = async (id, data) => {
  const res = await axios.put(
    `http://localhost:8000/api/v1/task/update-task/${id}`,
    data,
    { withCredentials: true }
  );
  return res.data;
};

// Delete Task
const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/api/v1/task/delete-task/${id}`, {
    withCredentials: true,
  });
  return id;
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;
