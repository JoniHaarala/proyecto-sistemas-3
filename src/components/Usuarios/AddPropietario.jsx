import { useState } from 'react'
import Header from '../Head'
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment';

export default function AddPropietario() {
    const [newPropietario, setNewPropietario] = useState({
        name: '',

    })
    const [fechaRegistro, setFechaRegistro] = useState(moment().format('MM/DD/YYYY'))
    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
            <Header category="Usuarios" title="Agregar Propietario" />
            <div className='flex flex-col lg:flex-row justify-center'>
                <form className="mt-5 py-5 px-10 w-full flex flex-col gap-5 rounded-lg">
                    <TextField id="outlined-Nombre" label="Nombre" variant="outlined" />
                    <TextField id="outlined-Referencia" label="Referencia" variant="outlined" />
                    <TextField id="outlined-Direccion" label="Direccion actual" variant="outlined" />
                    <TextField type="email" id="outlined-Correo" label="Correo/email" variant="outlined" />
                    <TextField id="outlined-Nombre" label="telefono" variant="outlined" />
                    <TextField id="outlined-DNI" label="DNI/Pasaporte" variant="outlined" />
                    <TextField id="outlined-Nacionalidad" label="Nacionalidad" variant="outlined" />
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
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
