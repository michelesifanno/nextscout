import { useState } from "react";
import { Grid2 as Grid, Box, Container, Tabs, Tab } from "@mui/material";
import PropTypes from 'prop-types';
import { useParams, useLocation } from "react-router-dom";
import InfoPlayer from "../components/player/InfoPlayer";
import CareerStats from '../components/player/CareerStats';
import usePlayerStats from "../utils/usePlayerStats";
import PlayerDetails from '../components/player/PlayerDetails';
import RadarStats from '../components/player/RadarStats';
import OtherPlayers from '../components/player/OtherPlayers';
import PlayerTransfers from '../components/player/PlayerTransfers';
import PlayerFixtures from "../components/player/PlayerFixtures";
import BestStats from "../components/player/BestStats";
import ActionsPlayer from "../components/player/ActionsPlayer";


export default function Player() {

    const [value, setValue] = useState(0);

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }



    const { slug } = useParams();
    const location = useLocation();

    const { id, name, logo } = location.state || {};

    const team = { id, name, logo };

    const playerId = parseInt(slug, 10); // Converte slug in intero


    const currentYear = new Date().getFullYear();
    const actualSeason = currentYear - 1;

    const { player, stats, loading, error } = usePlayerStats(playerId, actualSeason);


    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    if (!player || !stats || (Array.isArray(stats) && stats.length === 0)) {
        return <p>Dati non disponibili...</p>;
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Container>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid container size={{ xs: 12 }}>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <InfoPlayer player={player} stats={stats} />
                            <BestStats player={player} stats={stats} />
                            {/* <ActionsPlayer player={player} /> */}
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="player menu" centered textColor="secondary" indicatorColor="secondary"
>
                                        <Tab label="Info Player" {...a11yProps(0)} />
                                        <Tab label="Career Stats" {...a11yProps(1)} />
                                        <Tab label="Transfers" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    <PlayerDetails player={player} stats={stats} team={team} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <CareerStats />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    <PlayerTransfers />
                                </CustomTabPanel>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Grid container size={{ xs: 12, md: 8 }}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <OtherPlayers stats={stats} team={team} />
                    </Grid>
                </Grid> */}
            </Box>
        </Container >
    );
}