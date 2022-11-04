import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment/moment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from '../Head';
import { supabase } from '../../supabase/client';
import { Link, useNavigate } from 'react-router-dom';

const Reserva = () => {

  const [getSolicitud, setgetSolicitud] = useState([])

  const getSolicitudes = async () => {
    try {
      let { data: operacion_solicitud, error } = await supabase
        .from('operacion_solicitud')
        .select('*')
      if (error) throw error
      if (operacion_solicitud) setgetSolicitud(operacion_solicitud)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() =>{
    getSolicitudes()
  },[])

  const navigate = useNavigate()
  const [newReserva, setNewReserva] = useState({
    solicitudID: '',
    tipoOp: '',
    estado: '',
    contrato: '',
    rentaMensual: '',
    fianza: '',
    pago: '',
    motivo: ''
  })
  const [inicioContrato, setInicioContrato] = useState(moment().format('MM/DD/YYYY'))
  const [finContrato, setFinContrato] = useState(moment().format('MM/DD/YYYY'))
  const [fechaReserva, setFechaReserva] = useState(moment().format('MM/DD/YYYY'))

  const handleChange = (prop) => (event) => {
    setNewReserva({ ...newReserva, [prop]: event.target.value });
  };
  const handleClose = (e) => {
    navigate('/setReservas')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = { ...newReserva, inicioContrato, finContrato, fechaCobro: fechaReserva }
    console.log(datos)
    try {

      const { error } = await supabase
        .from('operacion_contrato')
        .insert([
          datos,
        ])
      if (error) throw error
      alert("guardado con exito")
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <div className='flex items-baseline gap-6'>
        <Link to="/setReservas"><ArrowBackIcon /></Link>
        <Header category="Reservas" title="Agregar nueva reserva" />
      </div>

      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Asigna una solicitud</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newReserva.solicitudID}
            label="Asigna una solicitud"
            onChange={handleChange('solicitudID')}
          >
            {getSolicitud.map((value) => (
              <MenuItem value={value.id}>{value.id}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newReserva.estado}
            label="Estado"
            onChange={handleChange('estado')}
          >
            <MenuItem value={'pendiente'}>pendiente</MenuItem>
            <MenuItem value={'finalizada'}>finalizada</MenuItem>
            <MenuItem value={'rechazada'}>rechazada</MenuItem>
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de operacion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newReserva.tipoOp}
            label="Tipo de operacion"
            onChange={handleChange('tipoOp')}
          >
            <MenuItem value={'venta'}>Compra</MenuItem>
            <MenuItem value={'alquiler'}>Alquiler</MenuItem>
            <MenuItem value={'temporario'}>Alquiler temporario</MenuItem>
          </Select>
        </FormControl>
        {
          (newReserva.tipoOp === 'alquiler' || newReserva.tipoOp === 'temporario')
            ?
            <>
              <FormControl fullWidth>
                <InputLabel>Tipo de contrato</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newReserva.contrato}
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
                <TextField value={newReserva.rentaMensual} onChange={handleChange('rentaMensual')} type="number" label="Renta Mensual" variant="outlined" />
                <TextField value={newReserva.fianza} onChange={handleChange('fianza')} type="number" label="Fianza/Deposito" variant="outlined" />
                <TextField value={newReserva.pago} onChange={handleChange('pago')} type="number" label="Honorarios" variant="outlined" />
              </div>
            </>
            :
            <div className='flex gap-10'>
              <TextField value={newReserva.pago} onChange={handleChange('pago')} type="number" label="Pago Reserva" variant="outlined" />
              <TextField value={newReserva.fianza} onChange={handleChange('fianza')} type="number" label="N° de cuotas" variant="outlined" />
              <TextField value={newReserva.rentaMensual} onChange={handleChange('rentaMensual')} type="number" label="Couta Mensual" variant="outlined" />
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
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setInicioContrato(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
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
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setFinContrato(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
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
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setFechaReserva(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Motivo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newReserva.motivo}
            label="Tipo de operacion"
            onChange={handleChange('motivo')}
          >
            <MenuItem value={'trabajo'}>Trabajo</MenuItem>
            <MenuItem value={'estudio'}>estudio</MenuItem>
            <MenuItem value={'vacaciones'}>vacaciones</MenuItem>
            <MenuItem value={'otros'}>otros</MenuItem>
          </Select>
        </FormControl>

        <section className='flex justify-end gap-5'>
          <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
          <button onClick={handleClose} className='col-start-1 col-span-1 py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white'>Cancelar</button>
        </section>

      </form>
    </div>
  )
}

export default Reserva