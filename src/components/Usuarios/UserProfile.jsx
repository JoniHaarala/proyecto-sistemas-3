import avatar from '../../data/avatar.jpg';
import moment from 'moment/moment'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../supabase/client'
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Avatar } from '@mui/material';
import Employee from './Employee';
import UserInfo from './UserInfo';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 3 }}>
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

function allyProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// Programa principal
const Account = () => {

  const [User, setUser] = useState([])
  const [value, setValue] = useState(0);

  const user = useMemo(() => User, [User]);

  const session = supabase.auth.session()

  useEffect(() => {  
      getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMemo(() => { }, []);
  const getProfile = async () => {
    try {

      let { data: usuario, error, status } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', session.user.id)

      if (error && status !== 406) {
        throw error
      } else setUser(usuario)

    } catch (error) {
      alert(error.message)
    }
  }

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  return (
    <div className='p-8 max-w-screen-xl bg-slate-50 dark:bg-main-dark-bg' aria-live="off">

      {user.map((value) => (
        <section className='w-fit p-7 flex bg-white rounded-xl shadow-lg mx-10'>
          <div>
            <h2 className='text-3xl px-5'>{value.name} {value.surname}</h2>
            <p className='px-5 pt-4'>Email: {session.user.email}</p>
            <p className='px-5 pt-4'>Joined {moment(value.created_at).format('LLLL')}</p>
          </div>
          <Avatar src={avatar} sx={{ width: 108, height: 108, ml: 5 }} />
        </section>
      ))}

      <div className='w-fit flex bg-white rounded-xl shadow-lg mx-10 my-10'>
        <Tabs
          orientation="vertical"
          //variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Informacion personal" {...allyProps(0)} />
          <Tab label="Registrar empleado" {...allyProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserInfo data={user}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Employee />
        </TabPanel>
      </div>
      <button
        type="button"
        className="py-3 px-5 bg-red-500 rounded-xl shadow-md font-bold text-white"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>

    </div>
  )
}

export default Account;