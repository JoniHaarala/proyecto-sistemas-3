import { React } from 'react'
import EditFactura from '../../components/facturacion/editFactura'
import Header from '../../components/Head'
import { useParams } from 'react-router-dom'


export default function EditFact() {

  const { factid } = useParams();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="facturas" title={`Editar factura num: ${factid}`} />

      <EditFactura idFactura={factid} />

    </div>

  )
}
