import React from 'react';
import {IStrategy} from "../types/strategy";
import {useGetQuery} from "../store/services/useFetch";
import {GridCellParams, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {getPlaceholder} from "../utils/getPlaceholder";
import {TextField} from "@mui/material";
import ServerError from "../components/ServerError";
import GridTable from "../components/GridTable";
import {ITrade} from "../types/trade";
import AutocompleteInput from "../components/AutocompleteInput";
import {forexPairs} from "../utils/options";

const Trades = () => {
    const {data :trades=[] as ITrade[], isLoading, isError} = useGetQuery("trades")


    const columns: GridColDef[] = [
        {
            field: "symbol",
            headerName: "Symbol",
            flex: 1,
            editable: true,
            renderCell: (params: GridCellParams): React.ReactNode => {
                return getPlaceholder(params.value as string, "Enter Symbol")
            },
            renderEditCell: (params:GridRenderCellParams) => {
                const { id, api, field } = params;
                const handleInputChange = (value: string | null) => {
                    api.setEditCellValue({id, field, value: value});
                };

                return (
                    <AutocompleteInput
                        setValue={handleInputChange}
                        options={forexPairs}
                        value={params.value}/>
                )
            },
        },
    ];


    return isError ? <ServerError /> : <GridTable isLoading={isLoading} title="Trades" endpoint="trades" rows={trades} columns={columns} />;

};

export default Trades;
