import React, {FC, SyntheticEvent} from 'react';
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

        </div>
    );
};

export default ConfirmationPopover;
