import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { supabase } from '../../supabase/client';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 20,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function PropDetalleFact({ idfactura, detalleFact, setDetalleFact }) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // para un siguiente sprint mejorar para armar el array e insertar varias filas de una sola vez.
    let detalleTableRow = detalleFact;
    const [detalleDeFactura, setDetalleFactura] = useState({
        descripcion: '',
        cantidad: 0,
        precio: 0
    })

    const handleDetalleFactura = (prop) => (e) => {
        setDetalleFactura({ ...detalleDeFactura, [prop]: e.target.value });
    }

    const handleSubmit = async () => {
        detalleTableRow.push({ ...detalleDeFactura, subtotal: detalleDeFactura.precio * detalleDeFactura.cantidad })
        setDetalleFact(detalleTableRow);
        const Detalle_de_factura = { ...detalleDeFactura, idfactura: idfactura, subtotal: detalleDeFactura.precio * detalleDeFactura.cantidad };
        //setDetalleFact(detalleDeFactura)
        try {
            const { error } = await supabase
                .from('detalle_factura')
                .insert([
                    Detalle_de_factura
                ])
            if (error) throw error
            else console.log("guardado con exito")
        }
        catch (error) {
            console.error(error);
        }
        setOpen(false);
    };

    return (
        <div>

            <React.Fragment>
                <Button onClick={handleOpen} sx={{ bgcolor: 'InfoBackground', p: 2, mt: 1 }} color="primary">Agregar Detalle de factura</Button>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 600 }}>
                        <h2>{`Detalle de la factura ${idfactura}`}</h2>
                        <form className="bg-gray-100 mt-5 py-5 pl-10 flex flex-col gap-5 rounded-lg">
                            <section className="flex flex-col py-3">
                                <label className="pb-4">
                                    Concepto del detalle:
                                </label>
                                <input
                                    type="text"
                                    placeholder='concepto... (240 caracteres como maximo)'
                                    maxLength={240}
                                    value={detalleDeFactura.descripcion}
                                    onChange={handleDetalleFactura('descripcion')}
                                    className='p-4 mr-10 rounded-lg shadow-md bg-white'
                                />
                            </section>
                            <section className="flex flex-col py-3">
                                <label className="pb-4">
                                    Precio:
                                </label>
                                <input
                                    type="number"
                                    placeholder='Precio...'
                                    value={detalleDeFactura.precio}
                                    onChange={handleDetalleFactura('precio')}
                                    className='p-4 mr-10 rounded-lg shadow-md bg-white'
                                />
                            </section>
                            <section className="flex flex-col py-3">
                                <label className="pb-4">
                                    Cantidad:
                                </label>
                                <input
                                    type="number"
                                    placeholder='Cantidad...'
                                    max={1000}
                                    value={detalleDeFactura.cantidad}
                                    onChange={handleDetalleFactura('cantidad')}
                                    className='p-4 mr-10 rounded-lg shadow-md bg-white'
                                />
                            </section>

                            <section className="flex flex-col py-3">
                                <label className="pb-4">
                                    Subtotal:
                                </label>
                                <input
                                    type="number"
                                    placeholder='Subtotal...'
                                    readOnly
                                    value={detalleDeFactura.subtotal}
                                    className='p-4 mr-10 rounded-lg shadow-md bg-white'
                                />
                            </section>
                            <Button sx={{ mr: 5 }} size="medium" onClick={handleSubmit}>Guardar</Button>
                        </form>
                    </Box>
                </Modal>
            </React.Fragment>
        </div>
    )
}
