/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Head';
import { Map } from '..';
import { supabase } from '../../supabase/client';
import Checkbox from '@mui/material/Checkbox';


const steps = ['Tipo y operacion', 'Características', 'Ubicación', 'Archivos multimedia', 'Comodidades', 'Descripción'];


export default function AddPropiedad() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    //Estados para tipo y operacion
    /*------------------------------------------------------*/
    const [Tipo, setTipo] = useState('')
    const [Operacion, setOperacion] = useState('')
    const [Estado, setEstado] = useState('')
    /*------------------------------------------------------*/

    //Estados para Caracteristicas
    /*-------------------------------------------------------*/
    const [Precio, setPrecio] = useState('')
    const [SuperficieCubierta, setSuperficieCubierta] = useState('')
    const [SuperficieDescu, setSuperficieDescu] = useState('')
    const [SuperficieTotal, setSuperficieTotal] = useState('')
    const [Ambientes, setAmbientes] = useState('')
    const [Dormitorios, setDormitorios] = useState('')
    const [Baños, setBaños] = useState('')
    const [Garage, setGarage] = useState('')
    const [antiguedad, setAntiguedad] = useState('')
    /*-------------------------------------------------------*/

    //Estados para Ubicacion
    /*-------------------------------------------------------*/
    const [Direccion, setDireccion] = useState('')
    const [Ciudad, setCiudad] = useState('')
    const [Localidad, setLocalidad] = useState('')
    const [Barrio, setBarrio] = useState('')
    const [Latitud, setLatitud] = useState('')
    const [Longitud, setLongitud] = useState('')
    /*-------------------------------------------------------*/

    //Estados para multimedia
    /*-------------------------------------------------------*/
    /*-------------------------------------------------------*/

    //Estados para Comodidades
    /*-------------------------------------------------------*/
    const [Agua, setAgua] = useState(false)
    const [Luz, setLuz] = useState(false)
    const [Terraza, setTerraza] = useState(false)
    const [Cloaca, setCloaca] = useState(false)
    const [Telefono, setTelefono] = useState(false)
    const [Comercial, setComercial] = useState(false)
    const [Gas, setGas] = useState(false)
    const [Wifi, setWifi] = useState(false)
    const [AC, setAC] = useState(false)
    const [Pavimento, setPavimento] = useState(false)
    const [Ascensor, setAscensor] = useState(false)
    const [Alarma, setAlarma] = useState(false)
    const [Vigilancia, setVigilancia] = useState(false)
    const [Lavadero, setLavadero] = useState(false)
    const [Gimnasio, setGimnasio] = useState(false)
    const [Balcon, setBalcon] = useState(false)
    const [Living, setLiving] = useState(false)
    const [Cocina, setCocina] = useState(false)
    const [Parilla, setParilla] = useState(false)
    const [Mascotas, setMascotas] = useState(false)
    const [Piscina, setPiscina] = useState(false)
    const [Jardin, setJardin] = useState(false)
    const [Oficina, setOficina] = useState(false)
    /*-------------------------------------------------------*/

    //Estado para Descipcion
    /*-------------------------------------------------------*/
    const [Descripcion, setDescripcion] = useState('')
    /*-------------------------------------------------------*/


    // En esta seccion van todos los componentes de cada paso jejox
    /*------------------------------------------------------*/
    const TipoyOperacion = () => {
        return (
            <div className='px-2 ml-8 mt-20'>
                <Header category="" title="Tipo y ubicacion" />
            </div>
        )
    }
    const Catacteristics = () => {
        return (
            <div className='px-2 ml-8 mt-20'>

                <Header category="" title="Caracteristicas" />
            </div>
        )
    }
    const Ubication = () => {
        // url buena alternativa para buscar localidades: https://nominatim.openstreetmap.org/search?q={ nombre de la localidad separada con +; por ej:coronel+moldes }&format=json
        const [Lat, setLat] = useState(-24.608189)
        const [Lon, setLon] = useState(-65.385018)
        const [WordEntered, setWordEntered] = useState('')
        const [locations, setLocations] = useState([])
        const [SelectLocation, setSelectLocation] = useState([])

        const handleFilter = async (event) => {
            const searchWord = event.target.value;
            setWordEntered(searchWord);
            let { data: places, error } = await supabase
                .from('places')
                .select("*")
                // Filters
                .ilike('localidad', `%${WordEntered}%`)
            if (error) console.log("error", error);
            else setLocations(places);

            if (searchWord === "") {
                setLocations([]);
            }
        };

        useEffect(() => {
            handleFilter()
            handleSelection()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const handleSelection = async e => {
            e.preventDefault()
            let { data: places, error } = await supabase
                .from('places')
                .select("*")
                // Filters
                .eq('id', e.target.value)
            if (error) console.log("error", error);
            else {
                setSelectLocation(places)
            };
            SelectLocation.map((value) => (
                setWordEntered(value.localidad + ', ' + value.ciudad)
            ))

            SelectLocation.map((value) => (
                setLat(value.latitud)
            ))
            SelectLocation.map((value) => (
                setLon(value.longitud)
            ))
        }

        const clearInput = () => {
            setLocations([]);
        };

        return (
            <div className='px-2 ml-8 mt-20'>
                <Header category="" title="Ubicacion" />
                <Map lat={Lat} lon={Lon} />
                <div>
                    <div className="w-64 flex p-3 shadow-md rounded-xl my-5">
                        <input
                            type="text"
                            placeholder='Input location...'
                            value={WordEntered}
                            onChange={handleFilter}
                            className="pl-2"
                        />
                        <div className="searchIcon">
                            {locations.length === 0 ? (
                                <SearchIcon />
                            ) : (
                                <CloseIcon id="clearBtn" onClick={clearInput} />
                            )}
                        </div>
                    </div>
                    {locations.length !== 0 && (
                        <div className="h-40 w-64 overflow-hidden overflow-y-auto">
                            {locations.slice(0, 25).map((value) => {
                                return (
                                    <option className="text-sm hover:bg-gray-300 hover:cursor-pointer" value={value.id} onClick={handleSelection}>{value.localidad}, {value.ciudad}</option>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        )
    }
    const MediaFiles = () => {
        return (
            <div className='px-2 ml-8 mt-20'>
                <Header category="" title="Archivos" />
            </div>
        )
    }
    const Propertys = () => {

        return (
            <div className='px-2 ml-8 mt-20'>
                <Header category="" title="Comodidades" />
                <div className='flex justify-center'>
                    <div className='flex flex-col items-end py-4 px-3 mr-7'>
                        <label>Agua
                            <Checkbox
                                checked={Agua}
                                onChange={(event) => { setAgua(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Luz
                            <Checkbox
                                checked={Luz}
                                onChange={(event) => { setLuz(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Terraza
                            <Checkbox
                                checked={Terraza}
                                onChange={(event) => { setTerraza(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Cloaca
                            <Checkbox
                                checked={Cloaca}
                                onChange={(event) => { setCloaca(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Telefono
                            <Checkbox
                                checked={Telefono}
                                onChange={(event) => { setTelefono(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>

                    <div className='flex flex-col items-end py-4 px-3 mx-7'>
                        <label>Comercial
                            <Checkbox
                                checked={Comercial}
                                onChange={(event) => { setComercial(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Gas
                            <Checkbox
                                checked={Gas}
                                onChange={(event) => { setGas(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Wifi
                            <Checkbox
                                checked={Wifi}
                                onChange={(event) => { setWifi(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>AC
                            <Checkbox
                                checked={AC}
                                onChange={(event) => { setAC(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Pavimento
                            <Checkbox
                                checked={Pavimento}
                                onChange={(event) => { setPavimento(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>

                    <div className='flex flex-col items-end py-4 px-3 mx-7'>
                        <label>Ascensor
                            <Checkbox
                                checked={Ascensor}
                                onChange={(event) => { setAscensor(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Alarma
                            <Checkbox
                                checked={Alarma}
                                onChange={(event) => { setAlarma(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Vigilancia
                            <Checkbox
                                checked={Vigilancia}
                                onChange={(event) => { setVigilancia(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Lavadero
                            <Checkbox
                                checked={Lavadero}
                                onChange={(event) => { setLavadero(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Gimnasio
                            <Checkbox
                                checked={Gimnasio}
                                onChange={(event) => { setGimnasio(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>

                    <div className='flex flex-col items-end py-4 px-3 mx-7'>
                        <label>Balcon
                            <Checkbox
                                checked={Balcon}
                                onChange={(event) => { setBalcon(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Living
                            <Checkbox
                                checked={Living}
                                onChange={(event) => { setLiving(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Cocina
                            <Checkbox
                                checked={Cocina}
                                onChange={(event) => { setCocina(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Parilla
                            <Checkbox
                                checked={Parilla}
                                onChange={(event) => { setParilla(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Mascotas
                            <Checkbox
                                checked={Mascotas}
                                onChange={(event) => { setMascotas(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>

                    <div className='flex flex-col items-end py-4 px-3 mx-7'>
                        <label>Piscina
                            <Checkbox
                                checked={Piscina}
                                onChange={(event) => { setPiscina(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Jardin
                            <Checkbox
                                checked={Jardin}
                                onChange={(event) => { setJardin(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                        <label>Oficina
                            <Checkbox
                                checked={Oficina}
                                onChange={(event) => { setOficina(event.target.checked); }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </label>
                    </div>
                </div>
            </div>
        )
    }
    const Description = () => {
        return (
            <div className='px-2 ml-8 mt-20'>
                <Header category="" title="Descripcion" />
            </div>
        )
    }
    /*------------------------------------------------------*/

    const isStepOptional = (step) => {
        return step === -1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleSubmit = () => {

        setActiveStep(0);
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 10, mb: 1, px: 2 }}>
                            All steps completed - you're finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleSubmit}>Guardar</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {activeStep === 0 ? <TipoyOperacion /> : <></>}

                        {activeStep === 1 ? <Catacteristics /> : <></>}

                        {activeStep === 2 ? <Ubication /> : <></>}

                        {activeStep === 3 ? <MediaFiles /> : <></>}

                        {activeStep === 4 ? <Propertys /> : <></>}

                        {activeStep === 5 ? <Description /> : <></>}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Volver
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}
