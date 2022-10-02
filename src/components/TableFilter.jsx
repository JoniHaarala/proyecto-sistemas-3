import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

const TableFilter = ({ props, setProps }) => {
    return (
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Filtrar datos</InputLabel>
            <OutlinedInput
                id="outlined-adornment-filter"
                type='text'
                value={props}
                onChange={(e) => setProps(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle search visivility"
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="filter data"
            />
        </FormControl>
    )
}

export default TableFilter;