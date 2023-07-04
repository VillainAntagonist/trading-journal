import React, {SyntheticEvent, useState} from 'react';
import {
    useGetQuery,
    useHandleDeleteMutation,
    usePatchMutation,
    usePostMutation,
    usePutMutation
} from "../store/services/useFetch";
import {
    DataGrid,
    GridCellEditStopParams,
    GridCellEditStopReasons,
    GridColDef,
    GridRenderCellParams, GridRowSelectionModel, MuiEvent,
} from "@mui/x-data-grid";
import TableToolbar from '../sections/strategies/TableToolbar';
import {IStrategy} from "../types/strategy";
import {TextField} from "@mui/material";
import {GridStartCellEditModeParams} from "@mui/x-data-grid/models/api/gridEditingApi";



const Strategies = () => {

    const {data :strategies=[] as IStrategy[], isLoading, isError} = useGetQuery("strategies")

    const [selected, setSelected] = useState<GridRowSelectionModel>([]);


    const [put, {isLoading: isPutting}] = usePutMutation();

    const [handleDelete, {isLoading: isDeleting}] = useHandleDeleteMutation();

    const [patch, {isLoading: isPatching}] = usePatchMutation();


    const columns: GridColDef[] = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            editable: true,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            editable: true,
            renderEditCell: (params:GridRenderCellParams) => {
                const { id, api, field } = params;
                const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    api.setEditCellValue({id, field, value: event.target.value});
                };

                return (
                    <TextField
                        multiline
                        value={params.value}
                        onChange={handleInputChange}
                        fullWidth
                    />
                )
            },
        },
    ];

    const handleCellEditCommit = async (params: GridCellEditStopParams, event: MuiEvent) => {
        const {id, field} = params;
        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
            return
        }

        // @ts-ignore
        await patch({url: `strategies/${id}`, values: {[field]: event.target.value}}).unwrap()
    };



    return (

        <div style={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={strategies}
                columns={columns}
                loading={isLoading}
                disableColumnMenu
                disableColumnFilter
                checkboxSelection
                disableRowSelectionOnClick
                autoPageSize={true}
                getRowId={(row) => row._id}
                getRowHeight={() => 'auto'}
                rowSelectionModel={selected}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelected(newRowSelectionModel);
                }}
                onCellEditStop={handleCellEditCommit}
                slots={{
                    toolbar: TableToolbar,
                }}
            />
        </div>
    );
};

export default Strategies;
