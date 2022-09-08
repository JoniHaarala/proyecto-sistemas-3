import React from 'react';
import { proveedorColumn } from '../../data/configData';
import Header from '../Head';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function TablaProveedor({ data }) {
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

            <Header category="" title="Pagos" />
            {/* A component called Box and DataGrid used from Material UI grid API that is being used to create a table. 
                This table containe data from Facturas fetch in the component FActuration.jsx */}
            <Box sx={{ height: 640, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={proveedorColumn}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    loading={data.length !== 0 ? false : true}
                    experimentalFeatures={{ newEditingApi: true }}
                    className="bg-main-bg dark:bg-gray-400"
                />
            </Box>
        </div>
    )
}
