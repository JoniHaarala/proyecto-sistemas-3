/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import Header from '../../components/Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import IdFactura from '../../components/facturacion/Factura';
import { facturaData, cuentasData, bancoData, pagoFacturaData } from '../../data/localData';


function PayFact() {

  const idFacPend = facturaData.filter((item) => item.estado === "pendiente")
  // los estados iniciales de todas las variables

  const [dataFactura, setdataFactura] = useState(['proveedor'])
  const [dataBanco, setdataBanco] = useState(['banco'])
  const [cuenta, setCuenta] = useState('')


  //ids para manejar los datos
  const [idFactura, setIdFactura] = useState(0)
  const [idBanco, setidBanco] = useState(0)

  const [pago, setPago] = useState('')
  const [txtTarjeta, settxtTarjeta] = useState('')
  const [txtCBU, settxtCBU] = useState('')

  // para el manejo de estados de de validacion
  const [Open, setOpen] = useState(false)

  // para el manejo de los datos que se van a guardar
  const [datosPagos, setDatosPagos] = useState(
    {
      IdPagos: 0,
      Importe: 0,
      Aprobado: false,
      FechaPago: '',
      idTipoPago: 0,
      idcuenta: 0,
      idFactura: 0
    })


  // todas las funciones tipo handle que cambian de estado y el submit
  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };
  const handleChangeFactura = (event) => {
    setIdFactura(event.target.value);

    if (event.target.value !== 0) {
      let datFact = facturaData.filter(item => item.id == event.target.value)
      setdataFactura(datFact)
    }
    else {
      setdataFactura(['proveedor'])
    }
  }
  const handleChangeBanco = (event) => {
    setidBanco(event.target.value);
    console.log(event.target.value)
    if (event.target.value !== 0) {
      const datBank = bancoData.filter(item => item.id == event.target.value)
      setdataBanco(datBank)
    }
    else {
      setdataBanco(['banco'])
    }
  }
  const handleChangePago = (event) => {
    setPago(event.target.value)
  }
  const handleChangetxtTarjeta = (event) => {
    settxtTarjeta(event.target.value)
  }

  // const handleChangetxtCBU = (event) => {
  //   settxtCBU(event.target.value)
  //   console.log(event.target.value)
  // }

  const handleSubmit = (event) => {
    alert('tu factura es: ' + idFactura);
    alert('tu metodo de pago es: ' + pago)
    alert('tu banco es: ' + idBanco);
    alert('tu cuenta es: ' + cuenta);
    alert('tu tarjeta es: ' + txtTarjeta)
    alert('tu cbu es: ' + txtCBU);

    event.preventDefault();
    setDatosPagos()
    pagoFacturaData.concat(JSON.stringify(datosPagos))
  }


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="Facturas" title="Pagar factura" />

      <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-5">
        {/* <IdFactura value={factura} click={handleChangeFactura} /> */}
        <>
          <label>
            Seleccione la factura a pagar:
            <select
              value={idFactura}
              onChange={handleChangeFactura}
              className="bg-gray-100 p-4 mx-3 rounded-lg"
            >
              <option value={0}>Seleccione una factura</option>
              {idFacPend.map((item) => (
                <option value={item.id}>{item.id}</option>
              ))}
            </select>
          </label>

        </>

        {/* estos campos se van a rellenar solos cuando se seleccione el id de la factura */}

        <>
          <label>
            Proveedor:
            {
              idFactura == 0
                ?
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Proveedor"
                  readOnly
                  className='bg-gray-100 p-4 mx-3 rounded-lg'
                />
                :
                dataFactura.map((item) => (
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Proveedor'
                    readOnly
                    value={item.proveedor}
                    className='bg-gray-100 p-4 mx-3 rounded-lg'
                  />
                ))
            }
          </label>

        </>
        <>
          <label>
            Banco Seleccionado:
            <select
              value={idBanco}
              onChange={handleChangeBanco}
              className="bg-gray-100 p-4 mx-3 rounded-lg"
            >
              <option value={0}>Seleccione una banco</option>
              {bancoData.map((item) => (
                <option value={item.id}>{item.nombre}</option>
              ))}
            </select>
          </label>

        </>
        <>
          <label>
            Num. de cuenta:
            {
              idBanco == 0
                ?
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Num. de cuenta"
                  readOnly
                  className='bg-gray-100 p-4 mx-3 rounded-lg'
                />
                :
                cuentasData.filter((item) => item.idbanco == idBanco).map((item) => (
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Num. de cuenta'
                    readOnly
                    value={item.id}
                    onChange={event => setCuenta(event.target.value)}
                    className='bg-gray-100 p-4 mx-3 rounded-lg'
                  />
                ))
            }
          </label>
        </>
        {/*  */}
        <>
          <label>
            Seleccione el metodo de pago:
            <select
              value={pago}
              onChange={handleChangePago}
              className="bg-gray-100 p-4 mx-3 rounded-lg"
            >
              <option value="null">Seleccione un metodo de pago</option>
              <option value="tarjeta de credito/debito">tarjeta de credito/debito</option>
              <option value="transferencia Bancaria">transferencia Bancaria</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>

        </>
        {
          pago === "tarjeta de credito/debito"
            ?
            <>
              <label>
                Ingrese numero de tarjeta:
                <input
                  type="text"
                  name="txtTarjeta"
                  id="txtTarjeta"
                  maxLength={16}
                  placeholder="Numero de tarjeta"
                  required
                  value={txtTarjeta}
                  onChange={handleChangetxtTarjeta}
                  className='bg-gray-100 p-4 mx-3 rounded-lg'
                />
              </label>

            </>
            :
            <></>
        }
        <>
          <label>
            Importe total:
            {
              idFactura == 0
                ?
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  value={txtCBU}
                  className='bg-gray-100 p-4 mx-3 rounded-lg'
                />
                :
                facturaData.filter(item => item.id == idFactura).map((item2) => (
                  <input
                    type="text"
                    name=""
                    id=""
                    maxLength={22}
                    placeholder="Importe"
                    value={item2.total}
                    readOnly
                    className='bg-gray-100 p-4 mx-3 rounded-lg'
                  />
                ))
            }
          </label>
        </>
        <>
          <label>
            Ingrese el CBU:
            {
              idBanco == 'null'
                ?
                <input
                  type="text"
                  maxLength={22}
                  placeholder="CBU"
                  readOnly
                  className='bg-gray-100 p-4 mx-3 rounded-lg'
                />
                :
                cuentasData.filter(item => item.idbanco == idBanco).map((item) => (
                  <input
                    type="text"
                    name="txtCBU"
                    id='txtCBU'
                    maxLength={22}
                    placeholder="CBU"
                    readOnly
                    required
                    value={item.cbu}
                    onChange={event => settxtCBU(event.target.value)}
                    className='bg-gray-100 p-4 mx-3 rounded-lg'
                  />
                ))
            }
          </label>
        </>

        <input type="submit" value="Pagar" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-10 cursor-pointer" onClick={handleToggle} />

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Open}
          onClick={handleClose}
          transitionDuration={1000}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
          {
            ((idFactura !== null && pago !== null) && (txtTarjeta !== '' || (pago === 'tarjeta de credito/debito' && txtCBU !== '')))
              ?
              <Alert onClose={handleClose} sx={{ width: '100%' }} severity="success">Transaccion realizada con exito!</Alert>
              :
              <Alert onClose={handleClose} sx={{ width: '100%' }} severity="error">Error al cargar los datos</Alert>
          }
        </Snackbar>

      </form>
    </div>
  )
}

export default PayFact
