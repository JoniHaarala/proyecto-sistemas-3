import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable';
import Header from '../../components/Head';
import TableFilter from '../../components/TableFilter';
import { pagosColumn } from '../../data/tableColumns';


export default function Pagos() {

  const [pagos, setPagos] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Pagos/ListarPagos')
      .then((res) => res.json())
      .then((data) => { setPagos(data.pagos) })
  }, [])
  
  const search = (data) => {
    return data.filter((value) => (value.cbu.toLowerCase().includes(query)
      || value.nombreBanco.toLowerCase().includes(query)
      || value.numCuenta.toString().toLowerCase().includes(query)
      || value.tipoPago.toLowerCase().includes(query)
      || value.fechaPago.toLowerCase().includes(query))
    )
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="" title="Pagos realizados" />

      <TableFilter props={query} setProps={setQuery} />

      <DataTable row={search(pagos)} column={pagosColumn} />

    </div>
  )

}
