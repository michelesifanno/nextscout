import { Container, Grid2 as Grid, Typography, Button } from "@mui/material";

const typographyStyle = {
  fontWeight: '700',
  letterSpacing: '-1px',
  fontSize: '50px',
  lineHeight: '50px',
};

function NotFoundRoute() {
  return (
    <Container fullWidth disableGutters sx={{padding:"60px 20px 0px 20px", width:"100%!important", maxWidth: "none", minHeight:"100vh"}}>
    <Grid container alignItems="center" justifyContent="center">
        <Typography sx={typographyStyle}>
          Niente da vedere qui 🙁
        </Typography>
        <Button size="large" href="/">Torna alla Home 🧢</Button>
      </Grid>
    </Container>
  );
}

export default NotFoundRoute;
