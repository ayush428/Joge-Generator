"use client";
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('Any');
  const [joke, setJoke] = useState('');
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setError(null);
    setJoke('');

    try {
      const res = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=twopart`);
      const data = await res.json();

      if (data.error) {
        setError('Failed to fetch joke. Try again later.');
      } else if (data.type === 'twopart') {
        setJoke(`${data.setup} - ${data.delivery}`);
      } else {
        setJoke(data.joke);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch joke. Try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Joke Generator</h1>
    
      <label htmlFor="category">Select a Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Dark">Dark</option>
        <option value="Pun">Pun</option>
        <option value="Spooky">Spooky</option>
        <option value="Christmas">Christmas</option>
      </select>
      <button onClick={fetchJoke}>Get a Joke</button>

      <div className="joke-container" id="jokeContainer">
        {joke && <p>{joke}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}
