import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import { Header } from '../../components'
import TableFilter from '../../components/TableFilter'
import { supabase } from '../../supabase/client'
import { Link } from 'react-router-dom'
import { cuotaColumn } from '../../data/tableColumns'

export default function TableCuotas() {

  const [cuotas, setCuotas] = useState([])
  const [query, setQuery] = useState('')

  const getAlquileres = async () => {
    try {

      let { data: operacion_cuotas, error } = await supabase
        .from('operacion_cuotas')
        .select('*')


      if (error) throw error
      if (operacion_cuotas) setCuotas(operacion_cuotas)
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
      value.cliente.toLowerCase().includes(query)
      || value.cuota.toString().toLowerCase().includes(query)
      || value.vencimiento.toLowerCase().includes(query)
      || value.estado.toLowerCase().includes(query))
    )
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="Cuotas" title="Listar cuotas" />
      <section className='flex justify-between items-center'>

        <TableFilter props={query} setProps={setQuery} />
        {/* <Link to='/addCliente' className="p-4 self-end bg-blue-400 mb-2 shadow-md font-bold rounded-xl">+ Generar contrato</Link> */}
      </section>
      <DataTable row={search(cuotas)} column={cuotaColumn} />
    </div>
  )
}
