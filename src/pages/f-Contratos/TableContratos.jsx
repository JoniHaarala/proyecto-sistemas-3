import { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import { Header } from '../../components'
import TableFilter from '../../components/TableFilter'
import { supabase } from '../../supabase/client'
import { Link } from 'react-router-dom'
import { contratoColumn } from '../../data/tableColumns'

export default function TableContratos() {
  const [contratos, setContratos] = useState([])
  const [query, setQuery] = useState('')

  const getAlquileres = async () => {
    try {

      let { data: operacion_contrato, error } = await supabase
        .from('operacion_contrato')
        .select("*")

      if (error) throw error
      if (operacion_contrato) setContratos(operacion_contrato)
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
      || value.propietario.toString().toLowerCase().includes(query)
      || value.tipoOp.toLowerCase().includes(query)
      || value.contrato.toLowerCase().includes(query)
      || value.inicioContrato.toLowerCase().includes(query))
    )
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="Contratos" title="Listar contratos" />
      <section className='flex justify-between items-center'>

        <TableFilter props={query} setProps={setQuery} />
        {/* <Link to='/addCliente' className="p-4 self-end bg-blue-400 mb-2 shadow-md font-bold rounded-xl">+ Generar contrato</Link> */}
      </section>
      <DataTable row={search(contratos)} column={contratoColumn} />
    </div>
  )
}
