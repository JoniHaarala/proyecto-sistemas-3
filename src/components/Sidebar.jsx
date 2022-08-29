import {React, useState} from 'react';
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

  const activeLink = 'flex flex-col h-auto gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md m-2 ';
  const normalLink = 'flex flex-col h-12 overflow-hidden gap-3 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const activeSubLink = 'flex items-center gap-3 pl-8 pt-3 pb-2.5 rounded-lg text-md m-2 bg-gray-50';
  const normalSubLink = 'flex items-center gap-3 pl-8 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black m-2';
  
  const [isActive, setisActive] = useState(false)
  
  const hadleActiveMenu = () => {
    if(activeMenu === true){
      setisActive(true)
    }
  }
  

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
              links.map((item) => (
                <div key={item.title} >
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>

                  {item.links.map((link) => (
                    <div>
                      {/* items del menu principal */}
                      <NavLink
                        key={link.name}
                        to={`/${link.name}`}
                        onClick={() => {}}
                        className={({ isActive }) => isActive ? activeLink : normalLink }
                      >
                        <div className='flex gap-3'>
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
                                link2.links.map((subLink) => (
                                  <section>
                                    <NavLink
                                      key={subLink.id}
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