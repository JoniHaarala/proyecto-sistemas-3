import { React, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function EditFactura({ idFactura }) {

  const [datos, setDatos] = useState([])
  const [proveedor, setProveedor] = useState([])
  const [idProveedor, setIdProveedor] = useState(0)
  const [value2, setValue2] = useState(null);



  useEffect(() => {
    fetch(`https://www.inmoapi.somee.com/api/Factura/ObtenerPorId/${idFactura}`)
      .then((set) => set.json())
      .then((res) => { setDatos([res.factura]) });
  }, [idFactura])

  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Proveedor/ListarProveedor')
      .then((set) => set.json())
      .then((res) => { setProveedor(res.proveedores) });
  }, [])

  console.log(idFactura)

  const handleSubmit = async e => {
    e.preventDefault()
    let data =
    {
    }
    setDatos(data)

    // try {
    //   let config = {
    //     method: 'PUT',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(datos)
    //   }
    //   let res = await fetch('https://www.inmoapi.somee.com/api/Factura/GuardarFactura', config)
    //   let json = await res.json()
    //   console.log(json)
    // }
    // catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <>
      <form className="bg-gray-100 flex flex-col gap-3 mt-5 py-5 pl-3 rounded-lg">
        {
          datos.map((item) => (
            <>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Seleccione una proveedor:
                </label>
                <select
                  value={idProveedor}
                  onChange={(event) => setIdProveedor(event.target.value)}
                  className=" bg-white p-4 mx-3 rounded-lg shadow-md"
                >
                  <option value={0}>Proveedor</option>
                  {proveedor.map((items) => (
                    <option key={items.id} value={items.id}>{items.nombre}</option>
                  ))
                  }
                  {console.log(idProveedor, datos)}
                </select>
              </section>

              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Importe total:
                </label>
                <input
                  type="text"
                  placeholder='Importe total'
                  readOnly
                  value={item.Total}
                  className='bg-white p-4 mx-3 rounded-lg shadow-md'
                />
              </section>
            </>
          ))
        }

        <section className="flex flex-col py-3">
          <label className="pb-4">Seleccione la fecha de vencimiento: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              disablePast={true}
              value={value2}
              className='bg-white p-4 mx-3 rounded-lg shadow-md'
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </section>
        <input type="submit" value="Guardar" onSubmit={handleSubmit} className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-10 cursor-pointer hover:shadow-md" />
      </form>
    </>
  )
}
