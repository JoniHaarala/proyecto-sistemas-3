import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Tooltip } from '@mui/material';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Stack from '@mui/material/Stack';

import DeleteFactura from './DeleteFactura';

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [detalleFactura, setDetalleFactura] = useState([])

    const getDetalleFactura = async () => {
        try {

            let { data: detalle_factura, error } = await supabase
                .from('detalle_factura')
                .select('*')
                .eq('idfactura', `${params.id}`)
            if (error) throw error;
            if (detalle_factura) setDetalleFactura(detalle_factura);
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetalleFactura()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEdit = () => {
        navigate(`/editarFactura/${params.id}`)
    }

    return (
        <div>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Detalles" arrow>
                    <IconButton onClick={handleOpen} color="primary">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Editar" arrow>
                    <IconButton onClick={handleEdit} color="success">
                        <EditIcon />
                    </IconButton>
                </Tooltip>

                <DeleteFactura params={params}/>
            </Stack>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`Detalles de la factura ${params.id}`}
                    </Typography>

                    <DataTable value={detalleFactura} responsiveLayout="scroll">
                        <Column field="descripcion" header="Concepto"></Column>
                        <Column field="cantidad" header="Cantidad"></Column>
                        <Column field="precio" header="Precio unitario"></Column>
                        <Column field="subtotal" header="Subtotal"></Column>
                    </DataTable>
                </Box>
            </Modal>
        </div>
    )
}

