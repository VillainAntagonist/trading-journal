import React, {FC, useState} from 'react';
import {
    DataGrid,
    GridCellEditStopParams,
    GridCellEditStopReasons, GridColDef,
    GridRowSelectionModel,
    MuiEvent
} from "@mui/x-data-grid";
import TableToolbar from "../sections/strategies/TableToolbar";
import {usePatchMutation} from "../store/services/useFetch";
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
    const [patch, {isLoading: isPatching}] = usePatchMutation();
    const handleCellEditCommit = async (params: GridCellEditStopParams, event: MuiEvent) => {
        const {id, field} = params;
        if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
            return
        }

        // @ts-ignore
        console.log(event.target.value)

        // @ts-ignore
        await patch({url: `${endpoint}/${id}`, values: {[field]: event.target.value}}).unwrap()
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
                onCellEditStop={handleCellEditCommit}
                slots={{
                    toolbar: ()=><TableToolbar
                        title={title} selected={selected} endpoint={endpoint}/>,
                }}
            />
        </div>
    );
};

export default GridTable;
