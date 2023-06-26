import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import {useLogoutMutation} from "../../store/services/authApi";
import {ExitToApp, Menu} from "@mui/icons-material";
import {AppBar, Toolbar} from "@mui/material";

interface NavbarProps {
    handleToggle: () => void;
}

const Navbar: FC<NavbarProps> = ({handleToggle}) => {
    const [logout, { isLoading }] = useLogoutMutation();

    return (
        <AppBar position="fixed">
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <IconButton aria-label="menu" color="inherit" onClick={handleToggle} sx={{mr:1}}>
                    <Menu />
                </IconButton>
            <IconButton aria-label="logout" onClick={logout} disabled={isLoading} color="inherit">
                <ExitToApp />
            </IconButton>
        </Toolbar>
        </AppBar>
    );
};

export default Navbar;
