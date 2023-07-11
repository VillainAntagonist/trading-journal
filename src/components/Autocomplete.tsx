import React, {FC} from 'react';
import {Autocomplete as MuiAutocomplete, TextField} from "@mui/material";

interface AutocompleteProps<T extends { [key: string]: string }> {
    options: T[];
    value: T | null;
    setValue: (value: T | null) => void;
    field: keyof T;
}

const Autocomplete = <T extends { [key: string]: string }>({
                                                               options,
                                                               value,
                                                               setValue,
                                                               field
                                                           }: AutocompleteProps<T>) => {
    const handleOptionChange = (
        _: React.ChangeEvent<unknown>,
        newValue: T | null
    ) => {
        setValue(newValue);
    };

    return (
        <MuiAutocomplete
            value={value}
            fullWidth
            onChange={handleOptionChange}
            options={options}
            getOptionLabel={(option) => option[field]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Select or enter a value"
                    variant="outlined"
                />
            )}
        />
    );
};

export default Autocomplete;
