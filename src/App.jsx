import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaMoon, FaSun } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const fetchGitHubData = async () => {
    setError(''); // Clear any previous error message
    try {
      const userResponse = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(userResponse.data);

      const reposResponse = await axios.get(userResponse.data.repos_url);
      setRepos(reposResponse.data);

      const followersResponse = await axios.get(userResponse.data.followers_url);
      setFollowers(followersResponse.data);

      const followingResponse = await axios.get(userResponse.data.following_url.replace('{/other_user}', ''));
      setFollowing(followingResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No such user exists');
      } else {
        console.error('Error fetching GitHub data:', error);
        setError('An error occurred while fetching the data');
      }
    }
  };

  const fetchSuggestions = async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${input}&per_page=5`);
      setSuggestions(response.data.items);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 200), []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    debouncedFetchSuggestions(input);
  };

  const handleSuggestionClick = (suggestion) => {
    setUsername(suggestion);
    setSuggestions([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <button 
        onClick={toggleTheme}
        className="toggle-btn"
      >
        {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
      </button>
      <h1 className="text-5xl font-bold mb-10">GitHub Profile Viewer</h1>
      <div className="flex mb-10 space-x-2 w-[70%]">
        <div className="relative flex-grow">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className="p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 shadow-lg z-10">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.login)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {suggestion.login}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={fetchGitHubData}
          className="py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </div>
      {error && (
        <div className="w-full max-w-5xl bg-red-100 dark:bg-red-900 p-4 rounded-lg shadow-lg transition duration-300 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
      {userData && (
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition duration-300">
          <div className="flex items-center mb-10">
            <img src={userData.avatar_url} alt={userData.login} className="w-24 h-24 rounded-full shadow-lg mr-6" />
            <div>
              <h2 className="text-3xl font-semibold">{userData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">@{userData.login}</p>
              <p className="mt-2">{userData.bio}</p>
              {userData.location && <p className="mt-2">📍 {userData.location}</p>}
              {userData.company && <p className="mt-2">🏢 {userData.company}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Repositories ({repos.length})</h3>
              <div className="overflow-y-auto max-h-64">
                <ul className="space-y-4">
                  {repos.map(repo => (
                    <li key={repo.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow transition duration-300">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold text-xl hover:underline">
                        {repo.name}
                      </a>
                      <p className="mt-2">{repo.description}</p>
                      <div className="text-gray-500 dark:text-gray-400 mt-2 flex justify-between">
                        <span>⭐ {repo.stargazers_count}</span>
                        <span>🍴 {repo.forks_count}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="scrollable-section">
                <h3 className="text-2xl font-semibold mb-3">Followers ({followers.length})</h3>
                <div className="overflow-y-auto max-h-24">
                  <ul className="space-y-4">
                    {followers.map(follower => (
                      <li key={follower.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow transition duration-300">
                        <a href={follower.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                          {follower.login}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="scrollable-section">
                <h3 className="text-2xl font-semibold mt-8 mb-3">Following ({following.length})</h3>
                <div className="overflow-y-auto max-h-24">
                  <ul className="space-y-4">
                    {following.map(user => (
                      <li key={user.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow transition duration-300">
                        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                          {user.login}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
