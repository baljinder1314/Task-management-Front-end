export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div
      className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white 
                    flex flex-col gap-3 sm:gap-4"
    >
      {/* Title + Description */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold break-words">
          {task.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base break-words">
          {task.description}
        </p>
      </div>

      {/* Time */}
      <div className="text-purple-600 text-sm sm:text-base">
        {task.start_time} - {task.end_time}
      </div>

      {/* Priority Badge */}
      <span
        className={`inline-block px-3 py-1 rounded-full text-white text-xs sm:text-sm w-fit
        ${
          task.priority === "high"
            ? "bg-red-500"
            : task.priority === "medium"
            ? "bg-blue-500"
            : "bg-green-500"
        }`}
      >
        {task.priority}
      </span>

      {/* Buttons - responsive */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-2 rounded bg-yellow-500 text-white text-sm sm:text-base
                     w-full sm:w-auto"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-2 rounded bg-red-500 text-white text-sm sm:text-base
                     w-full sm:w-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
