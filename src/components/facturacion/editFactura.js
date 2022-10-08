import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { supabase } from '../../supabase/client'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 20,
  pt: 2,
  px: 4,
  pb: 3,
};

function DetalleFacturaModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function EditFactura({ params }) {

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getProveedor = async () => {
    try {
      let { data: proveedor, error } = await supabase
        .from('proveedor')
        .select('nombre')
      if (error) throw error;
      if (proveedor) setDataProveedor(proveedor);
    }
    catch (error) {

    }
  }

  const [dataProveedor, setDataProveedor] = useState([])

  const [datosFactura, setDatosFactura] = useState({
    id: params.id,
    proveedor: params.row.proveedor,
    tipo: params.row.tipo,
    sucursal: params.row.sucursal,
    total: params.row.total,
    saldo: params.row.saldo,
    estado: params.row.estado,
  })
  const [fechaRegistro, setFechaRegistro] = useState(params.row.fechaRegistro)
  const [fechaVencimiento, setFechaVencimiento] = useState(params.row.fechaVencimiento)

  useEffect(() => {
    getProveedor();
    getDetalleFactura();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const [detFactura, setDetFactura] = useState({
  //   idfactura: '',
  //   descripcion: '',
  //   cantidad: '',
  //   subtotal: '',
  //   precio: ''
  // })

  const handleFacturaDatos = (prop) => (event) => {
    setDatosFactura({ ...datosFactura, [prop]: event.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault()
    let UploadData = { ...datosFactura, fechaRegistro, fechaVencimiento }
    console.log(UploadData)
    try {
      const { data, error } = await supabase
      .from('factura')
      .upsert(UploadData, { onConflict: 'id' })

      if (error) throw error;
      if (data) console.log(data)
    }
    catch (error) {
      console.error(error);
    }
    setOpen(false);
  }

  return (
    <div>

      <Tooltip title="Editar" arrow>
        <IconButton onClick={handleOpen} color="success">
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 650, height: '80%', overflowY: "auto" }}>
          <form onSubmit={handleSubmit} className="bg-gray-100 flex flex-col gap-3 mt-5 py-5 pl-3 rounded-lg">
            <section className="flex flex-col py-3">
              <label className="pb-4">
                Num. de factura:
              </label>
              <input
                type="text"
                placeholder='id factura'
                value={datosFactura.id}
                onChange={handleFacturaDatos('id')}
                className='bg-white p-4 mx-3 mr-5 rounded-lg shadow-md'
              />
            </section>

            <section className="flex flex-col py-3">
              <label className="pb-4">
                Seleccione una proveedor:
              </label>
              <select
                value={datosFactura.proveedor}
                onChange={handleFacturaDatos('proveedor')}
                className=" bg-white p-4 mx-3 mr-5 rounded-lg shadow-md"
              >
                {dataProveedor.map((items, i) => (
                  <option key={i} value={items.nombre}>{items.nombre}</option>
                ))
                }
              </select>
            </section>

            <section className="flex flex-col py-3">
              <label className="pb-4">
                Categoria:
              </label>
              <input
                type="text"
                placeholder='Categoria'
                maxLength={1}
                value={datosFactura.tipo}
                onChange={handleFacturaDatos('tipo')}
                className='bg-white p-4 mx-3 mr-5 rounded-lg shadow-md'
              />
            </section>
            <section className="flex flex-col py-3">
              <label className="pb-4">
                Sucursal:
              </label>
              <input
                type="text"
                placeholder='Sucursal'
                maxLength={4}
                value={datosFactura.sucursal}
                onChange={handleFacturaDatos('sucursal')}
                className='bg-white p-4 mx-3 mr-5 rounded-lg shadow-md'
              />
            </section>

            <div className='flex justify-between'>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Importe total:
                </label>
                <input
                  type="text"
                  placeholder='Importe total'
                  value={datosFactura.total}
                  onChange={handleFacturaDatos('total')}
                  className='bg-white p-4 mx-3 rounded-lg shadow-md'
                />
              </section>
              <section className="flex flex-col py-3">
                <label className="pb-4">
                  Saldo total:
                </label>
                <input
                  type="text"
                  placeholder='Importe total'
                  value={datosFactura.saldo}
                  onChange={handleFacturaDatos('saldo')}
                  className='bg-white p-4 mr-5 rounded-lg shadow-md'
                />
              </section>
            </div>

            <div className='flex justify-between gap-7'>
              <section className="flex flex-col py-3">
                <label className="pb-4">Fecha de registro: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Seleccione una fecha"
                    value={fechaRegistro}
                    className='bg-white p-4 mx-3 rounded-lg shadow-md'
                    onChange={(newValue) => {
                      setFechaRegistro(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </section>

              <section className="flex flex-col py-3 pr-5">
                <label className="pb-4">Fecha de vencimiento: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Seleccione una fecha"
                    disablePast={true}
                    value={fechaVencimiento}
                    className='bg-white p-4 mx-3 rounded-lg shadow-md'
                    onChange={(newValue) => {
                      setFechaVencimiento(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </section>
            </div>
            <DataTable value={detalleFactura} responsiveLayout="scroll">
              <Column field="descripcion" header="Concepto"></Column>
              <Column field="cantidad" header="Cantidad"></Column>
              <Column field="precio" header="Precio unitario"></Column>
              <Column field="subtotal" header="Subtotal"></Column>
            </DataTable>
            <DetalleFacturaModal />
            <div className='flex justify-between px-5'>
              <input type="button" value="Volver" onClick={handleClose} className="w-52 self-center rounded-lg bg-red-400 font-bold p-3 mt-10 cursor-pointer hover:shadow-md" />
              <input type="submit" value="Guardar" className="w-52 self-center rounded-lg bg-green-500 font-bold p-3 mr-3 mt-10 cursor-pointer hover:shadow-md" />
            </div>
          </form>
        </Box>

      </Modal>
    </div>
  )
};