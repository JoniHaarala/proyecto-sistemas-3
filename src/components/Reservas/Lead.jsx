import { useState } from 'react'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';
import Header from '../Head';
import { supabase } from '../../supabase/client';
import { Link, useNavigate } from 'react-router-dom';

export default function Lead() {
  const navigate = useNavigate()
  const [newLead, setNewLead] = useState({
    nombre: '',
    correo: '',
    direccionActual: '',
    telefono: '',
    dni: '',
    edad: ''
  })
  const [intereses, setIntereses] = useState({
    zonaInteres: '',
    precioMin: '',
    precioMax: '',
    numHab: '',
    numBaños: '',
    compartido: false,
    mascotas: false,
    notas: ''
  })
  const [fechaContacto, setFechaContacto] = useState(moment().format('MM/DD/YYYY'))
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...newLead, ...intereses, fechaContacto }
    console.log(data)
    try {

      const { error } = await supabase
        .from('operacion_lead')
        .insert([
          data,
        ])
      if (error) throw error
      alert("guardado con exito")
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleClose = (e) => {
    navigate('/setReservas')
  }
  const handleChange = (prop) => (event) => {
    setNewLead({ ...newLead, [prop]: event.target.value });
  };
  const handleIntereses = (prop) => (event) => {
    setIntereses({ ...intereses, [prop]: event.target.value });
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <div className='flex items-baseline gap-6'>
        <Link to="/setReservas"><ArrowBackIcon /></Link>
        <Header category="Reservas" title="Agregar Lead" />
      </div>
      <div className='flex flex-col lg:flex-row justify-center'>
        <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
          <TextField value={newLead.nombre} onChange={handleChange('nombre')} id="outlined-Nombre" label="Nombre" variant="outlined" />
          <TextField value={newLead.correo} onChange={handleChange('correo')} type="email" id="outlined-Apellido" label="Correo" variant="outlined" />
          <TextField value={newLead.direccionActual} onChange={handleChange('direccionActual')} id="outlined-Referencia" label="Direccion actual" variant="outlined" />
          <TextField value={newLead.telefono} onChange={handleChange('telefono')} id="outlined-Direccion" label="Telefono" variant="outlined" />
          <div className='flex gap-6'>
            <TextField value={newLead.dni} onChange={handleChange('dni')} id="outlined-Correo" label="dni/pasaporte" variant="outlined" />
            <TextField value={newLead.edad} onChange={handleChange('edad')} type="number" id="outlined-Nombre" label="Edad" variant="outlined" />
          </div>
          <section className="flex py-3 mt-5">
            <label className="self-center w-40 mr-3">Fecha de contacto: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Seleccione una fecha"
                value={fechaContacto}
                inputFormat={'MM/DD/YYYY'}
                className="bg-white shadow-lg"
                onChange={(newValue) => {
                  setFechaContacto(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </section>
          <section className='flex justify-end gap-5'>
            <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
            <button onClick={handleClose} className='col-start-1 col-span-1 py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white'>Cancelar</button>
          </section>
        </form>

        <div className='flex flex-col mt-5 py-5 px-10 w-full'>
          <section className='flex items-center justify-between'>
            <label htmlFor="lbl-Facturacion">🙂 Intereses</label>
            <Switch
              checked={checked}
              onChange={handleCheck}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </section>
          {
            checked
            &&
            <form className="mt-5 py-5 px-10 flex flex-col gap-5 rounded-lg">
              <TextField value={intereses.zonaInteres} onChange={handleIntereses('zonaInteres')} id="outlined-Nombre" label="Zona de interes" variant="outlined" />
              <TextField value={intereses.precioMin} onChange={handleIntereses('precioMin')} type="number" id="outlined-Direccion" label="Precio minimo" variant="outlined" />
              <TextField value={intereses.precioMax} onChange={handleIntereses('precioMax')} type="number" id="outlined-Correo" label="Precio maximo" variant="outlined" />
              <TextField value={intereses.numHab} onChange={handleIntereses('numHab')} type="number" id="outlined-Nombre" label="N° de habitaciones" variant="outlined" />
              <TextField value={intereses.numBaños} onChange={handleIntereses('numBaños')} type="number" id="outlined-DNI" label="N° de baños" variant="outlined" />
            </form>
          }
        </div>
      </div>
    </div>
  )
}
