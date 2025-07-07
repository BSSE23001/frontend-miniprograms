import { useCallback, useEffect, useRef, useState } from "react";
import FilterBar from "./FilterBar";
import LastUpdated from "./LastUpdated";
import CryptoTable from "./CryptoTable";

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

// This is the Optimized Version of CryptoDashboard
function CryptoDashboardOpt() {
    const [cryptos, setCryptos] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap');
    const [sortAsc, setSortAsc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);

    // useRef() is a hook which holds any value from multiple renders
    // without being itself recreated or causing any rerender

    // Means below two currentAbortController and intervalId will be
    // created only once when this component mounts, after that no matter
    // how many times the component re-renders itself but these variables
    // and the value they contain will be persisting accros every re-render
    // and the value can also be changed any time without causing any re-render
    const currentAbortController = useRef(null);
    const intervalId = useRef(null);

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

            // Checking if the signal is aborted or not
            // just a check case, if by bug the program enters
            // this section the data will not be updated
            if(!signal.aborted) {
                setCryptos(data);
                setLastUpdated(new Date());
            }
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

        // This function handles the core fetching functionality
        const startFetch = () => {

            // It first check for any pending fetch request, if present
            // then eliminate that first
            if(currentAbortController.current) {
                currentAbortController.current.abort();
            }

            // Making a new Controller
            const newController = new AbortController();

            // Sore the newController into the reference value
            currentAbortController.current = newController;

            fetchCryptos(newController.signal);
        };

        startFetch();

        // Soring the interval id into the reference value
        intervalId.current = setInterval(()=>{
            // Here a new Controller for each inteval call is made which is necessary
            startFetch();
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
             * This aborts any currently pending fetchCryptos request.
             */

            if(currentAbortController.current) {
                currentAbortController.current.abort();
            }

            /**
             * This stops the setInterval timer.
             * This is crucial for preventing memory leaks
             * if we didn't clear the interval, it would continue to run in
             * the background even after the component is gone.
             */
            clearInterval(intervalId.current);
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

export default CryptoDashboardOpt;