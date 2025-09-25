function TicketCard({ ticket }) {
  const color =
    ticket.status === "Pending"
      ? "bg-red-100"
      : ticket.status === "In Progress"
      ? "bg-green-100"
      : "bg-gray-200";

  return (
    <div className={`p-3 mb-2 border rounded ${color}`}>
      <p className="font-semibold">{ticket.title}</p>
      <p className="text-sm text-gray-600">#{ticket.id}</p>
    </div>
  );
}

export default TicketCard;
