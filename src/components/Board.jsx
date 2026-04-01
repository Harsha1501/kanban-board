import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { initialTasks } from "../data/initialData";
import { updateTaskStatus } from "../lib/mockApi";
import toast from "react-hot-toast";

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  const columns = ["todo", "inprogress", "done"];

  // ✅ Optimistic UI + Rollback
  const moveTask = async (taskId, newStatus) => {
    const prevTasks = [...tasks]; // Save previous state

    // 🔥 Optimistic Update
    const updated = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updated); // UI updates instantly

    try {
      await updateTaskStatus(taskId, newStatus);
    } catch {
      // ❌ Rollback if API fails
      setTasks(prevTasks);
      toast.error("Failed to move task!");
    }
  };

  const handleDragStart = (event) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    let newStatus = over.id;

    // Handle drop on another card
    const overTask = tasks.find((t) => t.id === over.id);
    if (overTask) {
      newStatus = overTask.status;
    }

    if (!columns.includes(newStatus)) return;
    if (task.status === newStatus) return;

    moveTask(task.id, newStatus);
  };

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "inprogress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 justify-center">
        <Column title="To Do" tasks={todo} id="todo" />
        <Column title="In Progress" tasks={inProgress} id="inprogress" />
        <Column title="Done" tasks={done} id="done" />
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}