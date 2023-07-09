import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";
import Page from "../components/Page";

const Main : React.FC = () => {
    return (
        <Page title="Main | Trading Journal">
        <Box sx={{
            height: 1,
            width: 1,
            display:"flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent:"center",
        }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" component="p">
                        Dashboard Coming Soon
                    </Typography>
                    <Typography variant="subtitle1">
                        Here will be a dashboard with some charts and statistics related to your trades.
                    </Typography>
                </CardContent>
            </Card>

        </Box>
        </Page>
    );
};

export default Main;
