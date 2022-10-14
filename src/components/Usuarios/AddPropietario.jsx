import { useState } from 'react'
import Header from '../Head'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';

export default function AddPropietario() {
    const navigate = useNavigate()
    const [newPropietario, setNewPropietario] = useState({
        name: '',
        surname: '',
        idrol: 'propietario',
        mail: '',
        address: '',
        phone: '',
    })
    const [fechaNacimiento, setFechaNacimiento] = useState(moment().format('MM/DD/YYYY'))
    const [checked, setChecked] = useState(false);
    const [referencia, setReferencia] = useState('')
    const [dni, setDni] = useState('')
    const [nacionalidad, setNacionalidad] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { ...newPropietario, nameSurname: newPropietario.name + ' ' + newPropietario.surname }
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
            console.error(error)
        }
    }
    const handleClose = (e) => {
        navigate('/listarPropietarios')
    }

    const handleChange = (prop) => (event) => {
        setNewPropietario({ ...newPropietario, [prop]: event.target.value });
    };
    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
            <Header category="Usuarios" title="Agregar Propietario" />
            <div className='flex flex-col lg:flex-row justify-center'>
                <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
                    <TextField value={newPropietario.name} onChange={handleChange('name')} id="outlined-Nombre" label="Nombre" variant="outlined" />
                    <TextField value={newPropietario.surname} onChange={handleChange('surname')} id="outlined-Apellido" label="Apellido" variant="outlined" />
                    <TextField value={referencia} onChange={e => setReferencia(e.target.value)} id="outlined-Referencia" label="Referencia" variant="outlined" />
                    <TextField value={newPropietario.address} onChange={handleChange('address')} id="outlined-Direccion" label="Direccion actual" variant="outlined" />
                    <TextField value={newPropietario.mail} onChange={handleChange('mail')} type="email" id="outlined-Correo" label="Correo/email" variant="outlined" />
                    <TextField value={newPropietario.phone} onChange={handleChange('phone')} id="outlined-Nombre" label="telefono" variant="outlined" />
                    <TextField value={dni} onChange={e => setDni(e.target.value)} id="outlined-DNI" label="DNI/Pasaporte" variant="outlined" />
                    <TextField value={nacionalidad} onChange={e => setNacionalidad(e.target.value)} id="outlined-Nacionalidad" label="Nacionalidad" variant="outlined" />
                    <section className="flex py-3 mt-5">
                        <label className="self-center w-40 mr-3">Fecha de nacimiento: </label>
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
                    <section className='flex justify-end gap-5'>
                        <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
                        <button onClick={handleClose} className='col-start-1 col-span-1 py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white'>Cancelar</button>
                    </section>
                </form>
                <div className='flex flex-col mt-5 py-5 px-10 w-full'>
                    <section className='flex items-center justify-between'>
                        <label htmlFor="lbl-Facturacion">Datos de facturación</label>
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
                            <TextField id="outlined-Nombre" label="Nombre" variant="outlined" />
                            <TextField id="outlined-Direccion" label="Direccion actual" variant="outlined" />
                            <TextField type="email" id="outlined-Correo" label="Correo/email" variant="outlined" />
                            <TextField id="outlined-Nombre" label="telefono" variant="outlined" />
                            <TextField id="outlined-DNI" label="DNI/Pasaporte" variant="outlined" />
                            <TextField id="outlined-cuit" label="CUIT" variant="outlined" />
                            <button type='submit' className='col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
