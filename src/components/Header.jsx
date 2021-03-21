import React from 'react';
import { ModalForm } from './index';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import './Header.scss';

function Header({ onCreate }) {
    return (
        <div className="header">
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="flex-end">
                    {/* <Button size="medium" variant="contained" color="secondary">
                        Create
                    </Button> */}
                    <ModalForm btnVal="Create" btnSize="medium" btnVariant="contained" btnColor="secondary" onSave={onCreate} />
                </Box>
            </Container>
        </div>
    )
}

export default Header;
