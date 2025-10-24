import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { keycloak } from "../utils/keycloak";

const Login = () => {
  const handleLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + "/dashboard",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#faf9f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: "url(/soil-pattern.png)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        >
          <Box
            component="img"
            src="SoilWiseLogo.png"
            alt="SoilWise Logo"
            sx={{
              width: 120,
              height: "auto",
              mb: 2,
              filter:
                "brightness(0) saturate(100%) invert(16%) sepia(18%) saturate(1617%) hue-rotate(337deg) brightness(95%) contrast(90%)",
            }}
          />

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 1,
              color: "#523626",
              fontWeight: 600,
            }}
          >
            Welcome to SoilWise
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mb: 0,
              textAlign: "center",
              color: "#8B7355",
            }}
          >
            Chatbot
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 2,
              backgroundColor: "#8B7355",
              "&:hover": {
                backgroundColor: "#6B5444",
              },
              color: "#FFF",
              fontWeight: 500,
              py: 1.5,
            }}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
