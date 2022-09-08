/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function FormAddProveedor() {

    const [Cuit, setCuit] = useState('')
    const [Nombre, setNombre] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Correo, setCorreo] = useState('')
    const [Direccion, setDireccion] = useState('')
    const [Pais, setPais] = useState('')
    const [CodPostal, setCodPostal] = useState('')
    const [Aprove, setAprove] = useState(false)
    const [Open, setOpen] = useState(false)


    const handleClose = () => {
        setOpen(false)
    };
    const handleToggle = () => {
        setOpen(!Open)
    };


    const handleSubmit = async e => {
        e.preventDefault()

        if (Cuit != '' && Nombre != '' && Telefono != '' && Correo != '' && Direccion != '' && Pais != '' && CodPostal != '') {
            setAprove(true)
            let data =
            {
                cuit: Cuit,
                nombre: Nombre,
                telefono: Telefono,
                correo: Direccion,
                direccion: Direccion,
                pais: Pais,
                codPostal: CodPostal
            }

            try {
                let config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                let res = await fetch('https://www.inmoapi.somee.com/api/Proveedor/GuardarProveedor', config)
                let json = await res.json()
                console.log(json)
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    /* Creating a new component called Alert that is a forwardRef. */
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
    });

    return (
        <form onSubmit={handleSubmit} className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    CUIT:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='CUIT...'
                    onChange={(event) => setCuit(event.target.value)}
                    value={Cuit}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Nombre de la empresa:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Nombre...'
                    onChange={(event) => setNombre(event.target.value)}
                    value={Nombre}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Telefono:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Telefono...'
                    onChange={(event) => setTelefono(event.target.value)}
                    value={Telefono}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Correo:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Correo...'
                    onChange={(event) => setCorreo(event.target.value)}
                    value={Correo}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Direccion:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Direccion...'
                    onChange={(event) => setDireccion(event.target.value)}
                    value={Direccion}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Pais:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Pais...'
                    onChange={(event) => setPais(event.target.value)}
                    value={Pais}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>
            <section className="flex flex-col py-3">
                {/* A ternary operator how handle two types of inputs: if the input doesn't recieve a value is default, else it will show supplier Name */}
                <label className="pb-4">
                    Codigo postal:
                </label>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Codigo postal...'
                    onChange={(event) => setCodPostal(event.target.value)}
                    value={CodPostal}
                    className='p-4 mr-10 rounded-lg shadow-md'
                />
            </section>


            <input type="submit" value="Guardar" className="w-60 self-center rounded-lg bg-green-500 font-bold p-3 mx-3 mt-5 cursor-pointer hover:shadow-md" onClick={handleToggle} />

            <Snackbar open={Open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'botton', horizontal: 'left' }}>
                {
                    (Aprove == true && Cuit != '' && Nombre != '' && Telefono != '' && Correo != '' && Direccion != '' && Pais != '' && CodPostal != '')
                        ?
                        <Alert onClose={handleClose} sx={{ width: '100%' }} severity="success">Guardado con exito!</Alert>
                        :
                        <Alert onClose={handleClose} sx={{ width: '100%' }} severity="error">Error al guardar los datos</Alert>
                }
            </Snackbar>

        </form>
    )
}

export default FormAddProveedor