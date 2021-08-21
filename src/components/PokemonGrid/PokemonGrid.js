import React from "react";
import Grid from "@material-ui/core/Grid";
import { PokemonCard } from "../Card";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));

const PokemonGrid = (props) => {
    const classes = useStyles();
    const { pokemonData, favouritePokemons } = props;

    return (
        <Grid container className={classes.root} spacing={2} alignItems="stretch">
            {pokemonData.map((pokemon, i) =>
                <PokemonCard
                    key={i}
                    pokemon={pokemon}
                    favouritePokemons={favouritePokemons}
                />
            )}
        </Grid>
    );
};

export default PokemonGrid;
