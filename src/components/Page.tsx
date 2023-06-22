import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { Box } from '@mui/material';
import {Helmet} from "react-helmet";
interface PageProps {
    title?: string;
    children: React.ReactNode;
}

const Page: ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
    { children, title = '', ...other },
    ref
) => (
    <Box ref={ref} {...other} sx={{ mb: 5, mt: 2 }}>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </Box>
);

export default forwardRef(Page);
