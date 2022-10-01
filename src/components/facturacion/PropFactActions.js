import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    heigth: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PropFactActions({ params }) {

    const navigate = useNavigate()

    const [PropData, setPropData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEdit = () => navigate('/editFactura')

    const fetchEstates = async () => {
        let { data: propiedad, error } = await supabase
            .from('propiedad')
            .select("*")
            .eq('id', params.id)
        if (error) console.log("error", error);
        else setPropData(propiedad);
    }
    useEffect(() => {
        fetchEstates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Tooltip title="Detalles" arrow>
                <Button onClick={handleOpen}>
                    <VisibilityIcon />
                </Button>
            </Tooltip>

            <Tooltip title="Editar" arrow>
                <Button onClick={handleEdit}>
                    <EditIcon />
                </Button>
            </Tooltip>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Detalles de la Propiedad
                    </Typography>
                    {
                        PropData.map((item, index) => (
                            <div className="text-sm" key={index}>
                                <section className='my-4'>
                                    <h3 className="text-base">Caracteristicas generales</h3>
                                    <ul className='ml-7 pt-2'>
                                        <p>Tipo: {item.idTipo}</p>
                                        <p>Estado: {item.idEstado}</p>
                                        <p>Operacion: {item.idCatVenta}</p>
                                        <p>Propietario: {item.propietario}</p>
                                        <p>N° ambientes: {item.ambientes}</p>
                                        <p>N° dormitorios: {item.dormitorios}</p>
                                        <p>N° baños: {item.baños}</p>
                                        <p>Garage: {item.garage}</p>
                                        <p>Antiguedad: {item.antiguedad} años</p>
                                        <p>Precio: USD {item.precio}</p>
                                        <p>Expensas: $ {item.expensas}</p>
                                    </ul>
                                </section>

                                <section className='my-4 pt-4'>
                                    <h3 className="text-base">ubicacion y superficie</h3>
                                    <ul className='ml-7 pt-2'>
                                        <p>Superficie Cubierta: {item.superficieCubierta} m²</p>
                                        <p>Superficie Descubierta: {item.superficieDescubierta} m²</p>
                                        <p>Superficie Total: {item.superficieTotal} m²</p>
                                        <p>Direccion: {item.direccion}</p>
                                        <p>Ciudad: {item.ciudad}</p>
                                        <p>Barrio: {item.barrio}</p>
                                        <p>Latitud: {item.latitud}</p>
                                        <p>Longitud: {item.longitud}</p>
                                    </ul>
                                </section>

                                <section className='my-4 pt-4'>
                                    <h3 className="text-base">Comodidades</h3>
                                    <div className='flex'>
                                        <ul className='ml-7 pt-2'>
                                            <p>agua: {item.agua ? 'SI' : 'NO'}</p>
                                            <p>luz: {item.luz ? 'SI' : 'NO'}</p>
                                            <p>terraza: {item.terraza ? 'SI' : 'NO'}</p>
                                            <p>cloaca: {item.cloaca ? 'SI' : 'NO'}</p>
                                            <p>telefono: {item.telefono ? 'SI' : 'NO'}</p>
                                            <p>comercial: {item.comercial ? 'SI' : 'NO'}</p>
                                        </ul>
                                        <ul className='ml-10 pt-2'>
                                            <p>gas: {item.gas ? 'SI' : 'NO'}</p>
                                            <p>wifi: {item.wifi ? 'SI' : 'NO'}</p>
                                            <p>AC: {item.ac ? 'SI' : 'NO'}</p>
                                            <p>pavimento: {item.pavimento ? 'SI' : 'NO'}</p>
                                            <p>ascensor: {item.ascensor ? 'SI' : 'NO'}</p>
                                            <p>alarma: {item.alarma ? 'SI' : 'NO'}</p>

                                        </ul>
                                        <ul className='ml-10 pt-2'>
                                            <p>vigilancia: {item.vigilancia ? 'SI' : 'NO'}</p>
                                            <p>lavadero: {item.lavadero ? 'SI' : 'NO'}</p>
                                            <p>gimnasio: {item.gimnasio ? 'SI' : 'NO'}</p>
                                            <p>balcon: {item.balcon ? 'SI' : 'NO'}</p>
                                            <p>living comedor: {item.living ? 'SI' : 'NO'}</p>
                                            <p>cocina: {item.cocina ? 'SI' : 'NO'}</p>

                                        </ul>
                                        <ul className='ml-10 pt-2'>
                                            <p>parilla: {item.parilla ? 'SI' : 'NO'}</p>
                                            <p>aceptan mascotas: {item.mascotas ? 'SI' : 'NO'}</p>
                                            <p>piscina: {item.piscina ? 'SI' : 'NO'}</p>
                                            <p>jardin: {item.jardin ? 'SI' : 'NO'}</p>
                                            <p>oficina: {item.oficina ? 'SI' : 'NO'}</p>
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    )
}
