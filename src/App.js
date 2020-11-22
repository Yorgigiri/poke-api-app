import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import classNames from 'classnames/bind';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import { getAllPokemon, getPokemon } from "./services/pokemon";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "./components/Card";
import './App.css';


const useStyles = makeStyles(() => ({
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
  spinner: {
    position: "fixed",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.7)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    visibility: 'visible',
    opacity: 1,
    zIndex: 100,
    transition: '.4s ease visibility, .4s ease opacity',
  },
  spinnerIsHidden: {
    visibility: 'hidden',
    opacity: 0,
  }
}));

function App() {
  const classes = useStyles();
  const scrollToBottom = useScrollToBottom();
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      const response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      const firstPokemonData = await loadPokemon(response.results);
      setPokemonData(firstPokemonData);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
        data.map(async ({ url }) => await getPokemon(url))
    )

    return _pokemonData;
  };

  const handleLoadMore = async () => {
    setLoading(true);

    const data = await getAllPokemon(nextUrl);
    const nextPokemonData = await loadPokemon(data.results);

    setPokemonData([...pokemonData, ...nextPokemonData]);
    setNextUrl(data.next);
    setLoading(false);
    scrollToBottom();
  }

  const spinnerIsHidden = !loading && classes.spinnerIsHidden;

  return (
    <div className={classes.app}>
      <ScrollToBottom>
        <Container className={classes.mainContainer} justify={"center"} >
          <div className={classNames(classes.spinner, spinnerIsHidden)}>
            <CircularProgress />
          </div>
          <h1>Pokemon grid</h1>
          <Grid container className={classes.buttonWrapper}>
          </Grid>
          <Grid container className={classes.root} spacing={2} alignItems="stretch">
            {pokemonData.map((pokemon, i) =>
              <Card
                key={i}
                pokemon={pokemon}
              />
            )}
          </Grid>
          <Grid container justify={"center"} className={classes.buttonWrapper}>
            <Button onClick={handleLoadMore} variant="contained" color="primary">
              Load More
            </Button>
          </Grid>
        </Container>
      </ScrollToBottom>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  const atata = [];

  return {
    atata,
  }
}

export default connect(mapStateToProps)(App);
