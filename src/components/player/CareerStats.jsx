import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CareerStats({ stats }) {

    const rows = ["Club", "Competitions", "P", "G", "A"];

    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#fff' }}>
                Season details
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche Carriera">
                    <TableHead>
                            {rows.map((row, index) => (
                                <TableCell key={index} className={index >= rows.length - 3 ? "align-right" : ""}><p className="info-title-table">{row}</p></TableCell>
                            ))}
                    </TableHead>
                    <TableBody>
                        {stats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell><img src={stat.team.logo} width="30px" /></TableCell>
                                <TableCell><p className="info-title-table"> {stat.league.name}</p></TableCell>
                                <TableCell><Typography variant="h2" className="value-stats-table-season">{stat.games.appearences}</Typography></TableCell>
                                <TableCell><Typography variant="h2" className="value-stats-table-season">{stat.goals.total}</Typography></TableCell>
                                <TableCell><Typography variant="h2" className="value-stats-table-season">{stat.goals.assists}</Typography></TableCell>
                            </TableRow>
                        ) )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
