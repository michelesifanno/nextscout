import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid2 as Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import usePlayerTransfers from "../../utils/usePlayerTransfers";
import { ArrowForward } from '@mui/icons-material';  // Importa l'icona della freccia


export default function PlayerTransfers() {
    const { slug } = useParams();
    const playerId = parseInt(slug, 10); // Converte slug in intero

    const { transfers, loading, error } = usePlayerTransfers(playerId);



    const rows = ["Team", "Type"];


    const groupedTransfers = transfers?.reduce((acc, transfer) => {
        const teamName = transfer.teams.in.name;
        if (!acc[teamName]) {
            acc[teamName] = [];
        }
        acc[teamName].push({
            date: transfer.date,
            type: transfer.type,
            logo: transfer.teams.in.logo,
            teamName: transfer.teams.in.name
        });
        return acc;
    }, {});

    // Trasformiamo l'oggetto in un array di oggetti
    const transfersArray = Object.entries(groupedTransfers || {}).map(([teamName, transferList]) => ({
        teamName,
        transfers: transferList
    }));


    if (loading) {
        return <Typography variant="h6" color="textSecondary">Caricamento in corso...</Typography>; // Mostra il messaggio di caricamento
    }

    if (error) {
        return <Typography variant="h6" color="textSecondary">Errore {error}</Typography>; // Mostra il messaggio di caricamento
    }

    return (
        <Container className="Container-Player-Transer" sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2, mt: 2 }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item size={{ xs: 12, md: 12 }} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                        Player transfers
                    </Typography>
                </Grid>
            </Grid>
            <TableContainer>
                <Table aria-label="tabella trasferimenti calciatore">
                    <TableHead>
                        <TableRow>
                            {rows.map((row, index) => (
                                <TableCell key={index} sx={{ padding: '16px 0px 16px 10px' }} className={index >= rows.length - 1 ? "align-right" : ""}>
                                    <p className="info-title-table">{row}</p>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transfers?.map((transfer, index) => (
                            <TableRow key={index}>
                                {/* Colonna "Logo team" */}
                                <TableCell sx={{ display: 'flex', alignItems: 'center', padding: '16px 0px 16px 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                                        <img src={transfer.teams.in.logo} width="40px" style={{ marginRight: '5px' }} />
                                        <div style={{ display: 'block', alignItems: 'center', marginRight: '10px' }}>
                                            <Typography variant="h5">{transfer.teams.in.name}</Typography>
                                            <p className="info-title">{transfer.date.slice(0, 4)}</p>
                                        </div>
                                    </div>
                                </TableCell>

                                {/* Colonna "Type" */}
                                < TableCell sx={{ textAlign: 'right', padding: '16px 0px 16px 10px' }}>
                                    <Typography variant="h2" className="title-squad">{transfer.type}</Typography>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </Container >
    );
}