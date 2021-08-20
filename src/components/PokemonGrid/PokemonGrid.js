import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "../Card";


export const PokemonGrid = (props) => {
    const { classes, pokemonData, favouritePokemons } = props;

    return (
        <Grid container className={classes.root} spacing={2} alignItems="stretch">
            {pokemonData.map((pokemon, i) =>
                <Card
                    key={i}
                    pokemon={pokemon}
                    favouritePokemons={favouritePokemons}
                />
            )}
        </Grid>
    );
};
