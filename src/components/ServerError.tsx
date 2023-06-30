import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";

const ServerError: FC = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Box
                component="img"
                src="/static/media/serverError.svg"
                sx={{ height: 330, mx: "auto", my: { xs: 5, sm: 10 } }}
            />
            <Typography variant="h6" mt={2}>
                Looks like we have server error. Please try again later.
            </Typography>
        </Box>
    );
};

export default ServerError;
