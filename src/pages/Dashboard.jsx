import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold">🎉 Welcome to MuniciPAL</h1>
          <p className="mt-2 text-gray-700">This is the dashboard screen!</p>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
