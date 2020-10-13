import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Card from "./components/Card";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  mainContainer: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  buttonWrapper: {
    padding: '16px 0',
  },
  button: {
    margin: 8,
  },
}));

function App() {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      const response = await getAllPokemon(initialUrl);
      console.log('response: ', response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    console.log('data: ', data);

    const _pokemonData = await Promise.all(
        data.map(async ({ url }) => await getPokemon(url))
    )

    setPokemonData(_pokemonData);
  };

  const next = async () => {
    if (!nextUrl) return;
    setLoading(true);
    const data = await getAllPokemon(nextUrl);
    console.log('data!!!: ', data);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false)
  }

  console.log('pokemonData: ', pokemonData);

  return (
    <div className={classes.app}>
        <Container className={classes.mainContainer}>
          {loading
              ? <h1>Loading...</h1>
              : (
                <>
                  <h1>Pokemon grid</h1>
                  <Grid container justify={"center"} className={classes.buttonWrapper}>
                    <Button onClick={prev} variant="contained" color="primary">
                      Prev
                    </Button>
                    <Button onClick={next} variant="contained" color="primary">
                      Next
                    </Button>
                    {/*<Button variant="contained" color="primary">*/}
                    {/*  Load More*/}
                    {/*</Button>*/}
                  </Grid>
                  <Grid container className={classes.root} spacing={2}>
                    {pokemonData.map((pokemon, i) => <Card key={i} pokemon={pokemon} />)}
                  </Grid>
                  <Grid container justify={"center"} className={classes.buttonWrapper}>
                    <Button onClick={prev} variant="contained" color="primary" className={classes.button}>
                      Prev
                    </Button>
                    <Button onClick={next} variant="contained" color="primary" className={classes.button}>
                      Next
                    </Button>
                    {/*<Button variant="contained" color="primary">*/}
                    {/*  Load More*/}
                    {/*</Button>*/}
                  </Grid>
                </>
              )
          }
        </Container>
    </div>
  );
}

export default App;
