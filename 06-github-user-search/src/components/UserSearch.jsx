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

    useEffect(() => {
        if(!query) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();
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