import React from "react";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import vegexLogo from "../assets/vegex-logo.png";
import vegexBackground from "../assets/vegex-background.png";
import "./SignUp.scss";

const SignUp = () => {
  return (
    <Stack direction={"row"} flexGrow={1} sx={{ overflow: "hidden" }}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        flexGrow={1}
        m={2}
      >
        <img src={vegexLogo} alt={"vegex-logo"} />
        <Typography variant={"h5"} sx={{ color: "#49BB58" }}>
          VEGEX
        </Typography>
        <Stack mt={4}>
          <TextField
            id="sign-up-username"
            label="Username"
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            id="sign-up-username"
            label="Email"
            variant="standard"
            type={"email"}
            fullWidth
            margin={"dense"}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            id="sign-up-username"
            label="Password"
            variant="standard"
            type={"password"}
            fullWidth
            margin={"dense"}
            onChange={(e) => console.log(e.target.value)}
          />
          <Button variant={"contained"} sx={{ marginTop: 3 }}>
            Registrarse
          </Button>
        </Stack>
        <Stack direction={"row"} mt={4} alignItems={"center"}>
          <Typography mr={1}>Ya tienes una cuenta?</Typography>
          <Link href={"/"} mr={1} variant={"body1"} underline={"none"}>
            Login
          </Link>
          <Link href={"/projects"} variant={"body1"} underline={"none"}>
            Projects List
          </Link>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 8 }}>
        <img
          src={vegexBackground}
          alt={"vegex-background"}
          className={"signup-background-img"}
        />
      </Box>
    </Stack>
  );
};

export default SignUp;
