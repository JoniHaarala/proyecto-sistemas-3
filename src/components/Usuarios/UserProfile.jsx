import avatar from '../../data/avatar.jpg';
import moment from 'moment/moment'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../supabase/client'

import { Avatar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

const Account = () => {

  //Todos los Ref que voy a usar
  // const nameRef = useRef('');
  // const usernameRef = useRef('');
  // const passRef = useRef('');
  // const phoneRef = useRef('')
  // const addressRef = useRef('')

  const [user, setUser] = useState([])
  const [editable, setEditable] = useState(false)

  const session = supabase.auth.session()

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProfile = async () => {
    try {

      let { data: usuario, error, status } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', session.user.id)

      if (error && status !== 406) {
        throw error
      } else setUser(usuario)

    } catch (error) {
      alert(error.message)
    }
  }

  const handleSettings = (e) => {
    e.preventDefault()
    setEditable(true)
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setEditable(false)
    setValues({
      name: user[0].name,
      username: user[0].username,
      phone: user[0].phone,
      address: user[0].address,
      password: user[0].password,
      showPassword: false,
    })
  }

  const [values, setValues] = useState({
    name: '',
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
        <button onClick={handleSave} type="submit" className="py-3 mt-5 px-5 bg-gray-300 rounded-xl shadow-lg font-bold">Save changes</button>
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

  return (
    <div className='p-8 max-w-screen-xl' aria-live="off">

      {user.map((value) => (
        <section className='w-fit p-7 flex bg-white rounded-xl shadow-lg mx-10'>
          <div>
            <h2 className='text-3xl px-5'>{value.name}</h2>
            <p className='px-5 pt-4'>Email: {session.user.email}</p>
            <p className='px-5 pt-4'>Joined {moment(value.created_at).format('LLLL')}</p>
          </div>
          <Avatar src={avatar} sx={{ width: 108, height: 108, ml: 5 }} />
        </section>
      ))}
      {user.map((data) => (
        <>
          <div className='bg-white rounded-xl shadow-lg mx-10 p-10 my-10 w-fit'>
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
                //<input value={value.name} ref={nameRef} className="p-3 my-1 rounded-lg shadow-md" />
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
              <p className='ml-3'>{data.mail}</p>

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
                // <input value={value.password} ref={passRef} className="p-3 my-1 rounded-lg shadow-md" />
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
          </div>
          <button
            type="button"
            className="py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </>
      ))}

    </div>
  )
}

export default Account;