import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable';
import Header from '../../components/Head';
import TableFilter from '../../components/TableFilter';
import { pagosColumn } from '../../data/tableColumns';
import { supabase } from '../../supabase/client';

export default function Pagos() {

  const [dataPago, setDataPago] = useState([])
  const [query, setQuery] = useState('')

  const getPagos = async () => {
    try {

      let { data: pagos, error } = await supabase
        .from('pagos')
        .select('*')
      if (error) throw error;
      if (pagos) setDataPago(pagos);
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPagos();
  }, [])

  const search = (data) => {
    return data.filter((value) => (value.cuenta.toLowerCase().includes(query)
      || value.nombreBanco.toLowerCase().includes(query)
      || value.tipoPago.toLowerCase().includes(query)
      || value.fechaPago.toLowerCase().includes(query))
    )
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="" title="Pagos realizados" />

      <TableFilter props={query} setProps={setQuery} />

      <DataTable row={search(dataPago)} column={pagosColumn} />

    </div>
  )

}
