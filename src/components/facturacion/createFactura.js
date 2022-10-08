import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Header from '../Head';
import moment from 'moment/moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropDetalleFact from './PropDetalleFact';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { supabase } from '../../supabase/client'

export default function FormCreateFactura() {

  useEffect(() => {
    getProveedor();
    getDetalleFactura()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [prov, setProv] = useState([])

  const [dataFactura, setDataFactura] = useState({
    id: '',
    proveedor: '',
    sucursal: '',
    tipo: '',
    total: 0,
    saldo: 0,
    estado: 'pendiente'
  })
  const [fechaRegistro, setfechaRegistro] = useState(moment().format('MM/DD/YYYY'));
  const [fechaVencimiento, setFechaVencimiento] = useState(moment().format('MM/DD/YYYY'))
  const [detalleFact, setDetalleFact] = useState([])

  let sum = 0
  for (let i = 0; i < detalleFact.length; i++) {
    sum += detalleFact[i].subtotal
  }

  const [Open, setOpen] = useState(false)
  const [Aprove, setAprove] = useState(false)

  const getProveedor = async () => {
    try {
      let { data: proveedor, error } = await supabase
        .from('proveedor')
        .select("*")
      if (error) throw error;
      if (proveedor) setProv(proveedor);
    }
    catch (e) {
      console.error(e)
    }
  }
  const getDetalleFactura = async () => {
    try {
      let { data: detalle_factura, error } = await supabase
        .from('detalle_factura')
        .select('*')
        .eq('idfactura', `${dataFactura.id}`)
      if (error) throw error;
      if (detalle_factura) setDetalleFact(detalle_factura);

    } catch (error) {
      console.error(error);
    }
  }


  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!Open)
  };

  const handleFacturaSubmit = async e => {
    e.preventDefault()

    if (dataFactura.proveedor !== '' && dataFactura.tipo !== '' && dataFactura.id !== '' && dataFactura.sucursal !== '') {
      setAprove(true)
      console.log(dataFactura)
      let datos = {
        ...dataFactura,
        fechaRegistro,
        fechaVencimiento,
        mail: supabase.auth.user().email
      }
      console.log(datos)
      try {
        const { error } = await supabase
          .from('factura')
          .insert([
            datos
          ])
        if (error) throw error;

      }
      catch (error) {
        console.error(error);
      }
      // try {
      //   let config = {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(data)
      //   }
      //   let res = await fetch('https://www.inmoapi.somee.com/api/Factura/GuardarFactura', config)
      //   let json = await res.json()
      //   console.log(json)
      // }
      // catch (error) {
      //   console.error(error)
      // }
    }
  }

  const handleDataFactura = (prop) => (e) => {
    setDataFactura({ ...dataFactura, [prop]: e.target.value });
  }

  /* Creating a new component called Alert that is a forwardRef. */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="facturas" title="Registrar factura" />

      <form onSubmit={handleFacturaSubmit} className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
          <label className="pb-4">
            N° de factura:
          </label>
          <input
            type="text"
            placeholder='numero de factura...'
            value={dataFactura.id}
            onChange={handleDataFactura('id')}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          />
        </section>

        <div className='flex'>
          <section className="flex flex-col py-3">
            <label className="pb-4">
              Categoria:
            </label>
            <select
              value={dataFactura.tipo}
              onChange={handleDataFactura('tipo')}
              className='p-4 mr-10 rounded-lg shadow-md bg-white'
            >
              <option value={null}>Seleccione Categoria</option>
              <option value={'A'}>A</option>
              <option value={'B'}>B</option>
              <option value={'C'}>C</option>
            </select>
          </section>
          <section className="flex flex-col py-3">
            {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
            <label className="pb-4">
              Sucursal:
            </label>
            <input
              type="text"
              placeholder='Sucursal...'
              maxLength={4}
              value={dataFactura.sucursal}
              onChange={handleDataFactura('sucursal')}
              className='p-4 mr-10 rounded-lg shadow-md bg-white'
            />
          </section>
        </div>

        <section className="flex flex-col py-3">
          <label className="pb-4">
            Seleccione un proveedor:
          </label>
          <select
            value={dataFactura.proveedor}
            onChange={handleDataFactura('proveedor')}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          >
            <option value={''}>Nombre del proveedor...</option>
            {prov.map((item) => (
              <option value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </section>

        <div className='flex justify-between'>
          <section className="flex py-3 mt-5">
            <label className="self-center w-40 mr-3">Fecha de registro: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Seleccione una fecha"
                value={fechaRegistro}
                inputFormat={'MM/DD/YYYY'}
                className="bg-white shadow-lg"
                onChange={(newValue) => {
                  setfechaRegistro(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </section>
          <section className="flex py-3 pr-10 mt-5">
            <label className="self-center w-40 mr-3">Fecha de vencimiento: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Seleccione una fecha"
                disablePast={true}
                value={fechaVencimiento}
                inputFormat={'MM/DD/YYYY'}
                className="bg-white shadow-lg"
                onChange={(newValue) => {
                  setFechaVencimiento(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </section>
        </div>

        <section className="flex flex-col py-3">
          {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
          <label className="pb-4">
            Estado:
          </label>
          <input
            type="text"
            disabled
            readOnly
            value={dataFactura.estado}
            className='p-4 mr-10 rounded-lg shadow-md bg-white'
          />
        </section>
        <DataTable value={detalleFact} responsiveLayout="scroll">
          <Column field="descripcion" header="Concepto"></Column>
          <Column field="cantidad" header="Cantidad"></Column>
          <Column field="precio" header="Precio unitario"></Column>
          <Column field="subtotal" header="Subtotal"></Column>
        </DataTable>
        <PropDetalleFact idfactura={dataFactura.id} detalleFact={detalleFact} setDetalleFact={setDetalleFact} />

        <div className='flex justify-end'>
          <section className="flex flex-col">
            <label className="pb-4">Total:</label>
            <input
              type="number"
              min={0}
              placeholder='Importe a pagar....'
              value={sum}
              onChange={handleDataFactura('total')}
              className='p-4 mr-10 rounded-lg shadow-md bg-white'
            />
          </section>
          <section className="flex flex-col">
            <label className="pb-4">Saldo:</label>
            <input
              type="number"
              min={0}
              placeholder='Importe a pagar....'
              value={sum}
              onChange={handleDataFactura('saldo')}
              className='p-4 mr-10 rounded-lg shadow-md bg-white'
            />
          </section>
        </div>

        <input type="submit" value="Guardar" onClick={handleToggle} className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-10 cursor-pointer hover:shadow-md" />

        <Snackbar open={Open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
          {
            (Aprove === true)
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
