// import { Routes, Route, Link } from "react-router-dom";
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import SettingsIcon from '@mui/icons-material/Settings';
import { Routes, Route } from 'react-router-dom';
import { Header, Navbar, Sidebar, Footer, ThemeSet} from './components'
import { Home, Alquileres, Contable, Contratos, Empleados, 
  Facturation, Propiedades, Reservas, Tesoreria, Calendar, 
  Kanban, ColorPicker, Editor, Area, Bar, ColorMapping, 
  Financial, Line, Pie, Pyramid, Stacked, Informes} from './pages'

function App() {

  const activeMenu = true;

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <Header>
        <ThemeSet />
      </Header>

      <div className="fixed right-4 bottom-4" style={{ zIndex: 1000 }}>
        <TooltipComponent content="settings" position="Top">
          <button
            type='button'
            className="text-white flex text-3xl p-3 hover:bg-slate-300 hover:drop-shadow-lg"
            style={{ background: 'blue', borderRadius: '50%' }}>
            <SettingsIcon />
          </button>
        </TooltipComponent>
      </div>
      {
        activeMenu ? (
          <section className="fixed w-72 sidebar dark:bg-main-dark-bg bg-main-bg">
            <Sidebar />
          </section>
        ) : (
          <section className='w-0 dark:bg-main-dark-bg'>
            <Sidebar />
          </section>
        )
      }
      <section className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}>{/* estas comillas (``) se llaman template string y sirven para usar variables dentro de un string */}
        <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
          <Navbar />
        </div>
      </section>

      {/* In this fragment of React, it's used to group a list of children without adding extra nodes to the DOM. */}
      <section>
        <Routes>
          {/* Main dashboard */}
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Home />} />
          {/* Funtion Pages */}
          <Route path="/facturas" element={<Facturation />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/contable" element={<Contable />} />
          <Route path="/alquileres" element={<Alquileres />} />
          <Route path="/Contratos" element={<Contratos />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/informes" element={<Informes />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/tesoreria" element={<Tesoreria />} />
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

      <Footer>

      </Footer>
    </div>
  );
}

export default App;
