import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import ContactsModal from "../Components/ContactsModal";
import LeaveCalendarModal from "../Components/LeaveCalendarModal";
import { Ticket } from "lucide-react";

const STATUSES = ["Pending", "In Progress", "Closed"];

export default function Dashboard() {
  // Simulated logged-in user (replace with auth context later)
  const loggedInUser = "Jayden";

  const [tickets, setTickets] = useState([
    {
      id: 4,
      title: "Fix login bug",
      status: "Pending",
      location: "Edenvale",
      createdAt: "2024-10-01",
      description: "Users are unable to log in with correct credentials.",
      assignedTo: "Jayden",
    },
    {
      id: 2,
      title: "Update docs",
      status: "In Progress",
      location: "Sandton",
      createdAt: "2024-10-02",
      description: "Documentation needs updates for new API changes.",
      assignedTo: "Mikhaar",
    },
    {
      id: 3,
      title: "Add dark mode",
      status: "Closed",
      location: "Bedfordview",
      createdAt: "2024-10-03",
      description: "Feature implemented and merged successfully.",
      assignedTo: "Jayden",
    },
    {
      id: 7,
      title: "Improve ticket page",
      status: "In Progress",
      location: "Randburg",
      createdAt: "2024-10-04",
      description: "Refactor ticket list layout and improve UI responsiveness.",
      assignedTo: "Jayden",
    },
  ]);

  const [openCount, setOpenCount] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  //  Live updating open ticket count for this employee
  useEffect(() => {
    const assignedTickets = tickets.filter(
      (t) => t.assignedTo === loggedInUser && t.status !== "Closed"
    );
    setOpenCount(assignedTickets.length);
  }, [tickets]);

  // Filter tickets assigned to logged-in user
  const assignedTickets = tickets.filter(
    (t) => t.assignedTo === loggedInUser
  );

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Topbar */}
        <Topbar
          username={loggedInUser}
          onOpenContacts={() => setShowContacts(true)}
          onOpenCalendar={() => setShowCalendar(true)}
        />

        {/* Open Ticket summary box */}
        <div className="flex justify-end mt-4 mr-6">
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
            <Ticket className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Open Tickets: {openCount}</span>
          </button>
        </div>

        {/* Tickets Board */}
        <main className="flex-1 p-6 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUSES.map((status) => (
              <section key={status}>
                <h2 className="font-semibold text-center mb-2">{status}</h2>

                {/* Filter by status + assigned user */}
                {assignedTickets
                  .filter((t) => t.status === status)
                  .map((ticket) => (
                    <Link
                      key={ticket.id}
                      to={`/tickets/${ticket.id}`}
                      className={`block rounded-lg border p-4 shadow bg-white hover:shadow-lg transition ${
                        ticket.status === "Pending"
                          ? "border-yellow-300"
                          : ticket.status === "In Progress"
                          ? "border-blue-300"
                          : "border-gray-300"
                      }`}
                    >
                      <h3
                        className={`font-bold text-sm mb-1 ${
                          ticket.status === "Pending"
                            ? "text-yellow-600"
                            : ticket.status === "In Progress"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {ticket.status}
                      </h3>
                      <div
                        className={`p-3 rounded ${
                          ticket.status === "Pending"
                            ? "bg-red-100"
                            : ticket.status === "In Progress"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="font-semibold text-sm">{ticket.title}</p>
                        <p className="text-xs text-gray-600">
                          Ticket ID: {ticket.id}
                        </p>
                        <p className="text-xs text-gray-600">
                          Location: {ticket.location}
                        </p>
                      </div>
                    </Link>
                  ))}

                {/* Empty message */}
                {assignedTickets.filter((t) => t.status === status).length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No {status.toLowerCase()} tickets assigned.
                  </p>
                )}
              </section>
            ))}
          </div>
        </main>

        {/* Modals */}
        {showContacts && <ContactsModal onClose={() => setShowContacts(false)} />}
        {showCalendar && <LeaveCalendarModal onClose={() => setShowCalendar(false)} />}
      </div>
    </div>
  );
}
