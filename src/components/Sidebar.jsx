import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links, subLinks } from '../data/configData';
import { useStateContext } from '../context/ContextProvider';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DiamondIcon from '@mui/icons-material/Diamond';

const Sidebar = () => {

  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex flex-col  gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md dark:text-gray-400';
  const normalLink = 'flex flex-col  gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200';

  const activeSubLink = 'flex items-center gap-3 pr-12 pl-8 pt-3 pb-2.5 rounded-lg text-md m-2 bg-gray-50 dark:text-black';
  const normalSubLink = 'flex items-center gap-3 pr-12 pl-8 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black dark:hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen overflow-auto md:overflow-hidden md:hover:overflow-auto pb-10">
      {activeMenu &&
        (<>

          <div className=" h-12 flex justify-between items-center">
            {/* This is a link to the home page. */}
            <Link to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <DiamondIcon />
              <p>
                <span className='dark:text-blue-500'>Fischer </span><span className='dark:text-red-500'>Inmo<span className='dark:text-green-500'>bili</span>aria</span>
              </p>
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
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 mt-4 hover:bg-main-bg block md:hidden"
              >
                <HighlightOffIcon />
              </button>
            </TooltipComponent>
          </div>

          {/* Mapping through the links funtion in cinfigData.js array and returning a div with a p tag. */}
          <div>
            {
              links.map((item, index) => (
                <div key={index} >
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>

                  {item.links.map((link, index) => (
                    <div>
                      {/* items del menu principal */}
                      <NavLink
                        key={index}
                        to={`/${link.name}`}
                        onClick={() => { }}
                        className={({ isActive }) => isActive ? activeLink : normalLink}
                      >
                        <div className='flex gap-3 pl-1.5 py-2 mr-2 rounded-lg dark:hover:text-black dark:hover:bg-light-gray'>
                          {link.icon}
                          <span className="capitalize">
                            {link.name}
                          </span>
                        </div>

                        {/* Items del submenu */}
                        <section className='flex flex-col'>
                          {
                            subLinks.map((link2) => (
                              (link.name === link2.title)
                                ?
                                link2.links.map((subLink, index) => (
                                  <section>
                                    <NavLink
                                      key={index}
                                      to={`/${subLink.name}`}
                                      className={({ isActive }) => isActive ? activeSubLink : normalSubLink}
                                    >
                                      <span className="capitalize">
                                        {subLink.subname}
                                      </span>
                                      {console.log(subLink.subname)}
                                    </NavLink>
                                  </section>
                                ))
                                :
                                <p></p>
                            ))
                          }
                        </section>
                      </NavLink>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </>)
      }
    </div>
  )
}

export default Sidebar

// para la proxima ya se como voy a arreglar el tema de los menues desplegables... para eso cambiar el navLInk 
// por un button para despues que el boton al ser clikeado cambie de estado para cadad una delas paginas