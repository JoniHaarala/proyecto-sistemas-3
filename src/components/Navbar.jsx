import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
//import { Chat, Notification, UserProfile } from '.';
// despues importar el cart
import { useStateContext } from '../context/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<MenuIcon />} />
      <div className="flex">
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<ShoppingCartIcon />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<ChatIcon />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<NotificationsIcon />} />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Joni
              </span>
            </p>
            <KeyboardArrowDownIcon className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/* Por ahora dejemos esto asi pero mas adelante ver las funcionalidades de cada parte del navbar */}

        {/* {isClicked.cart && (<Cart />)} */}
        {/* {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked && (<UserProfile />)} */}
      </div>
    </div>
  );
};

export default Navbar;