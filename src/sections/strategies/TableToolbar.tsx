import React from 'react';
import {usePostMutation} from "../../store/services/useFetch";
import {GridToolbar, GridToolbarContainer} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import {CircularProgress} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TableToolbar = () => {
    const [post, {isLoading: isPosting}] = usePostMutation();
    const handleAddStrategy = async() => {
        try {
            await post({url: "strategies"}).unwrap();
        }catch (e) {
            console.log(e)
        }
    };
    return (
        <GridToolbarContainer>
            <IconButton color="primary" onClick={handleAddStrategy} disabled={isPosting}>
                {isPosting ? <CircularProgress size={24} /> : <AddIcon />}
            </IconButton>
        </GridToolbarContainer>
    );
};

export default TableToolbar;
