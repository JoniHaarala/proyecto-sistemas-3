import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    heigth: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PropActions({ params, rowId }) {

    const [PropData, setPropData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`www.adidas.com/api/propiedades/${rowId}`) //url fake... usar la real despues.
            .then((req) => req.json())
            .then((res) => { setPropData(res.propiedades) })
    }, [rowId])

    return (
        <div>
            <Tooltip title="Detalles" arrow>
                <Button onClick={handleOpen}>
                    <VisibilityIcon />
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
                        PropData.map((item) => (
                            <>
                                <section key={item.id} className=''>
                                    <h3>Caracteristicas generales</h3>
                                    
                                </section>
                                <section key={item.id} className=''>
                                    <h3>ubicacion y superficie</h3>
                                </section>
                                <section key={item.id} className=''>
                                    <h3>Comodidades</h3>
                                </section>
                            </>
                        ))
                    }
                </Box>
            </Modal>
        </div>
    );
}
