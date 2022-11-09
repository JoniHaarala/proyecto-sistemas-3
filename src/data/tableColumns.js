import PropFactActions from '../components/facturacion/PropFactActions'
import {PropActions} from '../components'

export const clienteColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300
    },
    {
        field: 'nombreCompleto',
        headerName: 'NOMBRE COMPLETO',
        width: 200
    },
    {
        field: 'dni',
        headerName: 'DNI/PASAPORTE',
        width: 140
    },
    {
        field: 'cuit',
        headerName: 'CUIT',
        width: 220
    },
    {
        field: 'correo',
        headerName: 'CORREO',
        width: 220
    },
    {
        field: 'telefono',
        headerName: 'TELEFONO',
        width: 180
    },
    {
        field: 'direccionActual',
        headerName: 'DIRECCION ACTUAL',
        width: 250
    },
    {
        field: 'fechaNacimiento',
        headerName: 'FECHA NACIMIENTO',
        width: 250
    },
    {
        field: 'nacionalidad',
        headerName: 'NACIONALIDAD',
        width: 250
    },
];

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

export const PropiedadColumn = [
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
        width: 200,
    },

    {
        field: 'actions',
        headerName: 'ACCIONES',
        type: 'actions',
        renderCell: (params) => (
            <PropActions {...{ params }} />
        ),
    },
];

export const propietarioColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300
    },
    {
        field: 'nameSurname',
        headerName: 'NOMBRE COMPLETO',
        width: 200
    },
    {
        field: 'username',
        headerName: 'USUARIO',
        width: 140
    },
    {
        field: 'mail',
        headerName: 'CORREO',
        width: 220
    },
    {
        field: 'phone',
        headerName: 'TELEFONO',
        width: 180
    },
    {
        field: 'address',
        headerName: 'DIRECCION ACTUAL',
        width: 250
    },
];

export const alquilerColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300
    },
    {
        field: 'nameCliente',
        headerName: 'NOMBRE INQUILINO',
        width: 300
    },
    {
        field: 'namePropietario',
        headerName: 'NOMBRE PROPIETARIO',
        width: 300
    },
    {
        field: 'nombrePropiedad',
        headerName: 'ID DE PROPIEDAD',
        width: 300
    },
    {
        field: 'tipoCasa',
        headerName: 'TIPO DE CASA',
        width: 300
    },
    {
        field: 'direccionAlquilada',
        headerName: 'DIRECCION DEL ALQUILER',
        width: 300
    },
    {
        field: 'estado',
        headerName: 'ESTADO',
        width: 300
    },
];

export const tempAlquilerColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300
    },
    {
        field: 'nameCliente',
        headerName: 'NOMBRE INQUILINO',
        width: 300
    },
    {
        field: 'namePropietario',
        headerName: 'NOMBRE PROPIETARIO',
        width: 300
    },
    {
        field: 'nombrePropiedad',
        headerName: 'ID DE PROPIEDAD',
        width: 300
    },
    {
        field: 'tipoCasa',
        headerName: 'TIPO DE CASA',
        width: 300
    },
    {
        field: 'direccion',
        headerName: 'DIRECCION DEL ALQUILER',
        width: 300
    },
    {
        field: 'estado',
        headerName: 'ESTADO',
        width: 300
    },
];

export const contratoColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100
    },
    {
        field: 'cliente',
        headerName: 'NOMBRE CLIENTE',
        width: 250
    },
    {
        field: 'propietario',
        headerName: 'NOMBRE PROPIETARIO',
        width: 250
    },
    {
        field: 'tipoOp',
        headerName: 'TIPO OPERACION',
        width: 250
    },
    {
        field: 'contrato',
        headerName: 'TIPO CONTRATO',
        width: 250
    },
    {
        field: 'inicioContrato',
        headerName: 'INICIO CONTRATO',
        width: 300
    },
    {
        field: 'finContrato',
        headerName: 'FIN DE CONTRATO',
        width: 300
    },
    {
        field: 'estado',
        headerName: 'ESTADO',
        width: 300
    },
];

export const cuotaColumn = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150
    },
    {
        field: 'cliente',
        headerName: 'NOMBRE CLIENTE',
        width: 300
    },
    {
        field: 'idOperacion',
        headerName: 'TIPO OPERACION',
        width: 250
    },
    {
        field: 'cuota',
        headerName: 'N° DE CUOTA',
        width: 100
    },
    {
        field: 'monto',
        headerName: 'MONTO',
        width: 200
    },
    {
        field: 'saldo',
        headerName: 'SALDO',
        width: 200
    },
    {
        field: 'vencimiento',
        headerName: 'VENCIMIENTO',
        width: 200
    },
    {
        field: 'estado',
        headerName: 'ESTADO',
        width: 200
    },
    
];