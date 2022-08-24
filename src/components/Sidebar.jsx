import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/tempData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useStateContext } from '../context/ContextProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 bg-gray-200';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen overflow-auto md:overflow-hidden md:hover:overflow-auto pb-10">
      {activeMenu &&
        (<>

          <div className="flex justify-between items-center">
            {/* This is a link to the home page. */}
            <Link to="/"
              onClick={() => setActiveMenu(false)}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <DiamondIcon />
              <p>Fischer Inmobiliaria</p>
            </Link>

            {/* A tooltip component that is used to display a tooltip when the user hovers over the
            button. */}
            <TooltipComponent
              content="Menu"
              position="BottonCenter"
            >
              {/* A button that is used to toggle the activeMenu state. */}
              <button
                type='button'
                onClick={() => setActiveMenu((precActiveMenu) => !activeMenu)}
                className="text-xl rounded-full p-3 mt-4 hover:bg-main-bg block md:hidden"
              >
                <HighlightOffIcon />
              </button>
            </TooltipComponent>
          </div>

          {/* Mapping through the links funtion in tempData.js array and returning a div with a p tag. */}
          <div>
            {links.map((item) => (
              <div key={item.title} >
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={`/${link.name}`}
                    onClick={() => { }}
                    className={({ isActive }) => isActive ? activeLink : normalLink}
                  >
                    {link.icon}
                    <span className="capitalize">
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>

            ))}
          </div>
        </>)
      }
    </div>
  )
}

export default Sidebar