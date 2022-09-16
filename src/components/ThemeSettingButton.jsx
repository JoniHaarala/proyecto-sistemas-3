import React from 'react'
import { Tooltip } from '@mui/material'
import { useStateContext } from '../context/ContextProvider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';

const Button = () => {
  const { setThemeSettings } = useStateContext();
  return (
      <Tooltip
        title={"Settings"}
        placement={"left"}
      >
        <button
          type="button"
          onClick={() => setThemeSettings(true) }
          // style={{ background: currentColor, borderRadius: '50%' }}
          className="flex py-3 pr-3 w-full"
        >
          <ListItemIcon>
                <Settings />
              </ListItemIcon>
          Settings
        </button>

      </Tooltip>
  )
}

export default Button