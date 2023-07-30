import React from 'react';
import {useGetOptionsQuery, useGetQuery} from "../store/services/useFetch";
import {GridCellParams, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {getPlaceholder} from "../utils/getPlaceholder";
import ServerError from "../components/ServerError";
import GridTable from "../components/GridTable";
import {ITrade} from "../types/trade";
import AutocompleteInput from "../components/AutocompleteInput";
import {forexPairs, tradeTypes} from "../utils/options";
import Autocomplete from "../components/Autocomplete";
import {IOption} from "../types/general";
import {Label} from "@mui/icons-material";
import {Chip, Typography} from "@mui/material";

const Trades = () => {
    const {data :trades=[] as ITrade[], isLoading, isError} = useGetQuery("trades")
    const {data: strategies=[] as IOption[]} = useGetOptionsQuery({url: "strategies", labelName: "title"})

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
          field: "size",
          headerName: "Size",
            flex: 1,
          editable:true,
          type:"number"
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            editable: true,
            type: "singleSelect",
            valueOptions: tradeTypes
        },
        {
            field: "enter",
            headerName: "Enter",
            flex: 1,
            editable:true,
            type:"number"
        },
        {
            field: "exit",
            headerName: "Exit",
            flex: 1,
            editable:true,
            type:"number"
        },
        {
            field: 'pips',
            headerName: 'Pips',
            flex: 1,
            type: 'number',
        },
        {
            field: 'net',
            headerName: "Net",
            flex: 1,
            valueGetter: params => {
                if (params.row.net){
                    return `${params.row.net} ${params.row.symbol.split("/")[1]}`
                }
            }
        },
        {
            field: "result",
            headerName: "Result",
            flex:1,
            renderCell: (params: GridCellParams): React.ReactNode=>{
                const {value } = params
                if ( typeof value === "string"){
                    return <Chip variant="filled" label={value} color={value === "Win"? "success": "error"}/>
                } else {
                    return <Typography> - </Typography>
                }
            }
        },
        {
            field: "strategy",
            headerName: "Strategy",
            flex: 1,
            editable: true,
            renderCell: (params: GridCellParams): React.ReactNode => {
                // @ts-ignore
                return getPlaceholder(strategies.find(e=>e.value === params.value)?.label as string, "Select Strategy")
            },
            renderEditCell: (params:GridRenderCellParams) => {
                const { id, api, field } = params;
                const handleInputChange = (value: string | null) => {
                    api.setEditCellValue({id, field, value: value});
                };

                return (
                    // @ts-ignore
                    <Autocomplete options={strategies} value={params.value} setValue={handleInputChange}/>
                )
            },
        },

    ];


    return isError ? <ServerError /> : <GridTable isLoading={isLoading} title="Trades" endpoint="trades" rows={trades} columns={columns} />;

};

export default Trades;
