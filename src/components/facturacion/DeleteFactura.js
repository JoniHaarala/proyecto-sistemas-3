import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Tooltip } from '@mui/material';
import { supabase } from '../../supabase/client';
import { useNavigate } from 'react-router-dom';


export default function DeleteFactura({ params }) {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeletefactura = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('detalle_factura')
        .update({ activo: false })
        .eq('idfactura', `${params.id}`)

      if (error) throw error;
    }
    catch (error) {
      console.log(error)
    }
    try {
      const { error } = await supabase
        .from('factura')
        .update({ activo: false })
        .eq('id', `${params.id}`)

      if (error) throw error;
    }
    catch (error) {
      console.log(error)
    }
    setOpen(false);
    navigate('/listarFacturas')
  }

  useEffect(() => {
    handleDeletefactura()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Tooltip title="Eliminar" arrow>
        <IconButton onClick={handleClickOpen} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Seguro que desea eliminar la factura ${params.id}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tenga en cuenta que esta accion sera irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeletefactura} autoFocus>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
