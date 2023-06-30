import React from 'react';
import {Box} from "@mui/material";
import Page from "../components/Page";

const Main : React.FC = () => {
    return (
        <Page title="Main | Trading Journal">
        <Box sx={{
            bgcolor: "red",
            height: 400,
            width: 400
        }}>

        </Box>
        </Page>
    );
};

export default Main;
