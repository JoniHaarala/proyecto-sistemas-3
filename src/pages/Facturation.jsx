import { React, useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { gridFacturaStatus, contextMenuItems } from '../data/configData';
import { Header } from '../components';

export default function Facturation(Datos) {
  
  const [factura, setfactura] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:5063/api/Factura/ListarFacturas')
            .then((res) => res.json())
            .then((data) => {
                let facturas = data.facturas
                setfactura(facturas)
            })

    }, [])
  

  const facturaGrid = [
    {
      field: 'IdFactura',
      headerText: 'Id de factura',
      textAlign: 'Center',
      width: '80',
    },
    {
      field: 'FacturaCategory',
      headerText: 'Categoria',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    {
      field: 'Total',
      headerText: 'Monto total',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      headerText: 'Estado',
      template: gridFacturaStatus,
      field: 'estado',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'fecha',
      headerText: 'fecha',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'proveedor',
      headerText: 'Nombre de proveedor',
      width: '150',
      textAlign: 'Center',
    },
  ];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={factura}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {facturaGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
}
