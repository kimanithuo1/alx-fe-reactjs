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

    const fetchUserData = async (e) => {
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
        <div className="min-h-screen bg-[#B7BDC8] text-[#285D66] px-4">
            <header className="flex justify-between items-center p-4 bg-[#6DA095] text-[#E1DF66]">
                <h1 className="text-2xl font-bold">GitHub User Search</h1>
            </header>
            <main className="max-w-4xl mx-auto mt-8">
                <form onSubmit={fetchUserData} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-[#285D66] font-medium">
                            GitHub Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter GitHub username"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#6DA095] focus:border-[#6DA095]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-[#285D66] font-medium">
                            Location:
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#6DA095] focus:border-[#6DA095]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="minRepos" className="text-[#285D66] font-medium">
                            Minimum Repositories:
                        </label>
                        <input
                            type="number"
                            id="minRepos"
                            value={minRepos}
                            onChange={(e) => setMinRepos(e.target.value)}
                            placeholder="Enter minimum repo count"
                            className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#6DA095] focus:border-[#6DA095]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#285D66] text-white py-2 rounded-md hover:bg-[#6DA095] focus:outline-none focus:ring-2 focus:ring-[#6DA095] focus:ring-offset-2 transition-colors"
                    >
                        Search
                    </button>
                </form>

                {loading && <p className="text-center mt-4 text-[#285D66]">Loading...</p>}
                {error && <p className="text-center mt-4 text-red-600">{error}</p>}

                {results.length > 0 && (
                    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {results.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
                            >
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-[#285D66]">
                                        {user.login}
                                    </h3>
                                    <p className="text-[#6DA095]">
                                        Location: {user.location || 'Not specified'}
                                    </p>
                                    <p className="text-[#6DA095]">
                                        Repositories: {user.public_repos || 'Unknown'}
                                    </p>
                                    <a
                                        href={user.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#E1DF66] hover:underline"
                                    >
                                        View Profile
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {results.length > 0 && (
                    <button
                        onClick={fetchNextPage}
                        className="w-full mt-4 bg-[#285D66] text-white py-2 rounded-md hover:bg-[#6DA095] focus:outline-none focus:ring-2 focus:ring-[#6DA095] focus:ring-offset-2 transition-colors"
                    >
                        Load More
                    </button>
                )}
            </main>
            <footer className="text-center py-4 bg-[#285D66] text-white">
                &copy; 2024 GitHub User Search
            </footer>
        </div>
    );
};

export default Search;
