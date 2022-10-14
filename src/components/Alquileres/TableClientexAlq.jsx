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
            let { data: usuario, error } = await supabase
                .from('usuario')
                .select("*")
                .eq('idrol', 'cliente')
            if (error) throw error
            if (usuario) setClientes(usuario)
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
            value.nameSurname.toLowerCase().includes(query)
            || value.mail.toString().toLowerCase().includes(query)
            || value.address.toLowerCase().includes(query)
            || value.phone.toLowerCase().includes(query))
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