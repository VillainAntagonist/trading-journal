import React, {FC} from 'react';
import {useHandleDeleteMultipleMutation, usePostMutation} from "../../store/services/useFetch";
import {GridRowSelectionModel, GridToolbar, GridToolbarContainer} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {IStrategy} from "../../types/strategy";
import {Delete} from "@mui/icons-material";

interface ITableToolbarProps {
    entities?: IStrategy[];
    selected: GridRowSelectionModel;
    endpoint: string;
}

const TableToolbar :FC<ITableToolbarProps> = ({endpoint, entities, selected}) => {
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
        <GridToolbarContainer>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{
                alignSelf: "flex-end"
            }}>
            <IconButton color="primary" onClick={handleAdd} disabled={isPosting}>
                {isPosting ? <CircularProgress size={24} /> : <AddIcon />}
            </IconButton>
                <IconButton color="error" onClick={() => handleDeleteMultiple({url: endpoint, values: selected})} disabled={isDeletingMultiple || selected.length === 0}>
                    {isDeletingMultiple ? <CircularProgress size={24} /> : <Delete />}
                </IconButton>
                </Stack>
        </GridToolbarContainer>
    );
};

export default TableToolbar;
