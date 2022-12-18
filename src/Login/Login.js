import React, { useState } from "react";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import vegexLogo from "../assets/vegex-logo.png";
import vegexBackground from "../assets/vegex-background.png";
import "./Login.scss";
import { useMutation } from "react-query";
import * as http from "../utils/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(undefined);

  const signUpMutation = useMutation((body) => {
    return http.post(`/spring-api/auth/login`, body);
  });

  const onSubmit = () => {
    signUpMutation.mutate(loginData, {
      onSuccess: (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        navigate("/projects");
      },
      onError: (error) => {
        error.status === 401 && toast.error("Credenciales inválidas");
      },
    });
  };

  const areFieldsCompleted = () => {
    return loginData && loginData?.email && loginData?.password;
  };

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
            id="login-email"
            label="Email"
            variant="standard"
            type={"email"}
            fullWidth
            margin={"dense"}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            id="login-password"
            label="Contraseña"
            variant="standard"
            type={"password"}
            fullWidth
            margin={"dense"}
            sx={{ marginTop: 2 }}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <Button
            variant={"contained"}
            sx={{
              marginTop: 8
            }}
            onClick={onSubmit}
            disabled={!areFieldsCompleted()}
          >
            Login
          </Button>
        </Stack>
        <Stack direction={"row"} mt={4} alignItems={"center"}>
          <Link href={"/signup"} mr={1} variant={"body1"} underline={"none"}>
            Crear una cuenta
          </Link>
          {/*<Link href={"/projects"} variant={"body1"} underline={"none"}>*/}
          {/*    Proyectos (DEV ONLY)*/}
          {/*</Link>*/}
        </Stack>
      </Stack>
      <Box sx={{ flexGrow: 6 }}>
        <img
          src={vegexBackground}
          alt={"vegex-background"}
          className={"login-background-img"}
        />
      </Box>
    </Stack>
  );
};

export default Login;
