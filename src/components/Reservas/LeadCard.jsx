import { useState, useEffect } from 'react'
import { supabase } from '../../supabase/client'

export default function LeadCard() {
    const [leads, setLeads] = useState([])
    const getLeads = async () => {
        try {
            let { data: operacion_lead, error } = await supabase
                .from('operacion_lead')
                .select('*')
                .eq('activo',true)

            if (error) throw error
            if (operacion_lead) setLeads(operacion_lead)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getLeads()
    }, [])
    return (
        <div className='grid w-full xl:grid-cols-2 gap-4'>
            {
                leads.map(value => (
                    <div className='flex flex-col w-fit rounded-xl shadow-lg p-10 py-10 mt-8'>
                        <section className="flex gap-10">
                            <div className='self-center'>contacto</div>
                            <div className='flex flex-col px-5 gap-10 text-gray-600 border-l-2 border-l-slate-400'>
                                <p>nombre: {value.nombre}</p>
                                <p>correo: {value.correo}</p>
                                <p>direccion: {value.direccionActual}</p>
                                <p>telefono: {value.telefono}</p>
                                <p>zona interes: {value.zonaInteres}</p>
                                <p className='pb-10'>notas:-</p>
                            </div>
                        </section> 
                    </div>
                ))
            }
        </div>
    )
}
