import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../supabase/client'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Header from '../Head';


const Contratos = () => {
  const clienteRef = useRef(undefined);
  const propietarioRef = useRef(undefined);

  const [Contrato, setContrato] = useState({
    tipoOP: '',
    propiedad: '',
    estado: ''
  })
  const [tempReserva, setTempReserva] = useState("Seleccione una reserva")
  const [tempSolicitud, setTempSolicitud] = useState([])
  const [tempPropiedad, setTempPropiedad] = useState('')
  const [tempLead, setTempLead] = useState([])

  const [reservas, setReservas] = useState([])
  const [propiedades, setPropiedades] = useState([])
  const [contactos, setContactos] = useState([])
  const [solicitudes, setSolicitudes] = useState([])


  const getReservas = async () => {
    try {
      let { data: operacion_reserva, error } = await supabase
        .from('operacion_reserva')
        .select('*')

      if (error) throw error
      if (operacion_reserva) setReservas(operacion_reserva)
    }
    catch (error) {
      console.error(error)
    }
  }
  const getPropiedad = async () => {
    try {
      let { data: propiedad, error } = await supabase
        .from('propiedad')
        .select('*')

      if (error) throw error
      if (propiedad) setPropiedades(propiedad)
    }
    catch (error) {
      console.error(error)
    }
  }
  const getContacto = async () => {
    try {
      let { data: operacion_lead, error } = await supabase
        .from('operacion_lead')
        .select('*')

      if (error) throw error
      if (operacion_lead) setContactos(operacion_lead)
    }
    catch (error) {
      console.error(error)
    }
  }
  const getSolicitud = async () => {
    try {
      let { data: operacion_solicitud, error } = await supabase
        .from('operacion_solicitud')
        .select('*')

      if (error) throw error
      if (operacion_solicitud) setSolicitudes(operacion_solicitud)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getReservas()
    getPropiedad()
    getContacto()
    getSolicitud()
  }, [])

  const handleTempReserva = (e) => {
    setTempReserva(e.target.value)
    setTempSolicitud(solicitudes.find(item => item.id === e.target.value))
    setTempPropiedad(solicitudes.map(item => item.propiedadID))
    setTempLead(solicitudes.map(item => item.leadID))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datos = { 
      ...Contrato, 
      cliente: clienteRef.current.value,
      propietario: propietarioRef.current.value
    }
    console.log(datos)
    // try {
    //   const { error } = await supabase
    //     .from('operacion')
    //     .insert([
    //       { some_column: 'someValue', other_column: 'otherValue' },
    //     ])

    //   if (error) throw error
    // }
    // catch (error) {
    //   console.error(error)
    // }
  }

  const handleChange = (prop) => (event) => {
    setContrato({ ...Contrato, [prop]: event.target.value });
  };

  return (
    <div className='flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl'>
      <Header category="Contratos" title="Nuevo contrato" />
      <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 grid grid-cols-2 gap-10 rounded-lg">
        <FormControl required fullWidth className=" col-span-2">
          <InputLabel id="demo-simple-select-label">buscar solicitud previa</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tempReserva}
            label="buscar solicitud previa"
            onChange={handleTempReserva}
          >
            {solicitudes.map((value) => (
              <MenuItem value={value.id}>reserva n° {value.id}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {
          tempReserva !== '' &&
          propiedades.filter(item => item.id === tempPropiedad[0]).map((value) => (
            <TextField value={value.propietario} ref={propietarioRef} InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} label="Nombre propietario" variant="outlined" />
          ))
        }
        {
          tempReserva !== '' &&
          contactos.filter(item => item.id === tempLead[0]).map((value) => (
            <TextField value={value.nombre} ref={clienteRef} InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} label="Nombre inquilino" variant="outlined" />
          ))
        }
        {

        }
        <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Generar Contrato</button>
      </form>
    </div>
  )
}

export default Contratos