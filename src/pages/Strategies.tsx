import {
    useGetQuery,
} from "../store/services/useFetch";
import {
  GridCellParams,
    GridColDef,
    GridRenderCellParams
} from "@mui/x-data-grid";
import {IStrategy} from "../types/strategy";
import {TextField} from "@mui/material";
import {getPlaceholder} from "../utils/getPlaceholder";
import ServerError from "../components/ServerError";
import GridTable from "../components/GridTable";



const Strategies = () => {

    const {data :strategies=[] as IStrategy[], isLoading, isError} = useGetQuery("strategies")



    const columns: GridColDef[] = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            editable: true,
            renderCell: (params: GridCellParams): React.ReactNode => {
             return getPlaceholder(params.value as string, "Enter title")
            },
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            editable: true,
            renderCell: (params: GridCellParams): React.ReactNode => {
               return getPlaceholder(params.value as string, "Enter description")
            },
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


    return isError ? <ServerError /> : <GridTable isLoading={isLoading} title="Strategies" endpoint="strategies" rows={strategies} columns={columns} />;
};

export default Strategies;
