import avatar from '../../data/avatar.jpg';
import moment from 'moment/moment'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../supabase/client'
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Avatar } from '@mui/material';
import Employee from './Employee';
import UserInfo from './UserInfo';
import { Kanban, Calendar } from '../../pages/index'

/* A function that returns a div with some properties. */
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

/* A propTypes validation. */
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * This function returns an object with two properties, id and aria-controls, where the values of the
 * properties are strings that are dynamically generated based on the index argument.
 * @returns An object with two properties.
 */
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

  /* Saves user in memo with useMemo to not rerender many times and changes onluy when user changes*/
  const user = useMemo(() => User, [User]);

  /* Getting the user session from the Supabase client. */
  const session = supabase.auth.session()

  useEffect(() => {
    getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* It gets the user's profile from the database and sets it to the state. */
  const getProfile = async () => {
    try {

      let { data: usuario, error, status } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', session.user.id)

      if (error && status !== 406) {
        throw error
      } else setUser(usuario)
      console.log(usuario)

    } catch (error) {
      alert(error.message)
    }
  }

  /*
   * The handleChange function takes an event and a newValue as arguments, and then sets the value of
   * the newValue to the value of the event.
   */
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

      {user.map((users) => (
        <div className='w-fit flex bg-white rounded-xl shadow-lg mx-10 my-10'>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Informacion personal" {...allyProps(0)} />
            {users.idrol === 'admin'
              ? <Tab label="Registrar empleado" {...allyProps(1)} />
              : <Tab label="Abrir Kanban" {...allyProps(1)} />}
            {/* <Tab label="Abrir Kanban" {...allyProps(2)} /> */}
          </Tabs>
          <TabPanel value={value} index={0}>
            <UserInfo data={user} />
          </TabPanel>
          {users.idrol === 'admin'
            ?
            <TabPanel value={value} index={1}>
              <Employee />
            </TabPanel>
            :
            <TabPanel value={value} index={1}>
              <Kanban />
            </TabPanel>
          }

        </div>
      ))}

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