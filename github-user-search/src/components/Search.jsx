import React, { useState } from 'react';
import { fetchAdvancedUserSearch } from '../services/githubService';

const Search = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [minRepos, setMinRepos] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const query = {
                username,
                location,
                minRepos,
                page,
            };
            const data = await fetchAdvancedUserSearch(query);
            setResults(data.items);
        } catch (err) {
            setError("Looks like we can't find the user");
        } finally {
            setLoading(false);
        }
    };

    const fetchNextPage = async () => {
        setLoading(true);

        try {
            const query = {
                username,
                location,
                minRepos,
                page: page + 1,
            };
            const data = await fetchAdvancedUserSearch(query);
            setResults((prev) => [...prev, ...data.items]);
            setPage(page + 1);
        } catch (err) {
            setError("Looks like we can't find the user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSearch} className="space-y-4 bg-gray-100 p-6 rounded-md shadow-md">
                <div className="flex flex-col">
                    <label htmlFor="username">GitHub Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter GitHub username"
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter location"
                        className="border p-2 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="minRepos">Minimum Repositories:</label>
                    <input
                        type="number"
                        id="minRepos"
                        value={minRepos}
                        onChange={(e) => setMinRepos(e.target.value)}
                        placeholder="Enter minimum repo count"
                        className="border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {results.length > 0 && (
                <ul className="mt-6 space-y-4">
                    {results.map((user) => (
                        <li key={user.id} className="flex items-center space-x-4 bg-white p-4 rounded shadow">
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-16 h-16 rounded-full"
                            />
                            <div>
                                <h3 className="text-lg font-bold">{user.login}</h3>
                                <p>Location: {user.location || 'Not specified'}</p>
                                <p>Repositories: {user.public_repos || 'Unknown'}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    View Profile
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {results.length > 0 && (
                <button
                    onClick={fetchNextPage}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default Search;
