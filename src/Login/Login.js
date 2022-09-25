import React from "react";
import {Box, Container, Link, Stack} from "@mui/material";

const Login = () => {
    return <Stack m={2}>
        <Link href={"/signup"}>Register</Link>
        <Link href={"/projects"}>Projects List</Link>
    </Stack>
}

export default Login;