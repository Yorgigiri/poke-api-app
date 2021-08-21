import React from "react";
import {
    IconButton,
    List,
    Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import deletePokemonFromFavourites from "../../store/actionCreators/deletePokemonFromFavourites";
import { connect } from "react-redux";



const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 8,
        height: 'calc(100% - 16px)',
    },
    imageContainer: {
        marginRight: 8,
    },
    infoContainer: {
        display: 'flex',
    },
    column: {
        padding: 8,
    },
    deleteButtonContainer: {
        alignSelf: 'center',
    },
}));

const FavouritePokemonCard = (props) => {
    const {
        pokemon,
    } = props;
    const classes = useStyles();

    return (
        <Grid
            item
            xs={12}
        >
            <Paper className={classes.paper}>
                <div className={classes.infoContainer}>
                    <div>
                        <img src={pokemon.sprites.front_default} alt=""/>
                    </div>
                    <div className={classes.column}>
                        <div><b>Name:</b> {pokemon.name}</div>
                        <div><b>Weight:</b> {pokemon.weight}</div>
                        <div><b>Height:</b> {pokemon.height}</div>
                    </div>
                    <div className={classes.column}>
                        <div>
                            <b>Abilities:</b>
                            <List>
                                {pokemon.abilities.map(({ ability }, id) => {
                                    return (
                                        <ListItem key={id} xs={"auto"}>{`${ability.name}`}</ListItem>
                                    )
                                })}
                            </List>
                        </div>
                    </div>
                </div>
                <div className={classes.deleteButtonContainer}>
                    <IconButton onClick={() => props.deletePokemonFromFavourites(pokemon)}>
                        <DeleteIcon color="secondary" />
                    </IconButton>
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
        deletePokemonFromFavourites: (pokemon) => dispatch(deletePokemonFromFavourites(pokemon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritePokemonCard);