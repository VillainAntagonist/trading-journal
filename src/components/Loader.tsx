import {FC} from "react";

import React from 'react';
import {Box, LinearProgress} from "@mui/material";

const Loader : FC = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress />
        </Box>
    );
};

export default Loader;
