import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Reservas() {
  const [value, setValue] = React.useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab label="CONTACTOS" {...a11yProps(0)} />
          <Tab label="SOLICITUDES" {...a11yProps(1)} />
          {/* <Tab label="RESERVAS" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <Link to="/reserva-lead">
            <p className="py-3 w-fit px-4 rounded-lg capitalize border-x border-y border-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:text-blue-800">+ añadir contacto</p>
          </Link>
        </div>

        <div className='flex flex-col w-fit rounded-xl shadow-lg p-20 py-10 mt-8'>
          <section className="flex gap-10">
            <div>contacto</div>
            <div className='flex flex-col gap-10 text-gray-600'>
              <p>juan perez</p>
              <p>interesado</p>
              <p>juan-perez@mail.com</p>
              <p>1550990512</p>
              <p className='pb-10'>notas:-</p>
              <p className="p-3 rounded-2xl shadow-lg text-center bg-green-100">1 Solicitud</p>
            </div>
          </section>
          <section className='flex justify-end gap-6 pt-14'>
            <p className='text-red-500'>BORRAR</p>
            <p className='text-green-500'>VER</p>
          </section>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <Link to="/reserva-solicitud">
            <p className="py-3 w-fit px-4 rounded-lg capitalize border-x border-y border-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:text-blue-800">+ añadir solicitud</p>
          </Link>
        </div>

        <div className='flex flex-col w-fit rounded-xl shadow-lg p-20 py-10 mt-8'>
          <section className="flex gap-10">
            <div>solicitud</div>
            <div className='flex flex-col gap-10 text-gray-600'>
              <p>juan perez</p>
              <p>interesado</p>
              <p>juan-perez@mail.com</p>
              <p>1550990512</p>
              <p className='pb-10'>notas:-</p>
              <p className="p-3 rounded-2xl shadow-lg text-center bg-green-100">1 Solicitud</p>
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
                <MenuItem onClick={handleClose}><Link to="/addContrato">generar contrato y convertir a inquilino</Link></MenuItem>
                
              </Menu>
            </div>
          </section>
          <section className='flex justify-end gap-6 pt-14'>
            <p className='text-red-500'>BORRAR</p>
            <p className='text-green-500'>VER</p>
          </section>
        </div>
      </TabPanel>

      {/* ESTE TAB LO OCULTAMOS POR AHORA YA Q VA EN LA SECCION DE CONTRATOS */}
      <TabPanel value={value} index={2}>
        <div>
          <Link to="/reserva-prealquiler">
            <p className="py-3 w-fit px-4 rounded-lg capitalize border-x border-y border-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:text-blue-800">+ añadir reserva</p>
          </Link>
        </div>

        <div className='flex flex-col w-fit rounded-xl shadow-lg p-20 py-10 mt-8'>
          <section className="flex gap-10">
            <div>reserva</div>
            <div className='flex flex-col gap-5 text-gray-600'>
              <p>juan perez</p>
              <p>interesado</p>
              <p>juan-perez@mail.com</p>
              <p>1550990512</p>
              <p className='pb-10'>notas:-</p>
              <p className="p-3 rounded-2xl shadow-lg text-center bg-green-100">1 Solicitud</p>
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
                <MenuItem onClick={handleClose}>generar contrato y convertir a inquilino</MenuItem>
                <MenuItem onClick={handleClose}>Borrar reserva</MenuItem>
                <MenuItem onClick={handleClose}>Ver detalle</MenuItem>
              </Menu>
            </div>
          </section>
          <section className='flex justify-end gap-6 pt-14'>
            <p className='text-red-500'>BORRAR</p>
            <p className='text-green-500'>VER</p>
          </section>
        </div>
      </TabPanel>
    </Box>
  )
}
