import React from 'react';
import Stack from '@mui/material/Stack';
import DeleteFactura from './DeleteFactura';
import DetailFactura from './DetailFactura';
import EditFactura from './editFactura';

export default function PropFactActions({ params }) {

    return (
        <Stack direction="row" spacing={1}>
            <DetailFactura params={params} />

            <EditFactura params={params} />

            <DeleteFactura params={params} />
        </Stack>
    )
}

