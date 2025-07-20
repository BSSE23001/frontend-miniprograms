import { useEffect, useRef } from "react";
import { useState } from "react";
import SuggestionsList from "./SuggestionsList";
import UserProfileCard from "./UserProfileCard";

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // The following useEffect is doing the debouncing technique
    // The technique is that we run a functionality only when
    // we are sure that it will not be inturrupted at least for
    // a few seconds to minutes.
    // The technique is usable when we are doing searchings from api,
    // suggestions building, manual form validation etc...
    // This technique make use of setTimeout((),x) functionality which
    // registers a function to run after every 'x' seconds had first passed
    // If an inturruption occurse before that, it clears the registration
    // and carries out the funtionality for new query preventing race conditions    

    useEffect(() => {
        if(!query) {
            setSuggestions([]);
            return;
        }

        // Setting up the controller
        const controller = new AbortController();

        // Registering the timeout function
        const handler = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://api.github.com/search/users?q=${query}`, {signal: controller.signal});
                const data = await res.json();
                setSuggestions(data.items || []);
            } catch (err) {
                if(err.name !== 'AbortError') console.log(err);
            } finally {
                setLoading(false);
            }
        },500);

        return () => {
            // Clearing the function before proceeding for new query
            clearTimeout(handler);
            controller.abort();
        };
    },[query]);

    return (
        <div>
            <input
            id="01"
            ref={inputRef}
            className="p-3 rounded text-white w-full mb-4"
            placeholder="Search Github Users....."
            value={query}
            onChange={e => setQuery(e.target.value)}
            />
            <SuggestionsList
            suggestions={suggestions}
            loading={loading}
            onSelect={setSelectedUser}
            />
            {selectedUser &&
            <UserProfileCard
            username={selectedUser.login}
            />
            }
        </div>
    );
}

export default UserSearch;