import React, {FC} from 'react';
import {Autocomplete as MuiAutocomplete, TextField} from "@mui/material";
import {IOption} from "../types/general";

interface AutocompleteProps {
    options: IOption[];
    value: string | null;
    setValue: ( value:string | null) => void;
}

const Autocomplete:FC<AutocompleteProps> = ({
                                                               options,
                                                               value,
                                                               setValue,
                                                           }) => {
    const handleOptionChange = (
        _: React.ChangeEvent<unknown>,
        value: IOption | null
    ) => {
        const newValue = value !== null ? value.value : ""
        setValue(newValue)
    };

    return (
        <MuiAutocomplete
            value={
                value
                    ? options.find((option) => option.value === value)
                    : null
            }            fullWidth
            onChange={handleOptionChange}
            options={options}
            getOptionLabel={(option) => {
                return option.label ? option.label : "";
            }}
            isOptionEqualToValue={(option, value) => {
                return value ? option.value === value.value : value === undefined;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Select a value"
                    variant="outlined"
                />
            )}
        />
    );
};

export default Autocomplete;
