import { useMemo } from "react";

function CryptoTable({ cryptos, filter, sortBy, sortAsc }) {
    // The use Memo is the Top functionality of React which does the following things:
    // 1. Anything It done once, it takes record of those and don't redo thos things
    //    unnecessarily.
    // 2. It rerenders only when any of the dependency variable gets changed.
    const filtered = useMemo(() => {
        let result = cryptos.filter(c =>
            c.name.toLowerCase().includes(filter.toLowerCase())
        );
        result.sort((a,b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];
            if(typeof valA === 'string') return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            return sortAsc ? valA - valB : valB - valA;
        });
        return result;
    }
    ,[cryptos, filter, sortBy, sortAsc]);

    return (
        <div className="relative flex flex-col w-full h-full overflow-scroll text-yellow-500 shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                <tr>
                    <th className="p-4 border-b border-slate-900 bg-slate-900">
                    <p className="block text-sm font-normal leading-none">
                        Name
                    </p>
                    </th>
                    <th className="p-4 border-b border-slate-900 bg-slate-900">
                    <p className="block text-sm font-normal leading-none">
                        Price (USD)
                    </p>
                    </th>
                    <th className="p-4 border-b border-slate-900 bg-slate-900">
                    <p className="block text-sm font-normal leading-none">
                        Marker Cap
                    </p>
                    </th>
                </tr>
                </thead>
                <tbody>
                    {filtered.map(coin => (
                        <tr key={coin.id} className="hover:bg-slate-50">
                            <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm">
                                {coin.name}
                            </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-green-600">
                                ${coin.current_price.toLocaleString()}
                            </p>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                            <p className="block text-sm text-indigo-800">
                                ${coin.market_cap.toLocaleString()}
                            </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CryptoTable;