import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import ContactsModal from "../Components/ContactsModal";
import LeaveCalendarModal from "../Components/LeaveCalendarModal";
import { Ticket } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const STATUSES = ["Pending", "In Progress", "Closed"];
const COLORS = ["#FACC15", "#3B82F6", "#10B981"]; // yellow, blue, green

export default function Dashboard() {
  const loggedInUser = "Jayden";

  const [tickets, setTickets] = useState([
    {
      id: 4,
      title: "Fix login bug",
      status: "Pending",
      location: "Edenvale",
      createdAt: "2024-10-01",
      closedAt: null,
      description: "Users are unable to log in with correct credentials.",
      assignedTo: "Jayden",
      hasNewUpdate: false,
      hasNewMessage: false,
    },
    {
      id: 2,
      title: "Update docs",
      status: "In Progress",
      location: "Sandton",
      createdAt: "2024-10-02",
      closedAt: null,
      description: "Documentation needs updates for new API changes.",
      assignedTo: "Mikhaar",
      hasNewUpdate: false,
      hasNewMessage: false,
    },
    {
      id: 3,
      title: "Add dark mode",
      status: "Closed",
      location: "Bedfordview",
      createdAt: "2024-10-03",
      closedAt: "2024-10-06",
      description: "Feature implemented and merged successfully.",
      assignedTo: "Jayden",
      hasNewUpdate: false,
      hasNewMessage: false,
    },
    {
      id: 7,
      title: "Improve ticket page",
      status: "In Progress",
      location: "Randburg",
      createdAt: "2024-10-04",
      closedAt: null,
      description: "Refactor ticket list layout and improve UI responsiveness.",
      assignedTo: "Jayden",
      hasNewUpdate: false,
      hasNewMessage: false,
    },
  ]);

  const [openCount, setOpenCount] = useState(0);
  const [showContacts, setShowContacts] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const assignedTickets = tickets.filter(
      (t) => t.assignedTo === loggedInUser && t.status !== "Closed"
    );
    setOpenCount(assignedTickets.length);
  }, [tickets]);

  const stats = useMemo(() => {
    const now = new Date();

    const withinLastDays = (date, days) =>
      date && (now - new Date(date)) / (1000 * 60 * 60 * 24) <= days;

    const weeklyOpened = tickets.filter((t) =>
      withinLastDays(t.createdAt, 7)
    ).length;
    const weeklyClosed = tickets.filter(
      (t) => t.status === "Closed" && withinLastDays(t.closedAt, 7)
    ).length;

    const monthlyOpened = tickets.filter((t) =>
      withinLastDays(t.createdAt, 30)
    ).length;
    const monthlyClosed = tickets.filter(
      (t) => t.status === "Closed" && withinLastDays(t.closedAt, 30)
    ).length;

    const closedTickets = tickets.filter(
      (t) => t.status === "Closed" && t.closedAt && t.createdAt
    );
    const avgCloseTime =
      closedTickets.reduce((sum, t) => {
        const created = new Date(t.createdAt);
        const closed = new Date(t.closedAt);
        const days = (closed - created) / (1000 * 60 * 60 * 24);
        return sum + Math.max(days, 0);
      }, 0) / (closedTickets.length || 1);

    const statusCounts = STATUSES.map((status) => ({
      name: status,
      value: tickets.filter((t) => t.status === status).length,
    })).filter((entry) => entry.value > 0);

    return {
      weeklyOpened,
      weeklyClosed,
      monthlyOpened,
      monthlyClosed,
      avgCloseTime: avgCloseTime.toFixed(1),
      statusCounts,
    };
  }, [tickets]);

  const barData = [
    { period: "This Week", Opened: stats.weeklyOpened, Closed: stats.weeklyClosed },
    { period: "This Month", Opened: stats.monthlyOpened, Closed: stats.monthlyClosed },
  ];

  const lineData = [
    { name: "Avg Close Time", Days: parseFloat(stats.avgCloseTime) },
  ];

  const assignedTickets = tickets.filter((t) => t.assignedTo === loggedInUser);

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus, hasNewUpdate: true } : t
      )
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
        <Topbar
          username={loggedInUser}
          onOpenContacts={() => setShowContacts(true)}
          onOpenCalendar={() => setShowCalendar(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Ticket Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  label={{
                    value: "Time Period",
                    position: "insideBottom",
                    offset: -5,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#374151", fontWeight: 500 },
                  }}
                />
                <YAxis
                  domain={[0, "auto"]}
                  tickCount={6}
                  label={{
                    value: "Number of Tickets",
                    angle: -90,
                    position: "insideLeft",
                    dx: -10,
                    dy: 40,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#374151", fontWeight: 500 },
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 10 }} />
                <Bar dataKey="Opened" fill="#3B82F6" name="Opened (Blue)" />
                <Bar dataKey="Closed" fill="#10B981" name="Closed (Green)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Avg Days to Close Tickets</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Metric",
                    position: "insideBottom",
                    offset: -5,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#374151", fontWeight: 500 },
                  }}
                />
                <YAxis
                  domain={[0, "auto"]}
                  label={{
                    value: "Days",
                    angle: -90,
                    position: "insideLeft",
                    dx: -10,
                    dy: 40,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#374151", fontWeight: 500 },
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 10 }} />
                <Line type="monotone" dataKey="Days" stroke="#F59E0B" name="Avg Close Time (Yellow)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Ticket Status Breakdown</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={stats.statusCounts} dataKey="value" nameKey="name" outerRadius={80} label>
                  {stats.statusCounts.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  payload={[
                    { value: "Pending (Yellow)", type: "circle", color: "#FACC15" },
                    { value: "In Progress (Blue)", type: "circle", color: "#3B82F6" },
                    { value: "Closed (Green)", type: "circle", color: "#10B981" },
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <main className="flex-1 p-6 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUSES.map((status) => (
              <section key={status}>
                <h2 className="font-semibold text-center mb-2">{status}</h2>

                {assignedTickets
                  .filter((t) => t.status === status)
                  .map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`relative block rounded-lg border p-4 shadow bg-white hover:shadow-lg transition ${
                        ticket.status === "Pending"
                          ? "border-yellow-300"
                          : ticket.status === "In Progress"
                          ? "border-blue-300"
                          : "border-gray-300"
                      }`}
                    >
                      {ticket.hasNewUpdate && (
                        <span className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                      )}
                      {ticket.hasNewMessage && (
                        <span className="absolute top-2 right-6 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                      )}

                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="block"
                        onClick={() =>
                          setTickets((prev) =>
                            prev.map((t) =>
                              t.id === ticket.id
                                ? { ...t, hasNewUpdate: false, hasNewMessage: false }
                                : t
                            )
                          )
                        }
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
                          <p className="text-xs text-gray-600">Ticket ID: {ticket.id}</p>
                          <p className="text-xs text-gray-600">Location: {ticket.location}</p>
                        </div>
                      </Link>

                      <div className="mt-2">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          className="w-full border text-sm p-2 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                {assignedTickets.filter((t) => t.status === status).length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">
                    No {status.toLowerCase()} tickets assigned.
                  </p>
                )}
              </section>
            ))}
          </div>
        </main>

        {showContacts && <ContactsModal onClose={() => setShowContacts(false)} />}
        {showCalendar && <LeaveCalendarModal onClose={() => setShowCalendar(false)} />}
      </div>
    </div>
  );
}
