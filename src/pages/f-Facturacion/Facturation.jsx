import { React, useEffect, useState } from 'react'
import DataTable from '../../components/DataTable';
import Header from '../../components/Head';
import TableFilter from '../../components/TableFilter';
import { facturaColumn } from '../../data/tableColumns';
import { supabase } from '../../supabase/client';

export default function Facturation() {

  const [factura, setfactura] = useState([])
  const [query, setQuery] = useState('')

  const getFacturas = async () => {
    try {

      let { data: factura, error } = await supabase
        .from('factura')
        .select('*')

      if (error) throw error;
      if (factura) setfactura(factura);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getFacturas()
  }, [])

  const search = (data) => {
    return data.filter((value) => (
      value.proveedor.toLowerCase().includes(query)
      || value.estado.toLowerCase().includes(query)
      || value.tipo.toLowerCase().includes(query)
      || value.sucursal.toLowerCase().includes(query)
      || value.fechaRegistro.toLowerCase().includes(query)
      || value.fechaVencimiento.toLowerCase().includes(query))
    )
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

      <Header category="" title="Facturas" />

      <TableFilter props={query} setProps={setQuery} />

      <DataTable row={search(factura)} column={facturaColumn} />

    </div>
  );
}
