import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CareerStats({ stats }) {

    const rows = ["Club", "Competitions", "Appearences", "Goals", "Assist"];

    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: 4, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#fff' }}>
                Career Stats
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche Carriera">
                    <TableHead>
                            {rows.map((row, index) => (
                                <TableCell key={index}>{row}</TableCell>
                            ))}
                    </TableHead>
                    <TableBody>
                        {stats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell><div style={{display:'flex', alignItems:'center'}}><img src={stat.team.logo} width="20px" style={{marginRight:'5px'}} /> {stat.team.name}</div></TableCell>
                                <TableCell><div style={{display:'flex', alignItems:'center'}}><img src={stat.league.logo} width="20px" style={{marginRight:'5px'}}/> {stat.league.name}</div></TableCell>
                                <TableCell>{stat.games.appearences}</TableCell>
                                <TableCell>{stat.goals.total}</TableCell>
                                <TableCell>{stat.goals.assists}</TableCell>

                            </TableRow>
                        ) )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
