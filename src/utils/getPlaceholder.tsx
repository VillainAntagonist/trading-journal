import React from "react";

export function getPlaceholder(value: string | undefined, placeholder: string) {
    return value ? value : <span style={{ color: 'gray' }}>{placeholder}</span>;
}
