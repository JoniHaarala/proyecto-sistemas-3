import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from '../Head';


// Nota: Revisar documentacion en componente Caracteristicas para entender el funcionamiento de este componente.
const TipoyOperacion = ({ tipoyOperacion, setTipoyOperacion }) => {

    const TipoyUbicacion = { ...tipoyOperacion }

    const [TypeOperacion, setTypeOperacion] = useState([])
    const [TypeProp, setTypeProp] = useState([])
    const [EstadoProp, setEstadoProp] = useState([])
    const [NamePropietario, setNamePropietario] = useState([])

    const getOperacion = async () => {
        try {
            let { data: categoria_venta, error } = await supabase
                .from('categoria_venta')
                .select('*')
            if (error) throw error
            if (categoria_venta) setTypeOperacion(categoria_venta)
        } catch (error) {
            console.log(error)
        };
    }
    const getTipo = async () => {
        try {
            let { data: tipo_propiedad, error } = await supabase
                .from('tipo_propiedad')
                .select('*')
            if (error) throw error
            if (tipo_propiedad) setTypeProp(tipo_propiedad)
        }
        catch (error) {
            console.log(error)
        }
    }
    const getEstado = async () => {
        try {
            let { data: estado_propiedad, error } = await supabase
                .from('estado_propiedad')
                .select('*')
            if (error) throw error
            if (estado_propiedad) setEstadoProp(estado_propiedad)
        } catch (error) {
            console.log(error)
        }
    }
    const getPropietario = async () => {
        try {
            let { data: usuario, error } = await supabase
                .from('usuario')
                .select('id,nameSurname')
                .eq('idrol', 'propietario')
            if (error) throw error
            if (usuario) setNamePropietario(usuario)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOperacion()
        getTipo()
        getEstado()
        getPropietario()
    }, [])
    //

    const handleChangePaso1 = (prop) => (event) => {
        setTipoyOperacion({ ...TipoyUbicacion, [prop]: event.target.value });
    };

    return (
        <div className='px-2 ml-8 mt-20'>
            <Header category="" title="Tipo de propiedad y tipo de operacion" />
            <section className="flex flex-col gap-5 md:grid md:grid-cols-2 2xl:grid-cols-4">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="tipo-prop">Tipo de propiedad</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="tipo-prop"
                        value={TipoyUbicacion.idTipo}
                        onChange={handleChangePaso1('idTipo')}
                        label="Tipo de propiedad"
                    >
                        {TypeProp.map((value, index) => (
                            <MenuItem key={index} value={value.tipo}>{value.tipo}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="categoria-venta">Tipo de operacion</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="categoria-venta"
                        value={TipoyUbicacion.idCatVenta}
                        onChange={handleChangePaso1('idCatVenta')}
                        label="Tipo de operacion"
                    >
                        {TypeOperacion.map((value, index) => (
                            <MenuItem key={index} value={value.operacion}>{value.operacion}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-standard-label">Estado de la propiedad</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={TipoyUbicacion.idEstado}
                        onChange={handleChangePaso1('idEstado')}
                        label="Estado de la propiedad"
                    >
                        {EstadoProp.map((value, index) => (
                            <MenuItem key={index} value={value.estado}>{value.estado}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-standard-label">Nombre del Propietario</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={TipoyUbicacion.propietario}
                        onChange={handleChangePaso1('propietario')}
                        label="Nombre Propietario"
                    >
                        {NamePropietario.map((value) => (
                            <MenuItem key={value.id} value={value.nameSurname}>{value.nameSurname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </section>
        </div>
    )
}

export default TipoyOperacion