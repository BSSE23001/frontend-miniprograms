import { useEffect, useState } from "react";

const UserProfileCard = ({username}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch(`https://api.github.com/users/${username}`, {signal: controller.signal})
        .then(res => res.json())
        .then(setUser)
        .catch(err => console.log(err));
        
        return () => controller.abort();
    },[username]);

    if(!user) return <p>Loading profile...</p>

    return (
        <div className="mt-6 p-4 bg-gray-800 rounded space-y-2">
            <img
            src={user.avatar_url}
            alt=""
            className="w-20 h-20 rounded-full"
            />
            <h2 className="text-xl font-bold">{user.login}</h2>
            <p>Followers: {user.followers}</p>
            <p>Public repos: {user.public_repos}</p>
        </div>
    );
}

export default UserProfileCard;