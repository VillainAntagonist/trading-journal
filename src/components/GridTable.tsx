import React, {FC, useState} from 'react';
import {
    DataGrid,
    GridCellEditStopParams,
    GridCellEditStopReasons, GridColDef, GridRowModel,
    GridRowSelectionModel,
    MuiEvent
} from "@mui/x-data-grid";
import TableToolbar from "../sections/strategies/TableToolbar";
import {usePatchMutation, usePutMutation} from "../store/services/useFetch";
import {IStrategy} from "../types/strategy";
import {ITrade} from "../types/trade";


interface GridTableProps {
    endpoint: string;
    rows: IStrategy[] | ITrade[];
    columns: GridColDef[];
    title: string;
    isLoading: boolean;
}

const GridTable: FC<GridTableProps> = ({endpoint, rows, columns, title, isLoading}) => {

    const [selected, setSelected] = useState<GridRowSelectionModel>([]);
    const [put, {isLoading:isPut}] = usePutMutation()
    const handleCellEditCommit = async (params: GridCellEditStopParams, event: MuiEvent, details:any) => {
        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
            return
        }
    };

    return (
        <div style={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={rows}
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
                processRowUpdate={async(newRow:GridRowModel) => {
                    await put({url: `${endpoint}/${newRow._id}`, ...newRow}).unwrap()
                    return newRow
                }}
                onCellEditStop={handleCellEditCommit}
                onProcessRowUpdateError={(error:Error)=>{
                    console.log(error)
                }}
                slots={{
                    toolbar: ()=><TableToolbar
                        title={title} selected={selected} endpoint={endpoint}/>,
                }}
            />
        </div>
    );
};

export default GridTable;
