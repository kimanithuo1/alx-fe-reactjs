

import React, { useState } from 'react';
import { fetchUser } from './services/api';

function App() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetchUser(username);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <div>
            <header>
                <h1>GitHub User Search</h1>
            </header>
            <main>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                {userData && (
                    <div>
                        <h2>{userData.name}</h2>
                        <p>{userData.bio}</p>
                        <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                            View Profile
                        </a>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;

