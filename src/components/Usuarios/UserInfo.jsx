import React from 'react'
import avatar from '../../data/avatar.jpg';
import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/client'
import { Avatar, InputLabel, InputAdornment, FormControl, IconButton, Input, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function UserInfo({ data }) {

    const user = data

    const [editable, setEditable] = useState(false)

    const handleSettings = (e) => {
        e.preventDefault()
        setEditable(true)
    }
    const handleCancel = (e) => {
        e.preventDefault()
        setEditable(false)
        setValues({
            name: user[0].name,
            surname: user[0].surname,
            username: user[0].username,
            phone: user[0].phone,
            address: user[0].address,
            password: user[0].password,
            showPassword: false,
        })
    }

    const [values, setValues] = useState({
        name: '',
        surname: '',
        username: '',
        phone: '',
        address: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const EditButtons = () => {
        return (
            <div>
                <button type='submit' className="py-3 mt-5 px-5 bg-gray-300 rounded-xl shadow-lg font-bold">Save changes</button>
                <button onClick={handleCancel} className="py-3 mt-5 px-5 ml-4 bg-gray-300 rounded-xl shadow-lg font-bold">Cancel</button>
            </div>
        )
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updates = {
                name: values.name,
                username: values.name[0].toLowerCase() + values.username.toLowerCase() + (Math.floor(Math.random() * (999 - 100 + 1) + 100).toString()),
                phone: values.phone,
                address: values.address,
                password: values.password,
            }
            console.log(updates)
            setEditable(false)
            // const { error } = await supabase
            //   .from('usuario')
            //   .update(updates)
            //   .eq('id', session.user.id)
            // if (error) throw console.error(error)
        }
        catch {
            console.error()
        }
    }
    useEffect(() => {
        handleSave()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        user.map((data) => (
            <form onSubmit={handleSave} className='bg-white rounded-xl shadow-lg mx-10 p-10 my-10 w-fit'>
                <h2 className='py-7 text-lg font-medium'>
                    Datos Personales de {data.name}:
                </h2>
                <div className='grid grid-cols-2 gap-y-5'>

                    <label className='flex items-center' htmlFor="nombre">
                        Avatar:
                    </label>
                    <Avatar src={avatar} sx={{ width: 64, height: 64 }} />

                    <label className='flex items-center' htmlFor="nombre">
                        Nombre completo:
                    </label>
                    {(editable === false)
                        ? <p className='ml-3'>{data.name}</p>
                        : <TextField id="standard-name" onChange={handleChange('name')} value={values.name} label="Nombre Completo" variant="standard" />
                    }
                    {(editable === false)
                        ?
                        <>
                            <label className='flex items-center' htmlFor="usuario">
                                Nombre de usuario:
                            </label>

                            <p className='ml-3'>{data.username}</p>
                        </>
                        :
                        <>
                            <label className='flex items-center' htmlFor="usuario">
                                Apellido Completo:
                            </label>
                            <TextField id="standard-username" onChange={handleChange('username')} value={values.username} label="Apellidos" variant="standard" />
                        </>
                    }

                    <label className='flex items-center' htmlFor="email">
                        email:
                    </label>
                    <p className='ml-3 mr-5'>{data.mail}</p>

                    <label className='flex items-center' htmlFor="password">
                        Contraseña:
                    </label>
                    {(editable === false)
                        ?
                        <p className='ml-3'>********</p>
                        :
                        <FormControl variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    }

                    <label className='flex items-center' htmlFor="telefono">
                        Telefono:
                    </label>
                    {(editable === false)
                        ? <p className='ml-3'>{data.phone}</p>
                        : <TextField id="standard-phone" onChange={handleChange('phone')} value={values.phone} label="Telefono" variant="standard" />
                    }

                    <label className='flex items-center' htmlFor="direccion">
                        Direccion:
                    </label>
                    {(editable === false)
                        ? <p className='ml-3'>{data.address}</p>
                        : <TextField id="standard-address" onChange={handleChange('address')} value={values.address} label="Direccion" variant="standard" />
                    }

                    <label className='flex items-center' htmlFor="rol">
                        Rol:
                    </label>
                    <p className='ml-3'>{data.idrol}</p>

                </div>

                {editable === false
                    ? <button onClick={handleSettings} className="py-3 mt-5 px-5 bg-gray-300 rounded-xl shadow-lg font-bold">Edit settings</button>
                    : <EditButtons />
                }
            </form>
        ))
    )
}
