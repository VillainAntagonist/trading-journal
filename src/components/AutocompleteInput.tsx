import React, { FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";

interface AutocompleteInputProps {
    options: string[];
    value: string | null;
    setValue: (value: string | null) => void;
}

const AutocompleteInput:FC<AutocompleteInputProps> = ({options, value, setValue}) => {

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, value:string) => {
    setValue(value);
    };

    const handleOptionChange = (event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
        setValue(newValue);
    };

    return (
        <Autocomplete
            value={value || ''}
            fullWidth
            onChange={handleOptionChange}
            inputValue={value || ''}
            onInputChange={handleInputChange}
            options={options}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} placeholder="Select or enter a value" variant="outlined" />
            )}
        />
    );
};

export default AutocompleteInput;
