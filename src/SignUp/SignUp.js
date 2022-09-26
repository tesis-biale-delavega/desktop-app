import React from "react";
import { Box, Link, Stack, TextField, Typography } from "@mui/material";
import vegexLogo from "../assets/vegex-logo.png";
import vegexBackground from "../assets/vegex-background.png";

const SignUp = () => {
  return (
    <Stack direction={"row"} flexGrow={1}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        flexGrow={1}
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
        </Stack>
        <Stack direction={"row"} mt={4} alignItems={"center"}>
          <Typography mr={1}>Ya tienes una cuenta?</Typography>
          <Link href={"/"} mr={1}>Login</Link>
          <Link href={"/projects"}>Projects List</Link>
        </Stack>
      </Stack>
      <img src={vegexBackground} alt={"vegex-background"} />
    </Stack>
  );
};

export default SignUp;
