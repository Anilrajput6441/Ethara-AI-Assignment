import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        HRMS Lite
      </h1>
      <div className="bg-[#F6F7F9] shadow-lg border p-6 rounded-lg">
        <Dashboard />
      </div>
    </div>
  );
}
