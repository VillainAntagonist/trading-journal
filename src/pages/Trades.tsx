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
import Autocomplete from "../components/Autocomplete";

const Trades = () => {
    const {data :trades=[] as ITrade[], isLoading, isError} = useGetQuery("trades")
    const {data: strategies=[] as IStrategy[]} = useGetQuery("strategies")

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
        {
            field: "strategy",
            headerName: "Strategy",
            flex: 1,
            editable: true,
            renderCell: (params: GridCellParams): React.ReactNode => {
                // @ts-ignore
                return getPlaceholder(params.value?.title as string, "Select Strategy")
            },
            renderEditCell: (params:GridRenderCellParams) => {
                const { id, api, field } = params;
                const handleInputChange = (value: string | null) => {
                    api.setEditCellValue({id, field, value: value});
                };

                return (
                    // @ts-ignore
                    <Autocomplete<IStrategy> options={strategies} value={params.value} setValue={handleInputChange} field="title"/>
                )
            },
        },

    ];


    return isError ? <ServerError /> : <GridTable isLoading={isLoading} title="Trades" endpoint="trades" rows={trades} columns={columns} />;

};

export default Trades;
