import React from 'react';
import { FavouritePokemonCard } from "../components/Card";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    mainContainer: {
        paddingTop: 8,
        paddingBottom: 16,
    },
    noContent: {
        textAlign: 'center',
    }
}));

const Favourites = (props) => {
    const classes = useStyles();
    const { favouritePokemonList } = props;

    return (
        <Container className={classes.mainContainer} justify={"center"} maxWidth={"sm"}>
            <h1 align={'center'}>Favourites</h1>
            {favouritePokemonList.length ? (
                <Grid container className={classes.root} spacing={2} alignItems="stretch">
                    {favouritePokemonList.map((pokemon, i) =>
                        <FavouritePokemonCard
                            key={i}
                            pokemon={pokemon}
                        />
                    )}
                </Grid>)
                : <div className={classes.noContent}>Favourite pokemons is not added</div>
            }

        </Container>
    )
}

export default Favourites;
