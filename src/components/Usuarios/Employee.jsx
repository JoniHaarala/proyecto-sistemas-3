import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function Employee() {

    const [Employee, setEmployee] = useState({
        name: '',
        surname: '',
        mail: '',
        phone: '',
        address: '',
        idrol: '',
    })

    useEffect(() => {
        handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleSubmit = async e => {
        e.preventDefault()
        const usuario = {
            ...Employee, username: Employee.name[0].toLowerCase() + Employee.surname.toLowerCase() + (Math.floor(Math.random() * (999 - 100 + 1) + 100).toString()),
        }
        console.log(usuario)
        try {
            const { error } = await supabase
                .from('usuario')
                .insert([
                     usuario
                  ])

            if (error) throw error
            else console.log("guardado con exito")
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleChange = (prop) => (event) => {
        setEmployee({ ...Employee, [prop]: event.target.value });
    };

    return (
        <div className='bg-white rounded-xl shadow-lg mx-10 p-10 my-10 w-[500px]'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <TextField id="standard-name" onChange={handleChange('name')} value={Employee.name} label="Nombre completo" variant="standard" />

                <TextField id="standard-surname" sx={{ mt: 4 }} onChange={handleChange('surname')} value={Employee.surname} label="Apellido completo" variant="standard" />

                <TextField id="standard-mail" sx={{ mt: 4 }} onChange={handleChange('mail')} value={Employee.mail} label="Email" variant="standard" />

                <TextField id="standard-phone" sx={{ mt: 4 }} onChange={handleChange('phone')} value={Employee.phone} label="Telefono" variant="standard" />

                <TextField id="standard-address" sx={{ mt: 4 }} onChange={handleChange('address')} value={Employee.address} label="Direccion" variant="standard" />

                <FormControl variant="standard" sx={{ my: 4 }} className='col-start-1 col-span-2'>
                    <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={Employee.rol}
                        onChange={handleChange('idrol')}
                        label="Rol"
                    >
                        <MenuItem value=" ">Quitar seleccion</MenuItem>
                        <MenuItem value='admin'>Administrador</MenuItem>
                        <MenuItem value='agente'>Agente</MenuItem>
                    </Select>
                </FormControl>
                <button type='submit' className=' col-start-1 col-span-1 py-3 px-5 bg-green-600 rounded-xl shadow-md font-bold text-white'>Guardar</button>
            </form>
        </div>
    )
}
