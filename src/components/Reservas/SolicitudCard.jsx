import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function SolicitudCard() {
    const [solicitudes, setSolicitudes] = useState([])
    const [propiedades, setPropiedades] = useState([])
    const [leads, setLeads] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getSolis = async () => {
        try {
            let { data: operacion_solicitud, error } = await supabase
                .from('operacion_solicitud')
                .select('*')

            if (error) throw error
            if (operacion_solicitud) setSolicitudes(operacion_solicitud)

        } catch (error) {
            console.error(error)
        }
    }
    const getLeads = async () => {
        try {
            let { data: operacion_lead, error } = await supabase
                .from('operacion_lead')
                .select('*')

            if (error) throw error
            if (operacion_lead) setLeads(operacion_lead)

        } catch (error) {
            console.error(error)
        }
    }
    const getProp = async () => {
        try {
            let { data: propiedad, error } = await supabase
                .from('propiedad')
                .select('*')
                .eq('activo', true)
            if (error) throw error
            if (propiedad) setPropiedades(propiedad)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getSolis()
        getProp()
        getLeads()
    }, [])
    return (
        <div className='grid xl:grid-cols-2 gap-4'>
            {
                solicitudes.map(value => (
                    <div className='flex flex-col w-fit rounded-xl shadow-lg p-7 mt-8'>
                        <section className="flex gap-10">
                            <div className='self-center'>solicitud</div>
                            <div className='flex flex-col w-72 px-5 gap-10 text-gray-600 border-l-2 border-l-slate-400'>
                                {
                                    leads.filter(item => item.id === value.leadID).map(item => (
                                        <>
                                            <p>nombre: {item.nombre}</p>
                                            <p>telefono: {item.telefono}</p>
                                            <p>zona interes: {item.zonaInteres}</p>
                                        </>

                                    ))
                                }
                                {
                                    propiedades.filter(item => item.id === value.propiedadID).map(item => (
                                        <>
                                            <p>tipo propiedad: {item.idTipo}</p>
                                            <p>direccion: {item.direccion + ", " + item.barrio}</p>
                                        </>
                                    ))
                                }
                                <p className='pb-5'>notas:-</p>
                                <p className="p-3 rounded-2xl shadow-lg text-center bg-green-100">Solicitud pendiente</p>
                            </div>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? 'long-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}><Link to="/addContrato">generar contrato</Link></MenuItem>

                                </Menu>
                            </div>
                        </section>
                    </div>
                ))
            }
        </div>
    )
}
