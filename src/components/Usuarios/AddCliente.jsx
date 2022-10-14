import React, { useState } from 'react'
import Header from '../Head'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';

export default function AddCliente() {
  const navigate = useNavigate()
  const [fechaRegistro, setFechaRegistro] = useState(moment().format('MM/DD/YYYY'))
  const [newCliente, setNewCliente] = useState({
    name: '',
    surname: '',
    idrol: 'cliente',
    mail: '',
    address: '',
    phone: ''
  })
  const [dni, setDni] = useState('')
  const [nacionalidad, setNacionalidad] = useState('')
  const [referencia, setReferencia] = useState('')

  const handleSubmit = async () => {
    const data = { ...newCliente, nameSurname: newCliente.name + ' ' + newCliente.surname }
    console.log(data)
    try {
      const { error } = await supabase
        .from('usuario')
        .insert([
          data,
        ])
      if (error) throw error;
      console.log("guardado con exito")
    }
    catch (error) {
    }
  }
  const handleChange = (prop) => (event) => {
    setNewCliente({ ...newCliente, [prop]: event.target.value });
  };
  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="Usuarios" title="Agregar Cliente" />
      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 flex flex-col gap-5 rounded-lg">
        <TextField value={newCliente.name} onChange={handleChange('name')} id="outlined-Nombre" label="Nombre" variant="outlined" />
        <TextField value={newCliente.surname} onChange={handleChange('surname')} id="outlined-Nombre" label="Apellido" variant="outlined" />
        <TextField value={referencia} onChange={e => setReferencia(e.target.value)} id="outlined-Nombre" label="Referencia" variant="outlined" />
        <TextField value={newCliente.mail} onChange={handleChange('mail')} type="email" id="outlined-Nombre" label="Correo/email" variant="outlined" />
        <TextField value={newCliente.phone} onChange={handleChange('phone')} id="outlined-Nombre" label="Telefono" variant="outlined" />
        <TextField value={dni} onChange={e => setDni(e.target.value)} id="outlined-Nombre" label="DNI/Pasaporte" variant="outlined" />
        <TextField value={nacionalidad} onChange={e => setNacionalidad(e.target.value)} id="outlined-Nombre" label="Nacionalidad" variant="outlined" />
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fecha nacimiento: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              value={fechaRegistro}
              inputFormat={'MM/DD/YYYY'}
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setFechaRegistro(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>
        <section className='flex justify-center gap-4'>
          <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
          <button onClick={navigate('/listarClientes')} className='col-start-1 col-span-1 py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white'>Cancelar</button>
        </section>

      </form>
    </div>
  )
}
