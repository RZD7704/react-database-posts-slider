import React from 'react';
import { ModalForm } from '../index';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));


function CardsItem({ title, body, id, onDelete, onEdit }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`https://picsum.photos/id/${id}/200/300`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom component="h2" color="primary">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {body}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => onDelete(id)}>
                        Delete
                    </Button>
                    <ModalForm btnVal="Edit" btnSize="small" btnVariant="contained" btnColor="primary" onSave={(data) => onEdit({ ...data, id })} title={title} description={body} />
                </CardActions>
            </Card>
        </Grid>

    )
}

export default CardsItem;
