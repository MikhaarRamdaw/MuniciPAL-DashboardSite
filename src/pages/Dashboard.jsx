import { useMemo, useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import TicketCard from "../Components/TicketCard";
import ContactsModal from "../Components/ContactsModal";
import LeaveCalendarModal from "../Components/LeaveCalendarModal";

const STATUSES = ["Pending", "In Progress", "Closed"];

export default function Dashboard() {
  // ✅ Example ticket state (in real app this will come from your backend or API)
  const [tickets, setTickets] = useState([
    { id: 1, title: "Fix login bug", status: "Pending" },
    { id: 2, title: "Update docs", status: "In Progress" },
    { id: 3, title: "Add dark mode", status: "Closed" },
  ]);

  const [showContacts, setShowContacts] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [openCount, setOpenCount] = useState(0);

  // ✅ Live updating open tickets
  useEffect(() => {
    const count = tickets.filter((t) => t.status !== "Closed").length;
    setOpenCount(count);
  }, [tickets]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Topbar */}
        <Topbar
          username="Mikhaar"
          onOpenContacts={() => setShowContacts(true)}
          onOpenCalendar={() => setShowCalendar(true)}
        />

        {/* ✅ Open Tickets summary box ABOVE board */}
        <div className="flex justify-end mt-4 mr-6">
          <div className="bg-blue-800 text-white rounded-md shadow-md px-4 py-2 w-48 text-center">
            <h2 className="font-semibold text-sm">Open Tickets</h2>
            <p className="text-xl font-bold mt-1">{openCount}</p>
          </div>
        </div>

        {/* Tickets Board */}
        <main className="flex-1 p-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STATUSES.map((status) => (
              <section key={status} className="bg-white border rounded-lg p-3">
                <h2 className="font-bold text-center mb-2">{status}</h2>

                {tickets
                  .filter((t) => t.status === status)
                  .map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}

                {/* Optional message if empty */}
                {tickets.filter((t) => t.status === status).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No tickets in {status.toLowerCase()}.
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
