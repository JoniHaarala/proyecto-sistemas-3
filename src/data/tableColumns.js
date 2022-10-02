import PropFactActions from '../components/facturacion/PropFactActions'

export const facturaColumn = [
    {
        field: 'id',
        headerName: 'Id factura',
        width: '100',
        align: "Center"
    },
    {
        field: 'proveedor',
        headerName: 'Nombre de proveedor',
        width: 250,
    },
    {
        field: 'fechaVencimiento',
        headerName: 'fecha vencimiento',
        width: 250,
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
    },
    {
        field: 'actions',
        headerName: 'ACCIONES',
        type: 'actions',
        renderCell: (params) => (
            <PropFactActions {...{ params }} />
        ),
    },
];

export const pagosColumn = [
    {
        field: 'id',
        headerName: 'Id pago',
        textAlign: 'Center',
        width: '100',
    },
    {
        field: 'idFactura',
        headerName: 'id factura pagada',
        width: '150',
    },
    {
        field: 'importe',
        headerName: 'importe',
        width: '120',
    },
    {
        field: 'aprobado',
        headerName: 'Aprobado',
        width: '100',
    },
    {
        field: 'fechaPago',
        headerName: 'Fecha de pago',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'nombreBanco',
        headerName: 'Nombre de banco',
        width: '300',
    },
    {
        field: 'numCuenta',
        headerName: 'numero de cuenta',
        width: '200',     
    },
    {
        field: 'cbu',
        headerName: 'CBU',
        width: '250',       
    },
    {
        field: 'tipoPago',
        headerName: 'tipo de pago',
        width: '250',       
    },
];

export const proveedorColumn = [
    {
        field: 'id',
        headerName: 'Id Proveedor',
        textAlign: 'Center',
        width: '100',
    },
    {
        field: 'cuit',
        headerName: 'cuit proveedor',
        width: '150',
        editable: true,
    },
    {
        field: 'nombre',
        headerName: 'nombre empresa',
        textAlign: 'Center',
        width: '250',
    },
    {
        field: 'telefono',
        headerName: 'telefono',
        width: '200',
        editable: true,
    },
    {
        field: 'correo',
        headerName: 'Correo',
        textAlign: 'Center',
        width: '250',
    },
    {
        field: 'direccion',
        headerName: 'Direccion',
        width: '230',
        editable: true,
    },
    {
        field: 'pais',
        headerName: 'Pais origen',
        textAlign: 'Center',
        width: '160',
    },
    {
        field: 'codPostal',
        headerName: 'Cod. Postal',
        width: '120',
        editable: true,
    },
];