import { React, useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from '../Head';

export default function FormCreateFactura() {

  const [value, setValue] = useState(null);

  const [datos, setDatos] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    let data =
    {

    }
    setDatos(data)

    try {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      }
      let res = await fetch('http://www.inmoapi.somee.com/api/Factura/GuardarFactura', config)
      let json = await res.json()
      console.log(json)
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="facturas" title="Registrar factura"/>

      <form onSubmit={handleSubmit} className="flex flex-col">

        <section className="bg-stone-500">
          <label></label>
        </section>
        <section className="bg-green-500">
          <label></label>
        </section>
        <section className="bg-red-500 flex flex-col">
          <label>hola perro: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              disablePast={true}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>
        <section className="bg-blue-500">
          <label></label>
        </section>

        <input type="submit" value="Guardar" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-10 cursor-pointer hover:shadow-md" />
      </form>
    </div>
  )
}
