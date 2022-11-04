import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../../supabase/client'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from '../Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment/moment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link, useNavigate } from 'react-router-dom';


const Contratos = () => {

  const ClienteRef = useRef(undefined);
  const PropietarioRef = useRef(undefined);
  const CbuRef = useRef(undefined);
  const SaldoRef = useRef(undefined);
  const CategoriaRef = useRef(undefined);
  const SucursalRef = useRef(undefined);
  const FechaVencimientoRef = useRef(undefined);


  const [Contrato, setContrato] = useState({
    tipoOP: '',
    propiedad: '',
    estado: '',
    solicitudID: '',
    tipoOp: '',
    contrato: '',
    rentaMensual: '',
    fianza: '',
    pago: '',
    motivo: ''
  })
  const [tempReserva, setTempReserva] = useState("Seleccione una reserva")
  const [tempSolicitud, setTempSolicitud] = useState([])
  const [tempPropiedad, setTempPropiedad] = useState('')
  const [tempLead, setTempLead] = useState([])

  const [propiedades, setPropiedades] = useState([])
  const [contactos, setContactos] = useState([])
  const [solicitudes, setSolicitudes] = useState([])
  const [Open, setOpen] = useState(false)

  const [inicioContrato, setInicioContrato] = useState(moment().format('MM/DD/YYYY'))
  const [finContrato, setFinContrato] = useState(moment().format('MM/DD/YYYY'))
  const [fechaReserva, setFechaReserva] = useState(moment().format('MM/DD/YYYY'))

  const getPropiedad = async () => {
    try {
      let { data: propiedad, error } = await supabase
        .from('propiedad')
        .select('*')

      if (error) throw error
      if (propiedad) setPropiedades(propiedad)
    }
    catch (error) {
      console.error(error)
    }
  }
  const getContacto = async () => {
    try {
      let { data: operacion_lead, error } = await supabase
        .from('operacion_lead')
        .select('*')

      if (error) throw error
      if (operacion_lead) setContactos(operacion_lead)
    }
    catch (error) {
      console.error(error)
    }
  }
  const getSolicitud = async () => {
    try {
      let { data: operacion_solicitud, error } = await supabase
        .from('operacion_solicitud')
        .select('*')

      if (error) throw error
      if (operacion_solicitud) setSolicitudes(operacion_solicitud)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPropiedad()
    getContacto()
    getSolicitud()
  }, [])

  const handleTempReserva = (e) => {
    setTempReserva(e.target.value)
    setTempSolicitud(solicitudes.find(item => item.id === e.target.value))
    setTempPropiedad(solicitudes.map(item => item.propiedadID))
    setTempLead(solicitudes.map(item => item.leadID))
  }

  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = {
      ...Contrato,
      cliente: ClienteRef.current.value,
      propietario: PropietarioRef.current.value
    }
    console.log(datos)
    // try {
    //   const { error } = await supabase
    //     .from('operacion_contrato')
    //     .insert([
    //       datos,
    //     ])

    //   if (error) throw error
    // }
    // catch (error) {
    //   console.error(error)
    // }
    // try {
    //   const { error } = await supabase
    //     .from('clientes')
    //     .insert([
    //       contactos,
    //     ])

    //   if (error) throw error
    // }
    // catch (error) {
    //   console.error(error)
    // }
    // if (Contrato.tipoOp === 'alquiler') {
    //   try {
    //     const { error } = await supabase
    //       .from('alquiler')
    //       .insert([
    //         contactos,
    //       ])

    //     if (error) throw error
    //   }
    //   catch (error) {
    //     console.error(error)
    //   }
    // }
    // else if (Contrato.tipoOp === 'temporario'){
    //   try {
    //     const { error } = await supabase
    //       .from('alquiler_temporario')
    //       .insert([
    //         contactos,
    //       ])

    //     if (error) throw error
    //   }
    //   catch (error) {
    //     console.error(error)
    //   }
    // }
  }

  const handleChange = (prop) => (event) => {
    setContrato({ ...Contrato, [prop]: event.target.value });
  };
  console.log(Contrato)

  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    < div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl" >

      <Header category="Contratos" title="Generar contrato" />

      {/* The above code is a form that is used to Generate a new alquiler or compra contract. */}
      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
        <FormControl required fullWidth className=" col-span-2">
          <InputLabel id="demo-simple-select-label">buscar solicitud previa</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tempReserva}
            label="buscar solicitud previa"
            onChange={handleTempReserva}
          >
            {solicitudes.map((value) => (
              <MenuItem value={value.id}>solicitud n° {value.id}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className='grid grid-cols-2 gap-10'>
          {
            tempReserva !== '' &&
            propiedades.filter(item => item.id === tempPropiedad[0]).map((value) => (
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  Nombre propietario:
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  ref={PropietarioRef}
                  value={value.propietario}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
            ))
          }
          {
            tempReserva !== '' &&
            contactos.filter(item => item.id === tempLead[0]).map((value) => (
              <section className="flex flex-col py-3">
                <label className="pb-2">
                  Nombre propietario:
                </label>
                <input
                  type="text"
                  placeholder="Importe"
                  readOnly
                  ref={ClienteRef}
                  value={value.nombre}
                  onChange={handleChange('cliente')}
                  className='p-4 border-y border-x rounded-md'
                />
              </section>
            ))
          }
        </div>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Contrato.estado}
            label="Estado"
            onChange={handleChange('estado')}
          >
            <MenuItem value={'pendiente'}>pendiente</MenuItem>
            <MenuItem value={'aprobada'}>aprobada</MenuItem>
            <MenuItem value={'rechazada'}>rechazada</MenuItem>
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de operacion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Contrato.tipoOp}
            label="Tipo de operacion"
            onChange={handleChange('tipoOp')}
          >
            <MenuItem value={'venta'}>Compra</MenuItem>
            <MenuItem value={'alquiler'}>Alquiler</MenuItem>
            <MenuItem value={'temporario'}>Alquiler temporario</MenuItem>
          </Select>
        </FormControl>
        {
          (Contrato.tipoOp === 'alquiler' || Contrato.tipoOp === 'temporario')
            ?
            <>
              <FormControl required fullWidth>
                <InputLabel>Tipo de contrato</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Contrato.contrato}
                  label="Tipo de contrato"
                  onChange={handleChange('contrato')}
                >
                  <MenuItem value={'habitual'}>Habitual</MenuItem>
                  <MenuItem value={'temporal'}>Temporal</MenuItem>
                  <MenuItem value={'habitacional'}>Habitacional</MenuItem>
                  <MenuItem value={'vacacional'}>Vacacional</MenuItem>
                  <MenuItem value={'social'}>Social</MenuItem>
                  <MenuItem value={'renta antigua'}>Renta antigua</MenuItem>
                  <MenuItem value={'opcion a compra'}>Opcion a compra</MenuItem>
                </Select>
              </FormControl>
              <div className='flex gap-10'>
                <TextField value={Contrato.rentaMensual} onChange={handleChange('rentaMensual')} type="number" label="Renta Mensual" variant="outlined" />
                <TextField value={Contrato.fianza} onChange={handleChange('fianza')} type="number" label="Fianza/Deposito" variant="outlined" />
                <TextField value={Contrato.pago} onChange={handleChange('pago')} type="number" label="Honorarios" variant="outlined" />
              </div>
            </>
            :
            <div className='flex gap-10'>
              <TextField value={Contrato.pago} onChange={handleChange('pago')} type="number" label="Pago Reserva" variant="outlined" />
              <TextField value={Contrato.fianza} onChange={handleChange('fianza')} type="number" label="N° de cuotas" variant="outlined" />
              <TextField value={Contrato.rentaMensual} onChange={handleChange('rentaMensual')} type="number" label="Couta Mensual" variant="outlined" />
            </div>
        }

        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Inicio de contrato: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              disablePast={true}
              value={inicioContrato}
              inputFormat={'MM/DD/YYYY'}
              onChange={(newValue) => {
                setInicioContrato(newValue);
              }}
              renderInput={(params) => <TextField required helperText="formato MM/DD/YYYY" {...params} />}
            />
          </LocalizationProvider>
        </section>
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fin de contrato: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              disablePast={true}
              value={finContrato}
              inputFormat={'MM/DD/YYYY'}
              onChange={(newValue) => {
                setFinContrato(newValue);
              }}
              renderInput={(params) => <TextField required helperText="formato MM/DD/YYYY" {...params} />}
            />
          </LocalizationProvider>
        </section>
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fecha reserva: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              value={fechaReserva}
              inputFormat={'MM/DD/YYYY'}
              onChange={(newValue) => {
                setFechaReserva(newValue);
              }}
              renderInput={(params) => <TextField required helperText="formato MM/DD/YYYY" {...params} />}
            />
          </LocalizationProvider>
        </section>

        {
          (Contrato.tipoOp === 'alquiler' || Contrato.tipoOp === 'temporario') &&
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Motivo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Contrato.motivo}
              label="Motivo"
              onChange={handleChange('motivo')}
            >
              <MenuItem value={'trabajo'}>Trabajo</MenuItem>
              <MenuItem value={'estudio'}>estudio</MenuItem>
              <MenuItem value={'vacaciones'}>vacaciones</MenuItem>
              <MenuItem value={'otros'}>otros</MenuItem>
            </Select>
          </FormControl>
        }



        {/* Creating a dropdown menu with the id of the invoices that are pending. */}
        {/* <section className="flex flex-col py-3">
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
        </section> */}
        {/* {
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
        } */}

        {/* estos campos se van a rellenar solos cuando se seleccione el id de la factura */}
        {/* <section className="flex flex-col py-3">
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
        */}

        {/* {Cuentas.filter((item) => item.banco === `${dataPago.banco}`).map((value) => (
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
        ))} */}


        {/* <section className="flex flex-col py-3">
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
          </select>
        </section> */}

        <input type="submit" value="Generar contrato" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-5 cursor-pointer hover:shadow-md" onClick={handleToggle} />

        {/* The above code is a React component that is used to display a loading screen while the user is waiting for the data to be loaded. */}
        {/* <Backdrop
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
        </Snackbar> */}

      </form>
    </div>
  )
}

export default Contratos
