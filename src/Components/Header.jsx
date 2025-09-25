function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">MuniciPAL</h1>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search Ticket"
          className="border rounded px-2 py-1"
        />
        <select className="border rounded px-2 py-1">
          <option>Sort By</option>
          <option>ID</option>
          <option>Status</option>
        </select>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">
          Customized Reports
        </button>
      </div>
    </div>
  );
}

export default Header;
