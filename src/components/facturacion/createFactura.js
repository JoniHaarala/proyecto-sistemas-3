/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from '../Head';
import moment from 'moment/moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function FormCreateFactura() {

  const [value, setValue] = useState(moment().format('MM/DD/YYYY'));
  const estado = 'pendiente'
  const [Total, setTotal] = useState(undefined)
  const [idProv, setIdProv] = useState(null)
  const [prov, setProv] = useState([])
  const [Aprove, setAprove] = useState(false)
  const [Open, setOpen] = useState(false)


  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Proveedor/ListarProveedor')
      .then((res) => res.json())
      .then((data) => { setProv(data.proveedores) })
  }, [])

  console.log((value.$M + 1 + '/' + value.$D + '/' + value.$y), idProv, Total); // DD/MM/YYYY

  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };

  const handleSubmit = async e => {
    e.preventDefault()

    if (Total != undefined && idProv != null && value != moment().format('MM/DD/YYYY')) {
      setAprove(true)
      let data =
      {
        fechaVencimiento: value.$M + 1 + '/' + value.$D + '/' + value.$y,
        total: Total,
        estado: estado,
        proveedor: idProv
      }

      try {
        let config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        let res = await fetch('https://www.inmoapi.somee.com/api/Factura/GuardarFactura', config)
        let json = await res.json()
        console.log(json)
      }
      catch (error) {
        console.error(error)
      }
    }

  }

  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="facturas" title="Registrar factura" />

      <form onSubmit={handleSubmit} className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">

        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione un proveedor:
          </label>
          <select
            value={idProv}
            onChange={(event) => setIdProv(event.target.value)}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          >
            <option value={null}>Nombre del proveedor...</option>
            {prov.map((item) => (
              <option value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </section>

        <section className="flex flex-col py-3">
          <label className="pb-4">Total:</label>
          <input
            type="number"
            min={0}
            name=""
            id=""
            placeholder='Ingrese el importe a pagar....'
            value={Total}
            onChange={(event) => setTotal(event.target.value)}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          />
        </section>

        <section className="flex py-3 mt-5">
          <label className="self-center w-44 mr-3">Fecha de vencimiento: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              disablePast={true}
              value={value}
              inputFormat={'MM/DD/YYYY'}
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
          <label className="pb-4">
            Estado:
          </label>
          <input
            type="text"
            name=""
            id=""
            disabled
            readOnly
            value={estado}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          />
        </section>

        <input type="submit" value="Guardar" onClick={handleToggle} className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-10 cursor-pointer hover:shadow-md" />

        <Snackbar open={Open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
          {
            (Aprove == true && Total != undefined && idProv != null && value != moment().format('MM/DD/YYYY'))
              ?
              <Alert onClose={handleClose} sx={{ width: '100%' }} severity="success">Guardado con exito!</Alert>
              :
              <Alert onClose={handleClose} sx={{ width: '100%' }} severity="error">Error al guardar los datos</Alert>
          }
        </Snackbar>

      </form>
    </div>
  )
}
