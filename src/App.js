import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Card from "./components";

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
      { loading ? <h1>Loadind...</h1> : (
        <>
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </>
      )}
    </div>
  );
}

export default App;
