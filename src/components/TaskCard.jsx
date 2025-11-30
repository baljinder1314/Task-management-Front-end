export default function TaskCard({ task, onDelete, onEdit }) {
  const bgColors = {
    high: "bg-red-300",
    medium: "bg-blue-300",
    low: "bg-green-300",
  };

  return (
    <div
      className={`rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
        bgColors[task.priority]
      }`}
    >
      {/* ID */}
      <p className="text-sm font-bold opacity-70">#{task._id.slice(-4)}</p>

      {/* Title */}
      <h3 className="text-lg font-semibold mt-2">{task.title}</h3>

      {/* Description line */}
      <p className="text-sm mt-1 opacity-80 truncate">{task.description}</p>

      {/* Time */}
      <div className="flex justify-between mt-4 items-center">
        <span className="text-sm bg-white px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
          <span className="text-blue-700 text-xs">{task.priority}</span>
        </span>

        <span className="font-semibold text-gray-700">
          {task.start_time} - {task.end_time}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 px-3 py-1 text-white rounded-lg text-sm shadow hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 px-3 py-1 text-white rounded-lg text-sm shadow hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
