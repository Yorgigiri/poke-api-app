import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { connect } from "react-redux";
import { useScrollToBottom } from 'react-scroll-to-bottom';
import { getAllPokemon, getPokemon } from "./services/pokemon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import './App.css';
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import {
  AppBar,
  Button,
  Toolbar,
} from "@material-ui/core";


const useStyles = makeStyles(() => ({
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  toolbarLink: {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
}));

function App(props) {
  const classes = useStyles();
  const scrollToBottom = useScrollToBottom();
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
  const match = useRouteMatch();

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

  return (
    <div className={classes.app}>
      <Router>
        <AppBar position="fixed">
          <Toolbar>
            <Button><Link to={`${match.url}`} className={classes.toolbarLink}>Home</Link></Button>
            <Button><Link to={`${match.url}/favourites`} className={classes.toolbarLink}>Favourites</Link></Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Switch>
          <Route path={`${match.path}/favourites`}>
            <Favourites
              favouritePokemonList={props.favouritePokemonList}
            />
          </Route>
          <Route path={match.path}>
            <Home
              isHiddenSpinner={!loading}
              pokemonData={pokemonData}
              favouritePokemonList={props.favouritePokemonList}
              onLoadMore={handleLoadMore}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    favouritePokemonList: state.favouritePokemonList,
  }
}

export default connect(mapStateToProps)(App);
