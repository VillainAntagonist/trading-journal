import {Box} from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import {FC, useState} from "react";
import styled from "@emotion/styled";
const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    backgroundColor: "white",
});

const MainStyle = styled(Box)(() => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: 64,
    paddingBottom: 20,
}));
const AuthLayout: FC = () => {

    const [open, setOpen] = useState(false);

    const handleToggle = () => { setOpen(prevState => !prevState) }

    return (
        <RootStyle>
            <Sidebar open={open} handleToggle={handleToggle} />
            <Navbar handleToggle={handleToggle}/>
            <MainStyle component="main">
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
};

export default AuthLayout;
