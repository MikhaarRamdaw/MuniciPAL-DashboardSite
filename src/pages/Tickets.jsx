import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../components/Header";
import TicketCard from "../components/TicketCard";

function Tickets() {
  const [tickets] = useState([
    { id: 1, title: "Fix login bug", status: "Pending" },
    { id: 2, title: "Update docs", status: "In Progress" },
    { id: 3, title: "Add dark mode", status: "Closed" },
  ]);

  const statuses = ["Pending", "In Progress", "Closed"];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header />
        <div className="grid grid-cols-3 gap-4">
          {statuses.map((status) => (
            <div key={status} className="border rounded-lg p-2 bg-white">
              <h2 className="font-bold text-center mb-2">{status}</h2>
              {tickets
                .filter((t) => t.status === status)
                .map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Tickets;
