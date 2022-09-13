import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropActions from './PropActions';
//import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';


const TablePropiedades = () => {

    const [PageSize, setPageSize] = useState(10)
    const [dataProp, setdataProp] = useState([])

    const fetchPropiedades = async () => {
        let { data: propiedad, error } = await supabase
            .from('propiedad')
            .select('id,direccion,precio,idCatVenta,idTipo,propietario')

        if (error) console.log("error", error);
        else setdataProp(propiedad);
    };

    useEffect(() => {
        fetchPropiedades()
    }, [])

    const PropiedadColumn = [
        // {
        //     field: 'photoURL',
        //     headerName: 'Avatar',
        //     width: 60,
        //     renderCell: (params) => <Avatar src={params.row.photoURL} />,
        //     sortable: false,
        //     filterable: false,
        // },
        {
            field: 'id',
            headerName: 'ID',
            width: 120

        },
        {
            field: 'direccion',
            headerName: 'DIRECCION',
            width: 250
        },
        {
            field: 'precio',
            headerName: 'PRECIO',
            width: 150
        },
        {
            field: 'idCatVenta',
            headerName: 'OPERACION',
            width: 130,
        },
        {
            field: 'idTipo',
            headerName: 'TIPO',
            width: 150,
        },
        {
            field: 'propietario',
            headerName: 'PROPIETARIO',
            width: 150,
        },

        {
            field: 'actions',
            headerName: 'ACCIONES',
            type: 'actions',
            renderCell: (params) => (
                <PropActions {...{ params }} />
            ),
        },
    ]

    return (
        <div className='flex flex-col gap-3'>
            <Link to='/addPropiedad' className="p-4 self-end bg-blue-400 mb-2 shadow-md text-sm font-bold rounded-xl">+ Añadir nueva propiedad</Link>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={dataProp}//datos de bd
                    columns={PropiedadColumn}//nombres columna
                    pageSize={PageSize}
                    onPageSizeChange={(page) => setPageSize(page)}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowId={(row) => row.id}
                    checkboxSelection
                    disableSelectionOnClick
                    loading={dataProp.length !== 0 ? false : true}
                    experimentalFeatures={{ newEditingApi: true }}
                    className="bg-main-bg dark:bg-gray-200"
                />
            </Box>
        </div>
    )
}

export default TablePropiedades;