import React from 'react'
import Header from '../Head';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

/*
    Descripcion del componente: Este componente se retiro de su ubicacion original en el componente AddPropiedad ya que ocurria que cuando uno intentaba ingresar un valos a cada input, estos perdian automaticamente el foco y uno debia
    hacer click sobre ese input continuamente para poder completar cada campo. Esto se debe a que cada vez que uno realiza un cambio sobre ese input, este renderiza automaticamente el form y hace que se pierda ese foco instantaneamente.
    La razon principal era que el componente se encontraba dentro del componente principal por lo que re-renderizaba este componente cada vez que uno realizaba un cambio en cada uno de los input. Para mas informacion fijarse en los sgtes link:
    https://stackoverflow.com/questions/69589353/onchange-in-react-input-causes-the-input-to-rerender-on-every-letter?noredirect=1&lq=1
    https://stackoverflow.com/questions/58778631/react-input-loses-focus-on-keypress?noredirect=1&lq=1
    https://codesandbox.io/s/magical-star-l564r?file=/src/App.js:0-501
    Por lo tanto se procedio a crear un nuevo componente separando este componente hijo dentro de su componente padre y solo renderinzando el componente hijo en si, no toda la logica detras de el.
    Para eso se crean dos props llamadas a modo de ejemplo "props" y "setProps" que lo que hacen es que la primera trae del componente padre la variable que el padre maneja y el segundo maneja el cambio de estado de esa variable en el componente padre mediante el uso del hook useState o con this.state en el caso de clases. 

*/
const Catacteristics = ({ caracteristicas, setCaracteristicas }) => {

    const Caracteristicas = {...caracteristicas}

    const handleChangeCaracteristicas = (prop) => (event) => {
        setCaracteristicas({ ...Caracteristicas, [prop]: event.target.value });
    };

    return (
        <div className='px-2 ml-8 mt-20'>
            <Header category="" title="Caracteristicas" />

            <div className='flex flex-col gap-3 items-center'>

                <h4 className="mt-5 pl-64 self-start">Precio y/o expensas</h4>
                <section id='precio' className="flex flex-col xl:flex-row gap-14">
                    <FormControl fullWidth sx={{ my: 2, width: '450px' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Precio</InputLabel>
                        <Input
                            id="precio-prop"
                            value={Caracteristicas.precio}
                            onChange={handleChangeCaracteristicas('precio')}
                            startAdornment={<InputAdornment position="start">u$d </InputAdornment>}
                        />
                    </FormControl>
                    <TextField id="expensas"
                        InputProps={{ startAdornment: <InputAdornment position="start">$ </InputAdornment>, }}
                        sx={{ my: 2, width: '450px' }}
                        value={Caracteristicas.expensas}
                        onChange={handleChangeCaracteristicas('expensas')}
                        label="Expensas"
                        variant="standard"
                    />
                </section>

                <h4 className="mt-14 pl-64 self-start">Superficie de la propiedad</h4>
                <section id='superficie' className="flex flex-col xl:flex-row gap-8">
                    <FormControl variant="standard" sx={{ my: 2, width: '300px' }}>
                        <InputLabel htmlFor="standard-superficieCubierta">superficie Cubierta</InputLabel>
                        <Input
                            id="super-cubierta"
                            value={Caracteristicas.superficieCubierta}
                            onChange={handleChangeCaracteristicas('superficieCubierta')}
                            endAdornment={<InputAdornment position="end"> m²</InputAdornment>}
                            inputProps={{
                                'aria-label': 'superficie Cubierta',
                            }}
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ my: 2, width: '300px' }}>
                        <InputLabel htmlFor="standard-superficieDescubierta">superficie Descubierta</InputLabel>
                        <Input
                            id="super-descu"
                            value={Caracteristicas.superficieDescubierta}
                            onChange={handleChangeCaracteristicas('superficieDescubierta')}
                            endAdornment={<InputAdornment position="end"> m²</InputAdornment>}
                            
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ my: 2, width: '300px' }}>
                        <InputLabel htmlFor="standard-superficieTotal">superficie Total</InputLabel>
                        <Input
                            id="super-total"
                            value={Caracteristicas.superficieTotal}
                            onChange={handleChangeCaracteristicas('superficieTotal')}
                            endAdornment={<InputAdornment position="end"> m²</InputAdornment>}
                            
                        />
                    </FormControl>
                </section>

                <h4 className="mt-14 pl-64 self-start">Ambientes, dormitorios y baños</h4>
                <section id='habitaciones' className="flex flex-col xl:flex-row gap-8">
                    <TextField id="habitaciones"
                        sx={{ my: 2, width: '300px' }}
                        value={Caracteristicas.dormitorios}
                        onChange={handleChangeCaracteristicas('dormitorios')}
                        label="N° de dormitorios"
                        variant="standard"
                        
                    />
                    <TextField id="baños"
                        sx={{ my: 2, width: '300px' }}
                        value={Caracteristicas.baños}
                        onChange={handleChangeCaracteristicas('baños')}
                        label="N° de baños"
                        variant="standard"
                        
                    />
                    <TextField id="ambientes"
                        sx={{ my: 2, width: '300px' }}
                        value={Caracteristicas.ambientes}
                        onChange={handleChangeCaracteristicas('ambientes')}
                        label="N° de ambientes"
                        variant="standard"
                        
                    />
                </section>

                <h4 className="mt-14 pl-64 self-start">Garage y antiguedad</h4>
                <section id='Garage' className="flex flex-col xl:flex-row gap-14">
                    <TextField id="Garage"
                        sx={{ my: 2, width: '450px' }}
                        value={Caracteristicas.garage}
                        onChange={handleChangeCaracteristicas('garage')}
                        label="Garage"
                        variant="standard"
                        
                    />
                    <FormControl variant="standard" sx={{ my: 2, width: '450px' }}>
                        <InputLabel htmlFor="standard-superficieTotal">Antigüedad</InputLabel>
                        <Input
                            id="antigüedad"
                            value={Caracteristicas.antiguedad}
                            onChange={handleChangeCaracteristicas('antiguedad')}
                            endAdornment={<InputAdornment position="end">años</InputAdornment>}
                            
                        />
                    </FormControl>
                </section>
            </div>
        </div>
    )
}

export default Catacteristics;