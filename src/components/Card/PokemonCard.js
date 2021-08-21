import React from "react";
import classNames from 'classnames/bind';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Button, List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import addPokemonToFavourites from "../../store/actionCreators/addPokemonToFavourites";
import { connect } from "react-redux";


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
    },
    cardContainer: {
        position: 'relative',
        '&--is-favourite': {
            '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(171,255,0,0.3)',
                zIndex: 1,
            }
        }
    },
}));

const PokemonCard = (props) => {
    const classes = useStyles();
    const { pokemon, favouritePokemons } = props;
    const isFavourite = favouritePokemons.find(({ id }) => id === pokemon.id);

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={
                classNames(
                    classes.cardContainer,
                    { [`${classes.cardContainer}--is-favourite`]: isFavourite }
                )
            }
        >
            <Paper className={classes.paper}>
                <div className={classes.cardImage}>
                  <img src={pokemon.sprites.front_default} alt=""/>
                </div>
                <Divider />
                <Button
                    disabled={!!isFavourite}
                    className={classes.cardButton}
                    onClick={() => props.addPokemonToFavourites(pokemon)}
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

const mapStateToProps = (state) => {;
    return {
        favouritePokemonList: state.favouritePokemonList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPokemonToFavourites: (pokemon) => dispatch(addPokemonToFavourites(pokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard);