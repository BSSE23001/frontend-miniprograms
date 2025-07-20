import { useCallback, useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import LastUpdated from "./LastUpdated";
import CryptoTable from "./CryptoTable";

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

function CryptoDashboard() {
    const [cryptos, setCryptos] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap');
    const [sortAsc, setSortAsc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    /**
     * useCallback Hook:
            This hook is used to memoize the fetchCryptos function.
            The empty dependency array [] means this function will
            only be created once when the component mounts and will
            not be recreated on subsequent re-renders unless its
            dependencies change (which they won't in this case).
            Purpose:
            This is crucial because fetchCryptos is a dependency of
            the useEffect hook below it. If fetchCryptos were recreated
            on every render, the useEffect would run repeatedly, leading
            to unnecessary re-subscriptions and potentially breaking the
            setInterval and AbortController logic. Memoizing it ensures a
            stable reference.

            useCallback ensures fetchCryptos is the same function reference
            across renders.
     */

    const fetchCryptos = useCallback(async (signal) => {
        /**
         *  The signal object comes from an AbortController.
         * When the AbortController's abort() method is called,
         * this signal will be notified, and any fetch requests
         * associated with it can be cancelled.
         */

        try {
            setLoading(true);
            setError('');

            const res = await fetch(API_URL, {signal});
            // Here we are associating a fetch request with the signal
            // If the signal aborts, the fetch promise will reject with an AbortError.

            if(!res.ok) throw new Error("API failed");
            const data = await res.json();
            setCryptos(data);
            setLastUpdated(new Date());
        } catch (err) {
            if (err.name !== 'AbortError') setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);


    // This useEffect is doing polling which is to continuously and periodically
    // fetching of data from an API

    /**
     * Imagine you send a request (Request A), and 100ms later,
     * you send another (Request B). If Request A is slow and Request B
     * is fast, Request B might complete first. If you don't cancel
     * Request A, it might complete later and overwrite the data from
     * Request B, leading to outdated or inconsistent information being
     * displayed. AbortController allows you to "cancel" or signal an abort
     * to a pending fetch request, so you don't process stale responses.
     */
    useEffect(() => {
        // This abortcontroller will handle the fetching of initial fetch request
        const controller = new AbortController();

        // Making the first call
        fetchCryptos(controller.signal);

        const intervalId = setInterval(()=>{
            // Here a new Controller for each inteval call is made which is necessary
            const newController = new AbortController();
            fetchCryptos(newController.signal);
        }, 5000);

        /**
         * This function is returned by useEffect and runs
         * when the component unmounts or before the useEffect
         * re-runs (which, in this case, is effectively only
         * on unmount because fetchCryptos is stable so the useEffect
         * cant re-run autonomously).
         */
        return () => {

            /**
             * This aborts the initial fetchCryptos request.
             * If the component unmounts while the initial request
             * is still pending, this prevents it from completing
             * and causing issues (e.g., trying to setCryptos
             * on an unmounted component).
             */
            controller.abort();

            /**
             * This stops the setInterval timer.
             * This is crucial for preventing memory leaks;
             * if we didn't clear the interval, it would continue to run in
             * the background even after the component is gone.
             */
            clearInterval(intervalId);
        };
    },[fetchCryptos]);

    return (
    <div>
      <FilterBar
        filter={filter} setFilter={setFilter}
        sortBy={sortBy} setSortBy={setSortBy}
        sortAsc={sortAsc} setSortAsc={setSortAsc}
      />
      <LastUpdated lastUpdated={lastUpdated} loading={loading} />
      {error && <p className="text-red-400">Error: {error}</p>}
      <CryptoTable
        cryptos={cryptos}
        filter={filter}
        sortBy={sortBy}
        sortAsc={sortAsc}
      />
    </div>
    );
}

export default CryptoDashboard;