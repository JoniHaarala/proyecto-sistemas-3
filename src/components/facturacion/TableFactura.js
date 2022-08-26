import { React, useEffect, useState } from 'react'
// import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
// import { gridFacturaStatus, contextMenuItems } from '../../data/configData';
import Header from '../Head';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function TableFactura() {

  const [factura, setfactura] = useState([])

  useEffect(() => {
    fetch('http://localhost:5063/api/Factura/ListarFacturas')
      .then((res) => res.json())
      .then((data) => {
        let facturas = data.facturas
        setfactura(facturas)
      })
  }, [])

  const gridFacturaStatus = (props) => (
    <button
      type="button"
      style={{ background: props.colorEstado }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.estado}
    </button>
  );

  const facturaColumn = [
    {
      field: 'id',
      headerName: 'Id factura',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 250,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Monto total',
      width: '150',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: '150',
    },
    {
      field: 'fechaFactura',
      headerName: 'Fecha factura',
      width: '180',
      textAlign: 'Center',
    },
    {
      field: 'proveedor',
      headerName: 'Nombre de proveedor',
      width: '250',
      editable: true
    },
  ];

  // const editing = { allowDeleting: true, allowEditing: false };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="" title="Facturas" />

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={factura}
          columns={facturaColumn}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      {/* <GridComponent
        id="gridcomp"
        dataSource={dataFactura}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {facturaGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent> */}
    </div>
  );
}
export default TableFactura;