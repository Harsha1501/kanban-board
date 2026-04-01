import Board from "./components/Board";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Kanban Board
      </h1>
      <Board />
      <Toaster position="top-right" />
    </div>
  );
}