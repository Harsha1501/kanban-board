import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({ title, tasks = [], id }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-1/3 p-5 rounded-2xl shadow-lg min-h-[350px]
      ${
        id === "todo"
          ? "bg-blue-50"
          : id === "inprogress"
          ? "bg-yellow-50"
          : "bg-green-50"
      }`}
    >
      <h2 className="font-semibold text-lg mb-4">{title}</h2>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}