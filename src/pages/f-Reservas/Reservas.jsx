import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import LeadCard from '../../components/Reservas/LeadCard';
import SolicitudCard from '../../components/Reservas/SolicitudCard';

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
        <LeadCard />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <Link to="/reserva-solicitud">
            <p className="py-3 w-fit px-4 rounded-lg capitalize border-x border-y border-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:text-blue-800">+ añadir solicitud</p>
          </Link>
        </div>
        <SolicitudCard />
      </TabPanel>

      {/* ESTE TAB LO OCULTAMOS POR AHORA YA Q VA EN LA SECCION DE CONTRATOS */}
      <TabPanel value={value} index={2}>
        <div>
          <Link to="/reserva-prealquiler">
            <p className="py-3 w-fit px-4 rounded-lg capitalize border-x border-y border-gray-800 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:text-blue-800">+ añadir reserva</p>
          </Link>
        </div>
      </TabPanel>
    </Box>
  )
}
