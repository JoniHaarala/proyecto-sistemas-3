/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { supabase } from '../../supabase/client'


export default function PayFact() {

  const [ProvData, setProvData] = useState([])
  const [facturas, setFacturas] = useState([])
  const [Cuentas, setCuentas] = useState([])

  const getProveedor = async () => {
    try {
      let { data: proveedor, error } = await supabase
        .from('proveedor')
        .select('*')

      if (error) throw error
      if (proveedor) setProvData(proveedor)

    } catch (error) {
      console.error(error)
    }
  }
  const getCuenta = async () => {
    try {

      let { data: cuenta_bancaria, error } = await supabase
        .from('cuenta_bancaria')
        .select('*')

      if (error) throw error;
      if (cuenta_bancaria) setCuentas(cuenta_bancaria);

    } catch (error) {
      console.log(error)
    }
  }
  const getFactura = async () => {
    try {
      let { data: factura, error } = await supabase
        .from('factura')
        .select("*")
        .eq('estado', 'pendiente')

      if (error) throw error;
      if (factura) setFacturas(factura);
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getProveedor();
    getFactura();
    getCuenta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Esta info es para cuando no obtener un valor de un input porque no obtiene valores de forma controlada (ej: usando el .map())
  /* A way to get the value of an uncontrolled input field in React: */
  // Initialize a ref using the useRef hook.
  // Set the ref prop on the input field.
  // Access the value of the input field as ref.current.value
  const ImporteRef = useRef(undefined);
  const CbuRef = useRef(undefined);
  const SaldoRef = useRef(undefined);
  const CategoriaRef = useRef(undefined);
  const SucursalRef = useRef(undefined);
  const FechaVencimientoRef = useRef(undefined);
  const EstadoRef = useRef(undefined);

  const max = 11111111;
  const min = 99999999;

  const [Open, setOpen] = useState(false)
  const [dataPago, setDataPago] = useState({
    id: Math.floor(Math.random() * (max - min + 1) + min),
    idfactura: '',
    proveedor: '',
    banco: '',
    tipoPago: '',
  })

  console.log(dataPago.proveedor)

  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };

  const handlePagoFacturaDatos = (prop) => (event) => {
    setDataPago({ ...dataPago, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pagoFactura = {
      ...dataPago,
      cuenta: CbuRef.current.value,
      importe: ImporteRef.current.value
    }
    try {
      const { error } = await supabase
        .from('pagos')
        .insert([
          pagoFactura
        ])
      if (error) throw error;

    } catch (error) {
      console.error(error)
    }
    try {
      const { error } = await supabase
        .from('factura')
        .update({ estado: 'pagado' })
        // .match({ estado: 'pendiente' })
        .eq('id', `${pagoFactura.idfactura}`)

      if (error) throw error;
    }
    catch (error) {
      console.error(error)
    }
    try {
      const { error } = await supabase
        .from('factura')
        .update({ saldo: 0 })
        .match({ id: `${dataPago.idfactura}` })

      if (error) throw error;
    }
    catch (error) {
      console.error(error)
    }
    console.log(pagoFactura);
  }

  let dataFactura = facturas.filter((value) => value.proveedor === `${dataPago.proveedor}`);

  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="Facturas" title="Pagar factura" />

      {/* The above code is a form that is used to pay a bill. */}
      <form onSubmit={handleSubmit} className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">
        <section className="flex flex-col py-3">
          <label className="pb-4">
            Proveedor:
          </label>
          <select
            value={dataPago.proveedor}
            onChange={handlePagoFacturaDatos('proveedor')}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione el proveedor</option>
            {ProvData.map((item) => (
              <option value={item.nombre}>{item.nombre}</option>
            ))}
          </select>
        </section>

        {/* Creating a dropdown menu with the id of the invoices that are pending. */}
        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione la factura a pagar:
          </label>
          <select
            value={dataPago.idfactura}
            onChange={handlePagoFacturaDatos('idfactura')}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione una factura</option>
            {
              dataFactura.map((item) => (
                <option value={item.id}>{item.id}</option>
              ))}
          </select>
        </section>
        {
          dataFactura.filter((item) => item.proveedor === `${dataPago.proveedor}` && item.id === `${dataPago.idfactura}`).map((item) => (
            <div id="datos de la factura" className='grid grid-cols-2'>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Importe total:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={ImporteRef}
                  value={item.total}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Saldo restante:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={SaldoRef}
                  value={item.saldo}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Categoria:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={CategoriaRef}
                  value={item.tipo}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Sucursal:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={SucursalRef}
                  value={item.sucursal}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Fecha de vencimiento:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={FechaVencimientoRef}
                  value={item.fechaVencimiento}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Estado:
                </label>
                <input
                  type="text"
                  maxLength={22}
                  placeholder="Importe"
                  readOnly
                  ref={EstadoRef}
                  value={item.estado}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              </section>
            </div>
          ))
        }

        {/* estos campos se van a rellenar solos cuando se seleccione el id de la factura */}
        <section className="flex flex-col py-3">
          {/* Creating a dropdown menu with the data from the bancoData array. */}
          <label className="pb-4">
            Banco Seleccionado:
          </label>
          <select
            value={dataPago.banco}
            onChange={handlePagoFacturaDatos('banco')}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione una banco</option>
            {Cuentas.map((item) => (
              <option value={item.banco}>{item.banco}</option>
            ))}
          </select>
        </section>
        {Cuentas.filter((item) => item.banco === `${dataPago.banco}`).map((value) => (
          <div>
            <section className="flex flex-col py-3">
              <label className="pb-4">
                numero de cuenta:
              </label>
              <input
                type="text"
                maxLength={22}
                placeholder="Num. de cuenta"
                value={value.id}
                readOnly
                className='p-4 mr-10 rounded-lg shadow-md'
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
                ref={CbuRef}
                value={value.cbu}
                onChange={handlePagoFacturaDatos('cuenta')}
                readOnly
                className='p-4 mr-10 rounded-lg shadow-md'
              />
            </section>
          </div>
        ))}


        <section className="flex flex-col py-3">
          {/* Creating a dropdown menu with the options of "tarjeta de credito/debito" and "transferencia Bancaria" */}
          <label className="pb-4">
            Seleccione el metodo de pago:
          </label>
          <select
            value={dataPago.tipoPago}
            onChange={handlePagoFacturaDatos('tipoPago')}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione un metodo de pago</option>
            <option value='transferencia bancaria'>transferencia Bancaria</option>
            {/* <option value={2}>tarjeta de credito/debito</option> */}
          </select>
        </section>
        {/* {
          //A ternary operator. It is a conditional operator that assigns a value to a variable based on some condition.
          pago == 2
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
                value={txtTarjeta}
                onChange={handleChangetxtTarjeta}
                className='p-4 mr-10 ml-20 rounded-lg shadow-md'
              />

            </section>
            :
            // esto en resumen no nuestra ni agrega etiqueta alguna al codigo
            <></>
        } */}

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
            (dataPago.idfactura !== '' && dataPago.tipoPago !== '' && dataPago.banco !== '')
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
