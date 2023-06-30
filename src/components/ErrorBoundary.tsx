import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Page from "./Page";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: "",
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log the error or perform any necessary actions
        console.error(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <Page title="error">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <Box
                        component="img"
                        src="/static/media/error.svg"
                        sx={{ height: 330, mx: "auto", my: { xs: 5, sm: 10 } }}
                    />
                    <Typography variant="h6" mt={2}>
                        Error occurred. Please try again later.
                    </Typography>

                    <Card variant="outlined" sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="body2" color="error">
                                {this.state.errorMessage}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                </Page>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;




