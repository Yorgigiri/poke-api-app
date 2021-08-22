import React from 'react';
import classNames from "classnames/bind";
import ScrollToBottom from "react-scroll-to-bottom";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import PokemonGrid from "../components/PokemonGrid/PokemonGrid";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
    mainContainer: {
        paddingTop: 8,
        paddingBottom: 16,
    },
    buttonWrapper: {
        justifyContent: 'center',
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
        transition: '.7s ease visibility, .7s ease opacity',
    },
    spinnerIsHidden: {
        visibility: 'hidden',
        opacity: 0,
    }
}));

const Home = (props) => {
    const classes = useStyles();
    const {
        pokemonData,
        favouritePokemonList,
        isHiddenSpinner,
        onLoadMore,
    } = props;

    return (
        <div>
            <ScrollToBottom>
                <Container className={classes.mainContainer} justify={"center"} >
                    <div className={classNames(classes.spinner, { [classes.spinnerIsHidden]: isHiddenSpinner })}>
                        <CircularProgress />
                    </div>
                    <h1 align={'center'}>Home</h1>
                    <PokemonGrid
                        pokemonData={pokemonData}
                        favouritePokemons={favouritePokemonList}
                    />
                    <Grid container className={classes.buttonWrapper}>
                        <Button onClick={onLoadMore} variant="contained" color="primary">
                            Load More
                        </Button>
                    </Grid>
                </Container>
            </ScrollToBottom>
        </div>
    );
};

export default Home;