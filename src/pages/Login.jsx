import supabase from '../supabase/client';
import { Container, Grid2 as Grid, Typography, TextField, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(
      new FormData(loginForm)
    )
    try {
      let { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        alert(error.error_description || error.message)
      } else {
        loginForm.reset();
        navigate('/welcome');
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Puoi aggiungere qualsiasi altra logica di reindirizzamento o azioni post-logout qui
    navigate('/');
  };


  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h5" className="pageTitle">Login</Typography>
          <p>Inserisci e-mail e password per effettuare il login.</p>
          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Indirizzo e-mail"
              name="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              Sign In
            </Button>
          </form>
          <br />
          <Link to="/signup">Non sei registrato? Registrati qui.</Link>
          <br />
          <Link to="/recupero-password">Password dimenticata?</Link>
          <br />
          <br />
        </Grid>
      </Grid>
    </Container>
  );
}