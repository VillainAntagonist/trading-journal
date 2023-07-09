import {Button, Popover, Stack, Typography} from '@mui/material';
import React, {FC, SyntheticEvent} from 'react';
import IconButton from "@mui/material/IconButton";
interface ConfirmationPopoverProps {
    title: string;
    handleSubmit: () => void;
    icon: React.ReactNode;
    disabled?: boolean

}
const ConfirmationPopover: FC<ConfirmationPopoverProps> = ({
    title,
    handleSubmit,
    icon,
    disabled=undefined                                                           }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement> ) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event : SyntheticEvent) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton disabled={disabled} onClick={handleClick}>
                {icon}
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            ><Stack>
                <Typography sx={{ p: 2 }}>Are you sure you want to {title}?</Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button size="small" onClick={handleSubmit}>Yes</Button>
                    <Button size="small" onClick={handleClose}>No</Button>
                </Stack>
            </Stack>
            </Popover>
        </div>
    );
};

export default ConfirmationPopover;
