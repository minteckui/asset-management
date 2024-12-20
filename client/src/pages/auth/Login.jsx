// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Stack, Container, Typography } from "@mui/material";
// routes

import useResponsive from "../../hooks/useResponsive";
// components
// import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import { LoginForm } from "../../sections/auth/login";
import electricity_grid from "/52706.avif";
// import logo from '/logo.webp';
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  // flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive("up", "md");

  return (
    <RootStyle>
      <HeaderStyle>
        {/* <Logo /> */}
        {/* {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account? {""}
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.register}
            >
              Get started
            </Link>
          </Typography>
        )} */}
      </HeaderStyle>

      {mdUp && (
        <SectionStyle>
          <Image
            ratio="1/1"
            visibleByDefault
            alt="login"
            src={electricity_grid}
          />
        </SectionStyle>
      )}

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Enter your details below.
              </Typography>
            </Box>

            <Iconify icon="flat-color-icons:lock" sx={{ fontSize: 56 }} />
          </Stack>

          <LoginForm />

          {/* {!smUp && (
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?{" "}
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          )} */}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
