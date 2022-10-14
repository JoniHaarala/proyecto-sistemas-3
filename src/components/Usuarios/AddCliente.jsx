import React, { useState } from 'react'
import Header from '../Head'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';

export default function AddCliente() {
  const [fechaRegistro, setFechaRegistro] = useState(moment().format('MM/DD/YYYY'))
  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="Usuarios" title="Agregar Cliente" />
      <form className="mt-5 py-5 px-10 flex flex-col gap-5 rounded-lg">
        <TextField id="outlined-Nombre" label="Nombre" variant="outlined" />
        <TextField id="outlined-Nombre" label="referencia" variant="outlined" />
        <TextField type="email" id="outlined-Nombre" label="Correo/email" variant="outlined" />
        <TextField id="outlined-Nombre" label="telefono" variant="outlined" />
        <TextField id="outlined-Nombre" label="DNI/Pasaporte" variant="outlined" />
        <TextField id="outlined-Nombre" label="nacionalidad" variant="outlined" />
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fecha de registro: </label>
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
      </form>
    </div>
  )
}
