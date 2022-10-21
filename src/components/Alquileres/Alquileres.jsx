import { useEffect, useState } from 'react'
import DataTable from '../DataTable'
import Header from '../Head'
import TableFilter from '../TableFilter'
import { supabase } from '../../supabase/client'
import { Link } from 'react-router-dom'
import { alquilerColumn } from '../../data/tableColumns'

export default function Alquileres() {
  const [alquileres, setAlquileres] = useState([])
  const [query, setQuery] = useState('')

  const getAlquileres = async () => {
    try {
      let { data: alquiler, error } = await supabase
        .from('alquiler')
        .select('*')

      if (error) throw error
      if (alquiler) setAlquileres(alquiler)
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getAlquileres()
  }, [])

  const search = (data) => {
    return data.filter((value) => (
      value.nameCliente.toLowerCase().includes(query)
      || value.namePropietario.toString().toLowerCase().includes(query)
      || value.tipoCasa.toLowerCase().includes(query)
      || value.direccion.toLowerCase().includes(query)
      || value.estado.toLowerCase().includes(query))
    )
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="Alquiler" title="Alquileres" />
      <section className='flex justify-between items-center'>

        <TableFilter props={query} setProps={setQuery} />
        {/* <Link to='/addCliente' className="p-4 self-end bg-blue-400 mb-2 shadow-md font-bold rounded-xl">+ Generar contrato</Link> */}
      </section>
      <DataTable row={search(alquileres)} column={alquilerColumn} />
    </div>
  )
}