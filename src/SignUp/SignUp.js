import React from "react";
import {Box, Link, Stack} from "@mui/material";

const SignUp = () => {
    return <Stack m={2}>
        <Link href={"/"}>Login</Link>
        <Link href={"/projects"}>Projects List</Link>
    </Stack>
}

export default SignUp;