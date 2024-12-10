import axios from 'axios';

const API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com/search/users?q";

export const fetchAdvancedUserSearch = async ({ username, location, minRepos, page = 1 }) => {
    const query = [
        username ? `user:${username}` : '',
        location ? `location:${location}` : '',
        minRepos ? `repos:>${minRepos}` : '',
    ]
        .filter(Boolean)
        .join(' ');

    try {
        const response = await axios.get(`${API_URL}/search/users`, {
            params: { q: query, page },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};
