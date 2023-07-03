import React from 'react';
import {
    useGetQuery,
    useHandleDeleteMutation,
    usePatchMutation,
    usePostMutation,
    usePutMutation
} from "../store/services/useFetch";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import TableToolbar from '../sections/strategies/TableToolbar';

const Strategies = () => {

    const {data :strategies=[], isLoading, isError} = useGetQuery("strategies")


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
            // renderCell: (params) => (
            //     <textarea
            //         value={params.value}
            //         style={{ width: "100%", height: "100%", resize: "none" }}
            //         // onChange={(e) => params.api.setEditCellValue(params.id, params.field, e.target.value)}
            //     />
            // ),
            // renderEditCell: (params) => (
            //     <textarea
            //         autoFocus
            //         value={params.value}
            //         style={{ width: "100%", height: "100%", resize: "none" }}
            //         // onChange={(e) => params.api.setEditCellValue(params.id, params.field, e.target.value)}
            //     />
            // ),
        },
    ];

    const handleCellEditCommit = async (params: GridRenderCellParams) => {
        const {id, field, value} = params;
        console.log(params)
        console.log(value)
       await patch({url: `strategies/${id}`, values: {[field]: value}}).unwrap()
    };



    return (

        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={strategies}
                columns={columns}
                loading={isLoading}
                getRowId={(row) => row._id}
                // @ts-ignore
                onCellEditStop={handleCellEditCommit}
                slots={{
                    toolbar: TableToolbar,
                }}
            />
        </div>
    );
};

export default Strategies;
