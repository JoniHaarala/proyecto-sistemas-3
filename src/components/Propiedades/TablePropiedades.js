import React, { useState } from 'react'
import { GetPropiedades } from './dataPropiedades';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropActions from './PropActions';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import AddPropiedad from './addPropiedad';


const TablePropiedades = () => {

    const [PageSize, setPageSize] = useState(10)
    const [rowId, setRowId] = useState(null);
    
    const PropiedadColumn = [
        {
            field: 'photoURL',
            headerName: 'Avatar',
            width: 60,
            renderCell: (params) => <Avatar src={params.row.photoURL} />,
            sortable: false,
            filterable: false,
        },
        { field: 'name', headerName: 'Name', width: 170 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'role',
            headerName: 'Role',
            width: 100,
            type: 'singleSelect',
            valueOptions: ['basic', 'editor', 'admin'],
            editable: true,
        },
        {
            field: 'active',
            headerName: 'Active',
            width: 100,
            type: 'boolean',
            editable: true,
        },
        /*{
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
        },*/
        { field: 'id', headerName: 'Id', width: 220 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            renderCell: (params) => (
                <PropActions {...{ params, rowId }} />
            ),
        },
    ]

    return (
        <div className='flex flex-col gap-3'>
            <Link to='/addPropiedad' className="p-4 self-end bg-blue-600 mb-2 rounded-xl">+ Añadir nueva propiedad</Link>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={GetPropiedades}//datos de bd
                    columns={PropiedadColumn}//nombres columna
                    pageSize={PageSize}
                    onPageSizeChange={(page)=>setPageSize(page)}
                    rowsPerPageOptions={[5,10,20]}
                    getRowId={(row)=>row.id}
                    checkboxSelection
                    disableSelectionOnClick
                    loading={GetPropiedades.length !== 0 ? false : true}
                    experimentalFeatures={{ newEditingApi: true }}
                    className="bg-main-bg dark:bg-gray-200"
                />
            </Box>
        </div>
    )
}

export default TablePropiedades;