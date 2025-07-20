const FilterBar = ({ filter, setFilter, sortBy, setSortBy, sortAsc, setSortAsc }) => (
    <div className="flex space-x-4 mb-4">
        <input
        className="p-2 rounded text-black bg-blue-200"
        placeholder="Filter by name..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        />
        <select
        className="p-2 rounded text-black bg-gray-100"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        >
            <option value="name">Name</option>
            <option value="current_price">Price</option>
            <option value="market_cap">Market Cap</option>
        </select>
        <button
        className="p-2 rounded bg-blue-600"
        onClick={() => setSortAsc(!sortAsc)}
        >
            Sort {sortAsc ? "Ascending" : "Decending"}
        </button>
    </div>
);

export default FilterBar;