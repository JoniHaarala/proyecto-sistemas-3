import { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ row, column }) {
    
    const [PageSize, setPageSize] = useState(10);
    
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={row}
                columns={column}
                pageSize={PageSize}
                onPageSizeChange={(page) => setPageSize(page)}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row.id}
                disableSelectionOnClick
                loading={row.length !== 0 ? false : true}
                experimentalFeatures={{ newEditingApi: true }}
                className="bg-main-bg dark:bg-gray-400"
            />
        </Box>
    )
}
