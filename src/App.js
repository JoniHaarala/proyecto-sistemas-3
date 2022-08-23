// import { Routes, Route, Link } from "react-router-dom";
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import SettingsIcon from '@mui/icons-material/Settings';

function App() {

  const activeMenu = true;

  return (
    <div className="flex relative dark:bg-gray-900">
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
          <div className="fixed w-72 sidebar dark:bg-gray-900 bg-gray-50">

          </div>
        ) : (
          <div className='w-0 dark:bg-gray-900'>

          </div>
        )
      }
      <div className={`dark:bg-gray-50 bg-gray-50 min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}>{/* estas comillas (``) se llaman template string y sirven para usar variables dentro de un string */}
      
      </div>
    </div>
  );
}

export default App;
