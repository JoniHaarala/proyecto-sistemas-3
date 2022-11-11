/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import Header from '../../components/Head';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { supabase } from '../../supabase/client'

export default function PayCuota() {

  const [PropData, setPropData] = useState([])
  const [dataCliente, setDataCliente] = useState([])
  const [dataCuota, setDataCuota] = useState([])

  const getCliente = async () => {
    try {

      let { data: clientes, error } = await supabase
        .from('clientes')
        .select('*')

      if (error) throw error;
      if (clientes) setDataCliente(clientes);

    } catch (error) {
      console.log(error)
    }
  }

  const getPropiedad = async () => {
    try {

      let { data: propiedad, error } = await supabase
        .from('propiedad')
        .select('*')

      if (error) throw error
      if (propiedad) setPropData(propiedad)

    } catch (error) {
      console.error(error)
    }
  }
  const getCuotas = async () => {
    try {

      let { data: operacion_cuotas, error } = await supabase
        .from('operacion_cuotas')
        .select('*')
      if (error) throw error
      if (operacion_cuotas) setDataCuota(operacion_cuotas)
    } catch (error) {

    }
  }

  useEffect(() => {
    getPropiedad();
    getCliente();
    getCuotas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [Open, setOpen] = useState(false)
  const [dataPago, setDataPago] = useState({
    idcuota: '',
    propiedad: '',
    cliente: '',
    banco: '',
    tipoPago: '',
    cbu: '',
    tarjeta: '',
  })

  console.log(dataPago.proveedor)

  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };

  const handlePagoCuota = (prop) => (event) => {
    setDataPago({ ...dataPago, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pagoFactura = {
      ...dataPago,
    }

    try {

      const { error } = await supabase
        .from('operacion_cuotas')
        .update({ saldo: 0 })
        .eq('id', `${pagoFactura.idcuota}`)
      if (error) throw error;
      alert("pago realizado")
    } catch (error) {
      console.error(error)
    }

    console.log(pagoFactura);
  }

  let CuotasDatos = dataCuota.filter((value) => value.cliente === `${dataPago.cliente}` && value.saldo !== 0);

  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="Cuotas" title="Pagar Cuota" />

      {/* The above code is a form that is used to pay a bill. */}
      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione el cliente:
          </label>
          <select
            value={dataPago.cliente}
            onChange={handlePagoCuota('cliente')}
            className="p-4 border-y border-x rounded-md"
          >
            <option value={0}>Seleccione una cliente</option>
            {dataCliente.map((item) => (
              <option value={item.nombre}>{item.nombre}</option>
            ))}
          </select>
        </section>

        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione propiedad correspondiente:
          </label>
          <select
            value={dataPago.propiedad}
            onChange={handlePagoCuota('propiedad')}
            className="p-4 border-y border-x rounded-md"
          >
            <option value={0}>Seleccione una propiedad</option>
            {PropData.map((item) => (
              <option value={item.id}>{item.idTipo + " en " + item.direccion}</option>
            ))}
          </select>
        </section>

        {/* Creating a dropdown menu with the id of the invoices that are pending. */}
        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione la cuota a pagar:
          </label>
          <select
            value={dataPago.idcuota}
            onChange={handlePagoCuota('idcuota')}
            className="p-4 border-y border-x rounded-md"
          >
            <option value={0}>Seleccione una cuota</option>
            {
              CuotasDatos.map((item) => (
                <option value={item.id}>Cuota n°{item.cuota}</option>
              ))}
          </select>
        </section>
        {
          CuotasDatos.filter((item) => item.id === dataPago.idcuota).map((item) => (
            <div id="datos de la factura" className='grid grid-cols-2'>
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  monto a pagar
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  value={item.monto}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  Saldo
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  value={item.saldo}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  Total
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  value={item.total}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  vencimiento
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  value={item.vencimiento}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  Estado
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  value={item.estado}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
            </div>
          ))
        }

        <section className="flex flex-col py-3">
          {/* Creating a dropdown menu with the options of "tarjeta de credito/debito" and "transferencia Bancaria" */}
          <label className="pb-4">
            Seleccione el metodo de pago:
          </label>
          <select
            value={dataPago.tipoPago}
            onChange={handlePagoCuota('tipoPago')}
            className="p-4 border-y border-x rounded-md"
          >
            <option value={0}>Seleccione un metodo de pago</option>
            <option value={1}>transferencia Bancaria</option>
            <option value={2}>tarjeta de credito/debito</option>
          </select>
        </section>
        {
          //A ternary operator. It is a conditional operator that assigns a value to a variable based on some condition.
          dataPago.tipoPago == 2
            ?
            <section className="flex flex-col py-3">
              <label className="pb-4 ml-20">
                Ingrese numero de tarjeta:
              </label>
              <input
                type="text"
                name="txtTarjeta"
                id="txtTarjeta"
                maxLength={16}
                placeholder="Numero de tarjeta"
                required
                value={dataPago.tarjeta}
                onChange={handlePagoCuota('tarjeta')}
                className='p-4 border-y border-x rounded-md'
              />

            </section>
            :
            <div>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  numero de cuenta:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Num. de cuenta"
                  value={dataPago.banco}
                  onChange={handlePagoCuota('banco')}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  CBU:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Num. de cuenta"
                  value={dataPago.cbu}
                  onChange={handlePagoCuota('cbu')}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
            </div>
        }

        <input type="submit" value="Pagar" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-5 cursor-pointer hover:shadow-md" onClick={handleToggle} />

        {/* The above code is a React component that is used to display a loading screen while the user is waiting for the data to be loaded. */}
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
            (dataPago.idcuota !== '' && dataPago.tipoPago !== '' && dataPago.banco !== '')
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
