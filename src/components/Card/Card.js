import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Button, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import store from "../../store/store";
import addPokemonToFavourites from "../../store/actionCreators/addPokemonToFavourites";


const useStyles = makeStyles(() => ({
    paper: {
        padding: 8,
        height: 'calc(100% - 16px)',
    },
    cardImage: {
        textAlign: "center",
        padding: '10px 0',
    },
    cardName: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 16,
    },
    cardButton: {
        display: 'block',
        margin: '8px auto',
    }
}));

const Card = ({ pokemon }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
                <div className={classes.cardImage}>
                  <img src={pokemon.sprites.front_default} alt=""/>
                </div>
                <Divider />
                <Button
                    className={classes.cardButton}
                    onClick={() => store.dispatch(addPokemonToFavourites(pokemon))}
                    variant="contained"
                    color="primary"
                >
                    Add to Favourites
                </Button>
                <Typography variant="subtitle1" className={classes.cardName}>
                    {pokemon.name}
                </Typography>
                <div>
                    <Typography variant="subtitle2">Types:</Typography>
                    <List>
                        {pokemon.types.map(({ type }, id) => {
                            return (
                                <ListItem key={id} xs={"auto"}>{`${type.name}`}</ListItem>
                            )
                        })}
                    </List>
                </div>
                <Divider />
                <div>
                    <Typography variant="subtitle2">Weight:</Typography>
                    {pokemon.weight}
                </div>
                <div>
                  <Typography variant="subtitle2">Height:</Typography>
                  {pokemon.height}
                </div>
                <div>
                    <Typography variant="subtitle2">Abilities:</Typography>
                    <List>
                        {pokemon.abilities.map(({ ability }, id) => {
                            return (
                                <ListItem key={id} xs={"auto"}>{`${ability.name}`}</ListItem>
                            )
                        })}
                    </List>
                </div>
            </Paper>
        </Grid>
    );
}

export default Card;