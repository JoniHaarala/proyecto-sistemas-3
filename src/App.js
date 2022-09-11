import React, { useEffect } from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import SettingsIcon from '@mui/icons-material/Settings';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer, ThemeSettings } from './components'
import { Home, Alquileres, Contable, Contratos, Empleados, Facturation, Reservas, Calendar, Kanban, ColorPicker, Editor, Area, Bar, ColorMapping, Financial, Line, Pie, Pyramid, Stacked, Informes, EditFact, DelFact, PayFact, CreateFact, Pagos, Proveedor, CreateProv, Propiedades } from './pages';
import { useStateContext } from './context/ContextProvider';

function App() {

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>

      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="flex text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <SettingsIcon />
            </button>

          </TooltipComponent>
        </div>
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
              <Route path="/Dashboard" element={<Home />} />

              {/* Modules for each Funtion Pages */}
              {/* Facturacion */}
              <Route path='/Facturas' element={<Home />} />
              <Route path="/listarFacturas" element={<Facturation />} />
              <Route path='/editarFactura' element={<EditFact />} />
              {/* <Route path='/borrarFactura' element={<DelFact />} /> */}
              <Route path='/pagarFactura' element={<PayFact />} />
              <Route path='/registrarFactura' element={<CreateFact />} />
              {/* other pages */}
              <Route path="/contable" element={<Contable />} />
              <Route path="/alquiler" element={<Alquileres />} />
              <Route path="/Contratos" element={<Contratos />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/informes" element={<Informes />} />
              <Route path="/reservas" element={<Reservas />} />
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
  );
}

export default App;
