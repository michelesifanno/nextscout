import * as React from 'react';
import Box from '@mui/material/Box';

export default function Follow() {

    return (
        < Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }
            }
        >
            <h3>Giocatori seguiti</h3>
        </Box >
    );
}