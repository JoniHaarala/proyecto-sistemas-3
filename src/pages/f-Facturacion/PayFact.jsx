/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react'
import Header from '../../components/Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { facturaData, cuentasData, bancoData } from '../../data/localData';


function PayFact() {

  const [idFacPend, setidFacPend] = useState([])

  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Factura/ListarFacturas')
      .then((res) => res.json())
      .then((data) => { setidFacPend(data.facturas.filter((item) => item.estado === "pendiente")) })

  }, [])
  // Esta info es para cuando no obtener un valor de un input porque no obtiene valores de forma controlada (ej: usando el .map())
  /* A way to get the value of an uncontrolled input field in React: */

  // Initialize a ref using the useRef hook.
  // Set the ref prop on the input field.
  // Access the value of the input field as ref.current.value
  const inputCuentaRef = useRef(undefined);
  const inputCbuRef = useRef(undefined);
  const inputTotalRef = useRef(undefined);

  // const idFacPend = facturaData.filter((item) => item.estado === "pendiente")
  // los estados iniciales de todas las variables

  /* Setting the state of the component. */
  const [dataFactura, setdataFactura] = useState(['proveedor'])

  //ids para manejar los datos
  const [idFact, setIdFact] = useState(0)
  const [idBanco, setidBanco] = useState(0)

  const [pago, setPago] = useState(0)
  const [txtTarjeta, settxtTarjeta] = useState('')
  const [txtCBU, settxtCBU] = useState('')

  // para el manejo de estados de de validacion
  const [Open, setOpen] = useState(false)


  // todas las funciones tipo handle que cambian de estado y el submit
  /**
   * When the user clicks the close button, the modal will close.
   */
  const handleClose = () => {
    setOpen(false)
  };

  /**
   * When the user clicks on the button, the state of the button will change from open to closed or
   * closed to open.
   */
  const handleToggle = () => {
    setOpen(!Open)
  };

  /**
   * If the value of the event target is not equal to zero, then filter the facturaData array and
   * return the item where the id is equal to the event target value. 
   * 
   * If the value of the event target is equal to zero, then set the dataFactura state to an array with
   * one element, 'proveedor'.
   */
  const handleChangeFactura = (event) => {
    event.preventDefault();
    setIdFact(event.target.value);

    if (event.target.value !== 0) {
      let datFact = facturaData.filter(item => item.id == event.target.value)
      setdataFactura(datFact)
    }
    else {
      setdataFactura(['proveedor'])
    }
  }
  const handleChangeBanco = (event) => {
    event.preventDefault();
    setidBanco(event.target.value);
  }

  /**
   * When the user clicks on the button, the function will be called and the value of the input will be
   * set to the state.
   */
  const handleChangePago = (event) => {
    event.preventDefault();
    setPago(event.target.value)
  }
  const handleChangetxtTarjeta = (event) => {
    event.preventDefault();
    settxtTarjeta(event.target.value)
  }

  const handleChangetxtCBU = (event) => {
    event.preventDefault();
    settxtCBU(event.target.value)
    console.log(event.target.value)
  }

  /**
   * When the user clicks the submit button, the function will alert the user with the values of the
   * form, then prevent the default action of the form, then set the state of the datosPagos object,
   * then concatenate the stringified datosPagos object to the pagoFacturaData array.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const datosPagos =
    {

      importe: inputTotalRef.current.value,
      idTipoPago: pago,
      idcuenta: inputCuentaRef.current.value,
      idFactura: idFact

    }
    // alert(JSON.stringify(datosPagos))
    try {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosPagos)
      }
      let res = await fetch('http://www.inmoapi.somee.com/api/Pagos/PagarFactura', config)
      let json = await res.json()
      console.log(json)
    }
    catch (error) {
      console.error(error)
    }
  }


  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="Facturas" title="Pagar factura" />

      {/* The above code is a form that is used to pay a bill. */}
      <form onSubmit={handleSubmit} className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">

        {/* Creating a dropdown menu with the id of the invoices that are pending. */}
        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione la factura a pagar:
          </label>
          <select
            value={idFact}
            onChange={handleChangeFactura}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione una factura</option>
            {idFacPend.map((item) => (
              <option value={item.id}>{item.id}</option>
            ))}
          </select>
        </section>

        {/* estos campos se van a rellenar solos cuando se seleccione el id de la factura */}

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
          <label className="pb-4">
            Proveedor:
          </label>
          {
            idFact == 0
              ?
              <input
                type="text"
                maxLength={22}
                placeholder="Proveedor"
                readOnly
                className='p-4 mr-10 rounded-lg shadow-md'
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
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              ))
          }
        </section>

        <section className="flex flex-col py-3">
          {/* Creating a dropdown menu with the data from the bancoData array. */}
          <label className="pb-4">
            Banco Seleccionado:
          </label>
          <select
            value={idBanco}
            onChange={handleChangeBanco}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione una banco</option>
            {bancoData.map((item) => (
              <option value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </section>

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show bank account number */}
          <label className="pb-4">
            Num. de cuenta:
          </label>
          {
            idBanco == 0
              ?
              <input
                type="text"
                maxLength={22}
                placeholder="Num. de cuenta"
                readOnly
                className='p-4 mr-10 rounded-lg shadow-md'
              />
              :
              cuentasData.filter((item) => item.idbanco == idBanco).map((item) => (
                <input
                  ref={inputCuentaRef}
                  type="text"
                  name=""
                  id=""
                  placeholder='Num. de cuenta'
                  readOnly
                  value={item.id}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              ))
          }

        </section>

        <section className="flex flex-col py-3">
          {/* Creating a dropdown menu with the options of "tarjeta de credito/debito" and "transferencia Bancaria" */}
          <label className="pb-4">
            Seleccione el metodo de pago:
          </label>
          <select
            value={pago}
            onChange={handleChangePago}
            className="p-4 mr-10 rounded-lg shadow-md"
          >
            <option value={0}>Seleccione un metodo de pago</option>
            <option value={1}>transferencia Bancaria</option>
            <option value={2}>tarjeta de credito/debito</option>
          </select>
        </section>
        {
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
        }

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show the total bill amount */}
          <label className="pb-4">
            Importe total:
          </label>
          {
            idFact == 0
              ?
              <input
                type="text"
                maxLength={22}
                placeholder="Importe"
                readOnly
                value={txtCBU}
                className='p-4 mr-10 rounded-lg shadow-md'
              />
              :
              facturaData.filter(item => item.id == idFact).map((item2) => (
                <input
                  ref={inputTotalRef}
                  type="text"
                  name=""
                  id=""
                  maxLength={22}
                  placeholder="Importe"
                  value={item2.total}
                  readOnly
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              ))
          }

        </section>

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show the CBU */}
          <label className="pb-4">
            Ingrese el CBU:
          </label>
          {
            idBanco == 0
              ?
              <input
                type="text"
                maxLength={22}
                placeholder="CBU"
                readOnly
                className='p-4 mr-10 rounded-lg shadow-md'
              />
              :
              cuentasData.filter(item => item.idbanco == idBanco).map((item) => (
                <input
                  ref={inputCbuRef}
                  type="text"
                  name="txtCBU"
                  id='txtCBU'
                  maxLength={22}
                  placeholder="CBU"
                  readOnly
                  required
                  value={item.cbu}
                  onChange={handleChangetxtCBU}
                  className='p-4 mr-10 rounded-lg shadow-md'
                />
              ))
          }

        </section>

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
            ((idFact != 0 && (pago != 0 || pago == 1) && idBanco != 0) || (idFact != 0 && (pago != 0 || pago == 2) && idBanco != 0))
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
