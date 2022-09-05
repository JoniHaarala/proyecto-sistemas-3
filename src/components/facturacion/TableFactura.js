import { React } from 'react'
import Header from '../Head';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { facturaColumn } from '../../data/configData';

function TableFactura({ data }) {
  // const gridFacturaStatus = (props) => (
  //   <button
  //     type="button"
  //     style={{ background: props.colorEstado }}
  //     className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  //   >
  //     {props.estado}
  //   </button>
  // );

  // const editing = { allowDeleting: true, allowEditing: false };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="" title="Facturas" />
      {/* A component called Box and DataGrid used from Material UI grid API that is being used to create a table. 
      This table containe data from Facturas fetch in the component FActuration.jsx */}
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={facturaColumn}
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
  );
}
export default TableFactura;