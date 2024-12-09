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
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    GitHub User Search
                </h1>
                <form
                    onSubmit={handleSearch}
                    className="space-y-4"
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="text-gray-700 font-medium"
                        >
                            GitHub Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter GitHub username"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="location"
                            className="text-gray-700 font-medium"
                        >
                            Location:
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="minRepos"
                            className="text-gray-700 font-medium"
                        >
                            Minimum Repositories:
                        </label>
                        <input
                            type="number"
                            id="minRepos"
                            value={minRepos}
                            onChange={(e) => setMinRepos(e.target.value)}
                            placeholder="Enter minimum repo count"
                            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="block w-full bg-blue-500 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Search
                    </button>
                </form>

                {loading && (
                    <p className="text-center mt-4 text-blue-600">
                        Loading...
                    </p>
                )}
                {error && (
                    <p className="text-center mt-4 text-red-600">
                        {error}
                    </p>
                )}
                {results.length > 0 && (
                    <ul className="mt-6 space-y-4">
                        {results.map((user) => (
                            <li
                                key={user.id}
                                className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm"
                            >
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {user.login}
                                    </h3>
                                    <p className="text-gray-600">
                                        Location: {user.location || 'Not specified'}
                                    </p>
                                    <p className="text-gray-600">
                                        Repositories: {user.public_repos || 'Unknown'}
                                    </p>
                                    <a
                                        href={user.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
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
                        className="block w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default Search;
