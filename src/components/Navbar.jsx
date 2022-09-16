import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
/* */
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
/* */
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Chat, Notification, ThemeSettingButton } from '.';
// despues importar el cart
import { useStateContext } from '../context/ContextProvider';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/client';

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

  /*------------------- Menu de Usuario ---------------------*/
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [OpenExit, setOpenExit] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*---------------------------------------------------------*/

  const handleClickOpen = (e) => {
    setOpenExit(true);
  };
  const handleCloseExit = () => {
    setOpenExit(false);
  }


  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<MenuIcon />} />
      <div className="flex">
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<ShoppingCartIcon />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<ChatIcon />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<NotificationsIcon />} />

        {/* Profile menu */}
        <React.Fragment>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, backgroundColor: 'orange' }}>J</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar src={avatar} /><Link className='w-full' to="/Account" onClick={handleClose}>Profile</Link>
            </MenuItem>
            {/* <MenuItem>
              <Avatar sx={{ bgcolor: green[500] }}>
                <AutoFixHighIcon />
              </Avatar>
              <Link to="/EditAccount">Edit account</Link>
            </MenuItem> */}
            <Divider />
            {/* <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem> */}
            <MenuItem onClick={handleClose}>
              <ThemeSettingButton />
            </MenuItem>

            <MenuItem>
              <Tooltip title="Logout" placement="left">
                <button
                  type="button"
                  className="flex w-full"
                  onClick={handleClickOpen}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </button>
              </Tooltip>
              <Dialog
                open={OpenExit}
                onClose={handleCloseExit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Desea realmente cerrar sesion?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Debera volver a iniciar sesion una vez que haya seleccionado la opcion SI
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseExit}>No</Button>
                  <Button onClick={() => supabase.auth.signOut()}>Si</Button>
                </DialogActions>
              </Dialog>
            </MenuItem>

          </Menu>
        </React.Fragment>

        {/* Por ahora dejemos esto asi pero mas adelante ver las funcionalidades de cada parte del navbar */}

        {/* {isClicked.cart && (<Cart />)} */}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}

      </div>
    </div>
  );
};

export default Navbar;