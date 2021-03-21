import React, { useState, useMemo } from 'react';
import { CardsItem } from '../index';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Cards({ posts, isLoading, onDelete, onEdit }) {
    const [page, setPage] = useState(1);


    const items = useMemo(() => {
        return posts ? posts.slice(0, page * 10) : [];
    }, [posts, page]);

    function showMore() {
        setPage(page + 1);
    }

    if (isLoading && !!posts) {
        return <div className="loader">Loading</div>
    }


    return (
        <Container maxWidth="lg">
            <Grid
                container
                direction="row"
                justify="center"
            >
                <Grid container spacing={3}>
                    {
                        items.map((obj) => {
                            return < CardsItem key={obj.id} {...obj} onDelete={onDelete} onEdit={onEdit} />
                        })
                    }
                </Grid>
                <Box mt={4} mb={7}>
                    <Button onClick={showMore} pt={2} variant="outlined" color="secondary">
                        More
                    </Button>
                </Box>

            </Grid>

        </Container>
    )

}

export default Cards;
