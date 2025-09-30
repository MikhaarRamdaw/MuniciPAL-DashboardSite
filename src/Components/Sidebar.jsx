import { Link } from "react-router-dom";
import { useState } from "react";
import MunicipalIcon from "../assets/municiPAL.svg?react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-4 pt-3 transition-all duration-300
      ${collapsed ? "w-16" : "w-64"} flex flex-col items-center`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 mt-2"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
          <MunicipalIcon className="w-8 h-8 text-blue-400" />
        </div>
      </button>

      <ul className="space-y-3 w-full">
        {[
          { to: "/", icon: "🏠", label: "Dashboard" },
          { to: "/tickets", icon: "🎟️", label: "Tickets" },
          { to: "/activity", icon: "📜", label: "Activity Log" },
          { to: "/settings", icon: "⚙️", label: "Settings" },
        ].map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="flex items-center hover:text-blue-400 transition-all duration-300"
            >
              <span
                className={`w-6 text-lg transition-all duration-300
                ${collapsed ? "mx-auto" : "ml-0"}`}
              >
                {item.icon}
              </span>
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap 
                ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto ml-2"}`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
