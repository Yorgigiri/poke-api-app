import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./services/pokemon";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      const response = await getAllPokemon(initialUrl)
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map(async ({ url }) => await getPokemon(url))
    )

    setPokemonData(_pokemonData);
  };

  console.log('pokemonData: ', pokemonData);

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        { loading ? <h1>Loadind...</h1> : (
          <h1>Data is fetched </h1>
        )}
      </div>
    </div>
  );
}

export default App;
