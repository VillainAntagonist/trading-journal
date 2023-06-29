import React, {FC} from 'react';
import {Box, Typography} from "@mui/material";
import Page from "../components/Page";

const NotFound: FC = () => {
    return (
        <Page title="404 Not Found">
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
        >
            <Box
                component="img"
                src="/static/media/pageNotFound.svg"
                sx={{ height: 330, mx: "auto", my: { xs: 5, sm: 10 } }}
            />
            <Typography variant="h6" mt={2}>
                Such page does not exist.
            </Typography>
        </Box>
        </Page>
    );
};

export default NotFound;
