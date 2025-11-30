import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Tasks Section */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            + New Task
          </button>
        </div>

        <TaskCard
          title="Complete project proposal"
          desc="Finish the Q4 proposal"
          time="09:00 - 12:00"
          priority="high"
        />
        <TaskCard
          title="Review team feedback"
          desc="From last meeting"
          time="14:00 - 15:00"
          priority="medium"
        />
        <TaskCard
          title="Update documentation"
          desc="API Docs"
          time="16:00 - 17:00"
          priority="low"
        />
      </div>
    </div>
  );
}
