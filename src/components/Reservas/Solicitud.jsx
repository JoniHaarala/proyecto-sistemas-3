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

export default function Solicitud() {

  const [lead, setLead] = useState([])
  const [propiedadData, setPropiedadData] = useState([])
  const [TipoOp, setTipoOp] = useState('')

  const getLeads = async () => {
    try {
      let { data: operacion_lead, error } = await supabase
        .from('operacion_lead')
        .select('*')
        .eq('activo', true)
      if (error) throw error
      if (operacion_lead) setLead(operacion_lead)
    } catch (error) {
      console.log(error)
    }
  }
  const getPropiedad = async () => {
    try {

      let { data: propiedad, error } = await supabase
        .from('propiedad')
        .select('id,direccion,idCatVenta, idTipo')
        .eq('idEstado', 'activa')
      if (error) throw error
      if (propiedad) setPropiedadData(propiedad)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPropiedad()
    getLeads()
  }, [])


  const navigate = useNavigate()
  const [NewSolicitud, setNewSolicitud] = useState({
    leadID: '',
    propiedadID: '',
    estado: '',
    notas: ''
  })
  const [fechaSoli, setFechaSoli] = useState(moment().format('MM/DD/YYYY'))

  const handleChange = (prop) => (event) => {
    setNewSolicitud({ ...NewSolicitud, [prop]: event.target.value });
  };
  const handleClose = (e) => {
    navigate('/setReservas')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = { ...NewSolicitud, fechaSoli }
    try {
      const { error } = await supabase
        .from('operacion_solicitud')
        .insert([
          datos,
        ])

      if (error) throw error
      console.log("success")
    }
    catch (error) {
      console.error(error)
    }

    try {
      const { error } = await supabase
        .from('operacion_lead')
        .update({ activo: false })
        .eq('id', `${NewSolicitud.leadID}`)

      if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
    try {
      const { error } = await supabase
        .from('propiedad')
        .update({ idEstado: 'bajo oferta' })
        .eq('id', `${NewSolicitud.propiedadID}`)

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
        <Header category="Reservas" title="Agregar Solicitud" />
      </div>

      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Asignar un contacto</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={NewSolicitud.leadID}
            label="Asigna un contacto"
            onChange={handleChange('leadID')}
          >
            {lead.map((value) => (
              <MenuItem value={value.id}>{value.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de operacion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={TipoOp}
            label="Tipo de operacion"
            onChange={e => setTipoOp(e.target.value)}
          >
            <MenuItem value={"venta"}>Compra</MenuItem>
            <MenuItem value={"alquiler"}>Alquiler</MenuItem>
            <MenuItem value={"temporario"}>Temporario</MenuItem>
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="demo-simple-select-label">Asigna un inmueble</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={NewSolicitud.propiedadID}
            label="Asigna un inmueble"
            onChange={handleChange('propiedadID')}
          >
            {propiedadData.filter(item => item.idCatVenta === TipoOp).map((value) => (
              <MenuItem value={value.id}>{value.idTipo + ' en ' + value.direccion}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={NewSolicitud.estado}
            label="Estado"
            onChange={handleChange('estado')}
          >
            <MenuItem value={'abierta'}>Abierta</MenuItem>
            <MenuItem value={'con visita realizada'}>Con visita realizada</MenuItem>
            <MenuItem value={'con reserva hecha'}>Con reserva hecha</MenuItem>
            <MenuItem value={'cerrada'}>Cerrada</MenuItem>
            <MenuItem value={'descartada'}>Descartada</MenuItem>
          </Select>
        </FormControl>
        <section className="flex py-3 mt-5">
          <label className="self-center w-40 mr-3">Fecha de solicitud: </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Seleccione una fecha"
              value={fechaSoli}
              inputFormat={'MM/DD/YYYY'}
              className="bg-white shadow-lg"
              onChange={(newValue) => {
                setFechaSoli(newValue);
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
    </div>
  )
}
