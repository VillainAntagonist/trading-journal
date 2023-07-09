import React, {FC} from 'react';
import {useHandleDeleteMultipleMutation, usePostMutation} from "../../store/services/useFetch";
import {GridRowSelectionModel, GridToolbarContainer} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Divider, Stack, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Delete} from "@mui/icons-material";
import ConfirmationPopover from "../../components/ConfirmationPopover";

interface ITableToolbarProps {
    selected: GridRowSelectionModel;
    endpoint: string;
    title: string;
}

const TableToolbar :FC<ITableToolbarProps> = ({endpoint, title, selected}) => {
    const [post, {isLoading: isPosting}] = usePostMutation();
    const [handleDeleteMultiple, {isLoading: isDeletingMultiple}] = useHandleDeleteMultipleMutation();
    const handleAdd = async() => {
        try {
            await post({url: endpoint}).unwrap();
        }catch (e) {
            console.log(e)
        }
    };
    return (
        <GridToolbarContainer sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",

        }}>
            <Stack sx={{
                width: "100%",
            }} alignItems="center" direction="row" justifyContent="space-between">
            <Typography variant="h6">{title}</Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" >
            <IconButton color="primary" onClick={handleAdd} disabled={isPosting}>
                {isPosting ? <CircularProgress size={24} /> : <AddIcon />}
            </IconButton>
                <ConfirmationPopover
                    disabled={isDeletingMultiple || selected.length === 0}
                    handleSubmit={() => handleDeleteMultiple({url: endpoint, values: selected})}
                    title="delete selected elements"
                    icon={<Delete color="error"/>}/>
                </Stack>
                </Stack>
            <Divider/>
        </GridToolbarContainer>
    );
};

export default TableToolbar;
