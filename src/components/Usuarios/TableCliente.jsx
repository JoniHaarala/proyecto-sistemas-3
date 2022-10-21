import { useEffect, useState } from 'react'
import { clienteColumn } from '../../data/tableColumns'
import DataTable from '../DataTable'
import Header from '../Head'
import TableFilter from '../TableFilter'
import { supabase } from '../../supabase/client'
import { Link } from 'react-router-dom'

const TableCliente = () => {
    const [Clientes, setClientes] = useState([])
    const [query, setQuery] = useState('')

    const getCLientes = async () => {
        try {
            let { data: clientes, error } = await supabase
                .from('clientes')
                .select("*")
            if (error) throw error
            if (clientes) setClientes(clientes)
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getCLientes()
    }, [])

    const search = (data) => {
        return data.filter((value) => (
            value.nombreCompleto.toLowerCase().includes(query)
            || value.correo.toString().toLowerCase().includes(query)
            || value.direccionActual.toLowerCase().includes(query)
            || value.telefono.toLowerCase().includes(query)
            || value.nacionalidad.toLowerCase().includes(query))
            )
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
            <Header category="Alquiler" title="Clientes" />
            <section className='flex justify-between items-center'>
                <TableFilter props={query} setProps={setQuery} />
                <Link to='/addCliente' className="p-4 self-end bg-blue-400 mb-2 shadow-md font-bold rounded-xl">+ Añadir nuevo cliente</Link>
            </section>
            <DataTable row={search(Clientes)} column={clienteColumn} />
        </div>
    )
}

export default TableCliente