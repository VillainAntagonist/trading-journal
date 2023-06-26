import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
    return (
        <Box height={400} width={400}>
            <Box height={100} />
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress data-testid="loading-indicator" size={100} />
            </Box>
            <Box height={100} />
            <Box display="flex" justifyContent="center" alignItems="center">
                <h3>Loading...</h3>
            </Box>
            <Box height={100} />
            <Box display="flex" justifyContent="center" alignItems="center">
                <h4>It may take a while...</h4>
            </Box>
            <CircularProgress />
        </Box>
    );
};



export default Loading;
