import { useState, useEffect } from "react";
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function CareerStats({ stats }) {

    const rows = ["League", "Matches", "Goal", "Assist"];

    return (
        <Container sx={{ display: 'block', backgroundColor: '#121212', p: { xs: 3, md: 4 }, borderRadius: 2 }}>
            <Typography variant="h2" className='title-stats' sx={{ color: '#AE7AFF' }}>
                Career Stats
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="tabella statistiche Carriera">
                    <TableHead>
                        {rows.map((row, index) => (
                            <TableCell key={index} className={index >= rows.length - 3 ? "align-right" : ""} sx={{padding:'16px 0px 16px 10px'}}><p className="info-title-table">{row}</p></TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {stats.map((stat, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', padding:'16px 0px 16px 10px' }}>
                                    <img src={stat.team.logo} width="30px" style={{marginRight:'10px'}} />
                                    <div>
                                        <Typography variant="h2" className="title-squad">
                                            {stat.team.name}
                                        </Typography>
                                        <p className="info-title-table"> {stat.league.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell sx={{padding:'16px 0px 16px 10px'}}><Typography variant="h2" className="value-stats-table-season">{stat.games.appearences}</Typography></TableCell>
                                <TableCell sx={{padding:'16px 0px 16px 10px'}}><Typography variant="h2" className="value-stats-table-season">{stat.goals.total}</Typography></TableCell>
                                <TableCell sx={{padding:'16px 0px 16px 10px'}}><Typography variant="h2" className="value-stats-table-season">{stat.goals.assists}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
