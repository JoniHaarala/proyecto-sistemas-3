import PropFactActions from '../components/facturacion/PropFactActions'

export const facturaColumn = [
    {
        field: 'id',
        headerName: 'ID fACTURA',
        width: 150,
        align: "Center"
    },
    {
        field: 'proveedor',
        headerName: 'NOMBRE PROVEEDOR',
        width: 300,
    },
    {
        field: 'estado',
        headerName: 'ESTADO',
        width: 150,

    },
    {
        field: 'tipo',
        headerName: 'TIPO',
        width: 100,
    },
    {
        field: 'sucursal',
        headerName: 'SUCURSAL',
        width: 100,
    },

    {
        field: 'fechaRegistro',
        headerName: 'FECHA DE REGISTRO',
        width: '180',
    },
    {
        field: 'fechaVencimiento',
        headerName: 'FECHA DE VENCIMIENTO',
        width: 250,
    },
    {
        field: 'total',
        headerName: 'TOTAL FACTURA',
        width: 150,
    },
    {
        field: 'saldo',
        headerName: 'SALDO',
        width: 150,

    },
    {
        field: 'actions',
        headerName: 'ACCIONES',
        width: 150,
        type: 'actions',
        renderCell: (params) => (
            <PropFactActions {...{ params }} />
        ),
    },
];

export const pagosColumn = [
    {
        field: 'id',
        headerName: 'N° DE PAGO',
        textAlign: 'Center',
        width: '100',
    },
    {
        field: 'idfactura',
        headerName: 'ID FACTURA PAGADA',
        width: '180',
    },
    {
        field: 'proveedor',
        headerName: 'PROVEEDOR',
        width: '300',
    },
    {
        field: 'importe',
        headerName: 'IMPORTE',
        width: '120',
    },
    {
        field: 'fechaPago',
        headerName: 'FECHA DE PAGO',
        width: '200',
        textAlign: 'Center',
    },
    {
        field: 'banco',
        headerName: 'NOMBRE DEL BANCO',
        width: '250',
    },
    {
        field: 'cuenta',
        headerName: 'CBU',
        width: '250',
    },
    {
        field: 'tipoPago',
        headerName: 'FORMA DE PAGO',
        width: '250',
    },
    {
        field: 'aprobado',
        headerName: 'APROBADO',
        width: '100',
        renderCell: (params) => (params.aprobado === true ? "NO" : "SI")
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