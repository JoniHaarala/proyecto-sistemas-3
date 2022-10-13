import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';
import { PropiedadColumn } from '../../data/tableColumns';
import DataTable from '../DataTable';
import TableFilter from '../TableFilter';


const TablePropiedades = () => {

    const [Propiedad, setPropiedad] = useState([])
    const [query, setQuery] = useState('')

    const fetchPropiedades = async () => {
        let { data: propiedad, error } = await supabase
            .from('propiedad')
            .select('id,direccion,precio,idCatVenta,idTipo,propietario')

        if (error) console.log("error", error);
        else setPropiedad(propiedad);
    };

    useEffect(() => {
        fetchPropiedades()
    }, [])

    const search = (data) => {
        return data.filter((value) => (
            value.direccion.toLowerCase().includes(query)
            || value.precio.toString().toLowerCase().includes(query)
            || value.idCatVenta.toLowerCase().includes(query)
            || value.idTipo.toLowerCase().includes(query)
            || value.propietario.toLowerCase().includes(query))
        )
    }

    return (
        <div className='flex flex-col gap-3'>
            <section className='flex justify-between items-center'>
                <TableFilter props={query} setProps={setQuery} />
                <Link to='/addPropiedad' className="p-4 self-end bg-blue-400 mb-2 shadow-md text-sm font-bold rounded-xl">+ Añadir nueva propiedad</Link>
            </section>
            <DataTable row={search(Propiedad)} column={PropiedadColumn} />
        </div>
    )
}

export default TablePropiedades;