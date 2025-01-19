import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import supabase from '../supabase/client';
import SelectLeague from '../components/sign/SelectLeague';
import SelectTeam from '../components/sign/SelectTeam';
import useTeams from '../hooks/useTeams';
import useLeagues from '../hooks/useLeagues';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const { teams, loadingTeam, errorTeam } = useTeams();
    const { leagues, loading, error } = useLeagues();
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        league: null,
        team: null,
    });

    const filteredTeams = formData.league
    ? teams.filter((team) => team.league_id === formData.league)
    : [];

    const navigate = useNavigate();

    const steps = ['Inserisci i dati', 'Seleziona campionato', 'Seleziona team'];

    const handleNext = () => {
        if (activeStep === 1 && !formData.league) {
            alert("Seleziona un campionato prima di procedere!");
            return;
        }
        if (activeStep === 2 && !formData.team) {
            alert("Seleziona un team prima di procedere!");
            return;
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        const { fullName, email, password, league, team } = formData;
        try {
            // Step 1: Registrazione dell'utente
            const { user, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        league_id: league,
                        team_id: team
                    },
                },
            });
    
            console.log("Utente registrato:", user);  // Aggiungi questo log
    
            if (signUpError) {
                alert(signUpError.error_description || signUpError.message);
                return;
            }
    
            // Successo, naviga alla homepage
            navigate('/');
        } catch (error) {
            console.error("Errore durante la registrazione: ", error); // Mostra eventuali errori
        }
    };
            
    

    return (
        <Container
            maxWidth="sm"
            sx={{
                padding: '24px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '24px', width: '100%' }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 && (
                <Box component="form" sx={{ width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Inserisci i tuoi dati
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Nome completo"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Indirizzo e-mail"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleNext} sx={{ marginTop: '16px' }}>
                        Avanti
                    </Button>
                </Box>
            )}

            {activeStep === 1 && (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Seleziona il campionato
                    </Typography>
                    <SelectLeague
                        leagues={leagues}
                        onLeagueSelect={(league) => {
                            if (league) {
                                handleChange('league', league.id);  // Passa l'ID del campionato
                            }
                        }}
                    />
                    <Box display="flex" justifyContent="space-between" sx={{ marginTop: '16px' }}>
                        <Button variant="outlined" onClick={handleBack}>
                            Indietro
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Avanti
                        </Button>
                    </Box>
                </Box>
            )}

            {activeStep === 2 && (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Seleziona il team
                    </Typography>
                    <SelectTeam
                        teams={filteredTeams}
                        onTeamSelect={(team) => {
                            if (team) {
                                handleChange('team', team);  // Passa l'ID del campionato
                            }
                        }}
                    />
                    <Box display="flex" justifyContent="space-between" sx={{ marginTop: '16px' }}>
                        <Button variant="outlined" onClick={handleBack}>
                            Indietro
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleRegister}>
                            Registrati
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default SignUp;
