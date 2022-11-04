import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Sidebar, Footer, ThemeSettings, AddPropiedad, Account, TablePropietario, TableCliente } from './components'
import { Home, Contable, Empleados, Facturation, Reservas, Calendar, ColorPicker, Editor, Area, Bar, ColorMapping, Financial, Line, Pie, Pyramid, Stacked, Informes, PayFact, CreateFact, Pagos, Proveedor, CreateProv, Propiedades } from './pages';
import SignUp from './components/Usuarios/SignUp'
import { useStateContext } from './context/ContextProvider';
import { supabase } from './supabase/client'
import Auth from './components/Usuarios/Auth'
import Kanban from './pages/Apps/Kanban';
import AddCliente from './components/Usuarios/AddCliente';
import AddPropietario from './components/Usuarios/AddPropietario';
import AddCuota from './pages/f-Alquiler/AddCouta'
import AlquilerTemporario from './components/Alquileres/AlquilerTemporario';
import Alquileres from './components/Alquileres/Alquileres';
import Lead from './components/Reservas/Lead';
import Solicitud from './components/Reservas/Solicitud';
import Reserva from './components/Reservas/Reserva';
import Contratos from './components/Contratos/Contratos';
import TableContratos from './pages/f-Contratos/TableContratos';
import TableCuotas from './pages/f-Contratos/TableCuotas';

function App() {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, themeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const navigate = useNavigate()

  useEffect(() => {
    let subscribe = true;

    supabase.auth.onAuthStateChange((event, session) => {
      if (subscribe) {
        if (!session) {
          navigate(<Auth></Auth>)
        }
        // else {
        //   navigate('/')
        // }
        console.log(event, session)
      }
    })

    return () => {
      subscribe = false;
    }
  }, [navigate])

  return (
    // recordar cambiar la negacion de la condicion de !supabase.auth.user() por supabase.auth.user() para volver a la normalidad
    (supabase.auth.user())
      ?
      (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>

          <div className="flex relative dark:bg-main-dark-bg font-[Montserrat] text-base">
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              {/* In this fragment of React, it's used to group a list of children without adding extra nodes to the DOM. */}
              <section>

                {themeSettings && (<ThemeSettings />)}

                <Routes>
                  {/* Main dashboard */}
                  <Route path="/" element={<Home />} />
                  <Route path='/login' element={<Auth />} />
                  <Route path='/SignUp' element={<SignUp />} />
                  <Route path="/Dashboard" element={<Home />} />

                  {/* Usuarios */}
                  <Route path='/Account' element={<Account />} />
                  <Route path='/addCliente' element={<AddCliente />} />
                  <Route path='/addPropietario' element={<AddPropietario />} />


                  {/* Modules for each Funtion Pages */}

                  {/* Facturacion */}
                  <Route path='/Facturas' element={<Home />} />
                  <Route path="listarFacturas" element={<Facturation />} />
                  <Route path='pagarFactura' element={<PayFact />} />
                  <Route path='registrarFactura' element={<CreateFact />} />

                  {/* contable */}
                  <Route path="/contable" element={<Contable />} />

                  {/* alquileres */}
                  <Route path="/alquiler" element={<Home />} />
                  <Route path="/alquileres" element={<Alquileres />} />
                  <Route path="/tempAlquileres" element={<AlquilerTemporario />} />

                  {/* Contratos */}
                  <Route path="/Contratos" element={<Home />} />
                  <Route path="/listContratos" element={<TableContratos />} />
                  <Route path="/listCuotas" element={<TableCuotas />} />
                  <Route path="/addContrato" element={<Contratos />} />
                  <Route path="/addCuota" element={<AddCuota />} />

                  {/* Clientes */}
                  <Route path="/Clientes" element={<Empleados />} />
                  <Route path="/listarPropietarios" element={<TablePropietario />} />
                  <Route path="/listarClientes" element={<TableCliente />} />

                  <Route path="/informes" element={<Informes />} />

                  {/* Reservas */}
                  <Route path="/reservas" element={<Home />} />
                  <Route path="/setReservas" element={<Reservas />} />
                  <Route path="/reserva-lead" element={<Lead />} />
                  <Route path="/reserva-solicitud" element={<Solicitud />} />
                  <Route path="/reserva-prealquiler" element={<Reserva />} />

                  {/* Proveedores */}
                  <Route path='/proveedores' element={<Home />} />
                  <Route path='/listarProveedor' element={<Proveedor />} />
                  <Route path='/createProveedor' element={<CreateProv />} />

                  {/* Tesoreria */}
                  <Route path="/tesoreria" element={<Home />} />
                  <Route path='/verPagos' element={<Pagos />} />

                  {/* Propiedades */}
                  <Route path='/propiedades' element={<Home />} />
                  <Route path='/listarPropiedad' element={<Propiedades />} />
                  <Route path='/addPropiedad' element={<AddPropiedad />} />

                  {/* Apps or enterprise functionalities */}
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} />
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/kanban" element={<Kanban />} />

                  {/* Charts */}
                  <Route path="/line" element={<Area />} />
                  <Route path="/area" element={<Bar />} />
                  <Route path="/bar" element={<ColorMapping />} />
                  <Route path="/pie" element={<Financial />} />
                  <Route path="/financial" element={<Line />} />
                  <Route path="/color-mapping" element={<Pie />} />
                  <Route path="/piramid" element={<Pyramid />} />
                  <Route path="/stacked" element={<Stacked />} />
                </Routes>
                
              </section>
              <Footer />
            </div>
          </div>

        </div>
      )
      :
      <Auth />
  );
}

export default App;
