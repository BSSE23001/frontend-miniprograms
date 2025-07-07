import { useEffect, useState } from "react";

function LastUpdated({ lastUpdated, loading }) {
    const [secondsAgo, setSecondsAgo] = useState(0);

    useEffect(
        // This is the callback function of useEffect
        () => {
            // If there is no update takes place recently then return without doing anything
            if(!lastUpdated) return;

            // If there is some last update then here we are doing the following:
            // 1. Setting up an interval which is bound to run a provided function
            //    after every 1000 milliseconds means after every 1 second our provided
            //    function will run.
            // 2. The Id of the setInterval Utility is being stored which will be
            //    used in the case when user is not seeing this component or
            //    this component no longer need to be rendered or this component
            //    continuous 1 second updates doesn't have any effect on the page
            //    because we are no longer on such page where it is mounted.
            const id = setInterval(() => {
                setSecondsAgo(Math.round((new Date() - lastUpdated)/1000))
            },1000);

            // Now this is called when we leave such area or component or page
            // where this component is mounted means it is being displayed
            // so when we leave such area, the react virtual dom unmounts the
            // component so as to do lazyloading or loading on demand.
            // When the component is unmounted means aborted then before exitting
            // this function is called which clears the setting of our interval
            // function to prevent leakage of memory.
            // If this is not done then the above interval function will keep
            // running on the background leaking the memory.
            return () => clearInterval(id);
        }, [lastUpdated]);
        // This useEffect will run after initial render as well as everytime
        // the lastUpdated Changes

    return (
        <div className="flex">
            {loading ? (
                <span>
                    <svg className="text-yello-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                        className="text-amber-500"></path>
                    </svg>
                    Loading...
                </span>
            )
            : (
                <h2 className="text-xl font-bold mb-6 text-green-800">
                    {
                        lastUpdated ? `Last Updated: ${secondsAgo}s ago` : "Not Updated Yet"
                    }
                </h2>
            )
            }
        </div>
    );
}

export default LastUpdated;