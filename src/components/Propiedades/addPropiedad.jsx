import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
            <div>
                paso de tipo y ubicacion
            </div>
        )
    }
    const Catacteristics = () => {
        return (
            <div>
                caracteristicas
            </div>
        )
    }
    const Ubication = () => {
        return (
            <div>
                ubicacion
            </div>
        )
    }
    const MediaFiles = () => {
        return (
            <div>
                archivos
            </div>
        )
    }
    const Propertys = () => {
        return (
            <div>
                comodidades
            </div>
        )
    }
    const Description = () => {
        return (
            <div>
                Descripcion
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
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
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
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}
