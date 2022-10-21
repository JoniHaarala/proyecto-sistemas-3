import React, { useState } from 'react'
import Header from '../Head'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';
import { supabase } from '../../supabase/client';

export default function AddCliente() {
  const [fechaNacimiento, setFechaNacimiento] = useState(moment().format('MM/DD/YYYY'))
  const [newCliente, setNewCliente] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    cuit: '',
    correo: '',
    telefono: '',
    direccionActual: '',
    phone: '',
    nacionalidad: '',
    mail: 'jonatan.haaralaorosco@gmail.com'
  })

  const handleSubmit = async () => {
    const data = { ...newCliente, nombreCompleto: newCliente.nombre + ' ' + newCliente.apellido, fechaNacimiento }
    console.log(data)
    try {
      const { error } = await supabase
        .from('clientes')
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
        <TextField value={newCliente.nombre} onChange={handleChange('name')} id="outlined-Nombre" label="Nombre" variant="outlined" />
        <TextField value={newCliente.apellido} onChange={handleChange('surname')} id="outlined-Nombre" label="Apellido" variant="outlined" />
        <TextField value={newCliente.correo} onChange={handleChange('correo')} type="email" id="outlined-Nombre" label="Correo/email" variant="outlined" />
        <TextField value={newCliente.telefono} onChange={handleChange('telefono')} id="outlined-Nombre" label="Telefono" variant="outlined" />
        <TextField value={newCliente.direccionActual} onChange={handleChange('direccionActual')} id="outlined-Nombre" label="Direccion Actual" variant="outlined" />
        <TextField value={newCliente.dni} onChange={handleChange('dni')} id="outlined-Nombre" label="DNI/Pasaporte" variant="outlined" />
        <TextField value={newCliente.cuit} onChange={handleChange('cuit')} id="outlined-Nombre" label="CUIT" variant="outlined" />
        <TextField value={newCliente.nacionalidad} onChange={handleChange('nacionalidad')} id="outlined-Nombre" label="Nacionalidad" variant="outlined" />
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fecha nacimiento: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              value={fechaNacimiento}
              inputFormat={'MM/DD/YYYY'}
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setFechaNacimiento(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>

        <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
      </form>
    </div>
  )
}
