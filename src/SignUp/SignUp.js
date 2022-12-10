import React, { useState } from "react";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import vegexLogo from "../assets/vegex-logo.png";
import vegexBackground from "../assets/vegex-background.png";
import "./SignUp.scss";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState(undefined);

  const signUpMutation = useMutation((body) => {
    return http.post(`/spring-api/auth/register`, body);
  });

  const onSubmit = () => {
    signUpMutation.mutate(signUpData, {
      onSuccess: () => {
        navigate("/")
        toast.success("Se ha registrado exitosamente!")
      },
      onError: (error) => {
        toast.error(error.data.message)
      }
    })
  }

  const areFieldsCompleted = () => {
    return signUpData && signUpData?.username && signUpData?.email && signUpData?.password
  }

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
            label="Nombre de usuario"
            variant="standard"
            fullWidth
            margin={"dense"}
            onChange={(e) => setSignUpData({...signUpData, username: e.target.value})}
          />
          <TextField
            id="sign-up-email"
            label="Email"
            variant="standard"
            type={"email"}
            fullWidth
            margin={"dense"}
            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
          />
          <TextField
            id="sign-up-password"
            label="Contraseña"
            variant="standard"
            type={"password"}
            fullWidth
            margin={"dense"}
            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
          />
          <Button variant={"contained"} sx={{ marginTop: 3 }} onClick={onSubmit} disabled={!areFieldsCompleted()}>
            Registrarse
          </Button>
        </Stack>
        <Stack direction={"row"} mt={4} alignItems={"center"}>
          <Typography color={"#c2c2c2"} mr={1}>¿Ya tienes una cuenta?</Typography>
          <Link href={"/"} mr={1} variant={"body1"} underline={"none"}>
            Login
          </Link>
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 6 }}>
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
