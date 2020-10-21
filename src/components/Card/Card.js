import React from "react";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";


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
                <Typography variant="subtitle1" className={classes.cardName}>
                    {pokemon.name}
                </Typography>
                <div>
                    <Typography variant="subtitle2">Types:</Typography>
                    <List>
                        {pokemon.types.map(({ type }) => {
                            return (
                                <ListItem xs={"auto"}>{`${type.name}`}</ListItem>
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
                        {pokemon.abilities.map(({ ability }) => {
                            return (
                                <ListItem xs={"auto"}>{`${ability.name}`}</ListItem>
                            )
                        })}
                    </List>
                </div>
            </Paper>
        </Grid>
    );
}

export default Card;