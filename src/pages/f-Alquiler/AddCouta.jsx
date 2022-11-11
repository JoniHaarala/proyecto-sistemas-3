import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../../supabase/client'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from '../../components/Head';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import moment from 'moment/moment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link, useNavigate } from 'react-router-dom';

export default function AddCouta() {

    const CuotaRef = useRef(undefined);
    const FianzaRef = useRef(undefined);
    const PagoRef = useRef(undefined);

    const [Cuota, setCuota] = useState({
        idOperacion: '',
        cliente: '',
        cuota: '',
        estado: 'pendiente',
    })

    const [TempPropiedad, setTempPropiedad] = useState([])
    const [dataPropiedad, setDataPropiedad] = useState('')
    const [infCuotas, setInfCuotas] = useState([])

    const [operacion, setOperacion] = useState([])
    const [contactos, setContactos] = useState([])
    const [Open, setOpen] = useState(false)

    const [inicio, setInicio] = useState(moment().format('MM/DD/YYYY'))
    const [fechaVencimiento, setFechaVencimiento] = useState(moment().format('MM/DD/YYYY'))
    const [value, setValue] = useState(moment().format('MM/DD/YYYY'));


    const getOperacion = async () => {
        try {

            let { data: operacion_contrato, error } = await supabase
                .from('operacion_contrato')
                .select('*')
            if (error) throw error
            if (operacion_contrato) setOperacion(operacion_contrato)
        }
        catch (error) {
            console.error(error)
        }
    }
    const getContacto = async () => {
        try {
            let { data: clientes, error } = await supabase
                .from('clientes')
                .select('*')

            if (error) throw error
            if (clientes) setContactos(clientes)
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
            if (propiedad) setTempPropiedad(propiedad)
        }
        catch (error) {
            console.error(error)
        }
    }
    const getInfoCuotas = async () => {
        try {
            let { data: operacion_cuotas, error } = await supabase
                .from('operacion_cuotas')
                .select('*')
            if (error) throw error
            if (operacion_cuotas) setInfCuotas(operacion_cuotas)
        } catch (error) {

        }
    }
    

    useEffect(() => {
        getOperacion()
        getContacto()
        getPropiedad()
        getInfoCuotas()
    }, [])


    const handleClose = () => {
        setOpen(false)
    };
    const handleToggle = () => {
        setOpen(!Open)
    };

    const handlePropData = (e) => {
        setDataPropiedad(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const datos = {
            ...Cuota,
            mesCuota: value.$M + 1,
            añoCuota: value.$y,
            monto: CuotaRef.current.value,
            saldo: CuotaRef.current.value,
            total: (CuotaRef.current.value + (CuotaRef.current.value * 0.3)),
            inicio,
            vencimiento: fechaVencimiento
        }
        console.log(datos)
        try {
            const { error } = await supabase
                .from('operacion_cuotas')
                .insert([
                    datos,
                ])

            if (error) throw error
            alert("creado con exito")
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleChange = (prop) => (event) => {
        setCuota({ ...Cuota, [prop]: event.target.value });
    };
    // console.log(Cuota, value.$M + 1, value.$y)

    /* Creating a new component called Alert that is a forwardRef. */
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
    });

    return (
        < div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl" >

            <Header category="Contratos" title="Generar cuota" />

            {/* The above code is a form that is used to Generate a new alquiler or compra contract. */}
            <form onSubmit={handleSubmit} className="mt-5 py-5 px-10 w-full flex flex-col gap-10 rounded-lg">
                <FormControl required fullWidth className=" col-span-2">
                    <InputLabel id="demo-simple-select-label">buscar cliente</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Cuota.cliente}
                        label="buscar cliente"
                        onChange={handleChange('cliente')}
                    >
                        {contactos.map((value) => (
                            <MenuItem value={value.nombre}>{value.nombre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required fullWidth className=" col-span-2">
                    <InputLabel id="demo-simple-select-label">propiedad vinculada</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dataPropiedad}
                        label="propiedad vinculada"
                        onChange={handlePropData}
                    >
                        {TempPropiedad.map((value) => (
                            <MenuItem value={value.id}>{value.idTipo + ' en ' + value.direccion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required fullWidth className=" col-span-2">
                    <InputLabel id="demo-simple-select-label">seleccione operacion</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Cuota.idOperacion}
                        label="seleccione operacion"
                        onChange={handleChange('idOperacion')}
                    >
                        {operacion.filter(item => item.cliente === Cuota.cliente).map((value) => (
                            <MenuItem value={value.id}>opIdn°{value.id}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {
                    infCuotas.cuota
                        ?
                        <TextField value={Cuota.cuota} onChange={handleChange('cuota')} type="number" label="n° de cuota" variant="outlined" />
                        :
                        infCuotas.map(item => (
                            <TextField value={item.cuota} onChange={handleChange('cuota')} type="number" label="n° de cuota" variant="outlined" />
                            ))
                }
                {console.log(Cuota.cuota)}


                <div className='grid grid-cols-2 gap-10'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DatePicker
                                views={['year', 'month']}
                                label="Seleccione mes y año de la cuota"
                                minDate={moment().format('MM/DD/YYYY')}
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
                {
                    operacion.map((value) => (
                        <div className='flex gap-10'>
                            <section className="flex flex-col py-3">
                                <label className="pb-2">
                                    cuota:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Importe"
                                    readOnly
                                    ref={CuotaRef}
                                    value={value.rentaMensual}
                                    className='p-4 border-y border-x rounded-md'
                                />
                            </section>
                            <section className="flex flex-col py-3">
                                <label className="pb-2">
                                    honorario:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Importe"
                                    readOnly
                                    ref={FianzaRef}
                                    value={value.fianza}
                                    className='p-4 border-y border-x rounded-md'
                                />
                            </section>
                            <section className="flex flex-col py-3">
                                <label className="pb-2">
                                    total:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Importe"
                                    readOnly
                                    ref={PagoRef}
                                    value={value.pago}
                                    className='p-4 border-y border-x rounded-md'
                                />
                            </section>
                        </div>
                    ))
                }

                <section className="flex py-3 mt-5">
                    <label className="self-center w-40 mr-3">Inicio de Cuota: </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Seleccione una fecha"
                            disablePast={true}
                            value={inicio}
                            inputFormat={'MM/DD/YYYY'}
                            onChange={(newValue) => {
                                setInicio(newValue);
                            }}
                            renderInput={(params) => <TextField required helperText="formato MM/DD/YYYY" {...params} />}
                        />
                    </LocalizationProvider>
                </section>

                <section className="flex py-3">
                    <label className="self-center w-40 mr-3">fecha Vencimiento: </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Seleccione una fecha"
                            value={fechaVencimiento}
                            disablePast={true}
                            inputFormat={'MM/DD/YYYY'}
                            onChange={(newValue) => {
                                setFechaVencimiento(newValue);
                            }}
                            renderInput={(params) => <TextField required helperText="formato MM/DD/YYYY" {...params} />}
                        />
                    </LocalizationProvider>
                </section>

                <input type="submit" value="Generar contrato" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-5 cursor-pointer hover:shadow-md" onClick={handleToggle} />

                {/* The above code is a React component that is used to display a loading screen while the user is waiting for the data to be loaded. */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={Open}
                    onClick={handleClose}
                    transitionDuration={1000}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Snackbar open={Open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
                    {
                        (Cuota.cliente !== '' && Cuota.idOperacion !== '')
                            ?
                            <Alert onClose={handleClose} sx={{ width: '100%' }} severity="success">Transaccion realizada con exito!</Alert>
                            :
                            <Alert onClose={handleClose} sx={{ width: '100%' }} severity="error">Error al cargar los datos</Alert>
                    }
                </Snackbar>

            </form>
        </div >
    )
}
