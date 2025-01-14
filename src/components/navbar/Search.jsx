import * as React from 'react';
import Box from '@mui/material/Box';

export default function Search() {

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
            <h3>Cerca</h3>
            {/* Aggiungi qui il campo di ricerca o altri contenuti */}
            <input type="text" placeholder="Cerca..." />
        </Box >
    );
}