import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center space-x-2 hover:text-blue-400">
            <span>🏠</span>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/tickets" className="flex items-center space-x-2 hover:text-blue-400">
            <span>🎟️</span>
            <span>Tickets</span>
          </Link>
        </li>
        <li>
          <Link to="/activity" className="flex items-center space-x-2 hover:text-blue-400">
            <span>📜</span>
            <span>Activity Log</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center space-x-2 hover:text-blue-400">
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
