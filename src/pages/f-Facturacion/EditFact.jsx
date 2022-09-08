import { React, useState, useEffect } from 'react'
import {FormEditFactura} from '../../components'
import Header from '../../components/Head'

export default function EditFact() {

  const [dataFactura, setDataFactura] = useState([])
  const [IdFactura, setIdFactura] = useState(0)
  const [idSearch, setIdSearch] = useState(0)

  useEffect(() => {
    fetch(`https://www.inmoapi.somee.com/api/Factura/ListarIdFactura`)
      .then((res) => res.json())
      .then((data) => { setDataFactura(data.idfacturas) })
  }, [])

  const handleIdChange = (event) => {
    event.preventDefault();
    setIdFactura(event.target.value)
  }
  const handleIdSearch = (event) => {
    event.preventDefault();
    setIdSearch(IdFactura)
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      <Header category="facturas" title="Editar factura"/>

      <label>
        Seleccione una factura:
        <select
          value={IdFactura}
          onChange={handleIdChange}
          className="bg-gray-100 p-4 mx-3 rounded-lg shadow-md"
        >
          <option value={0}>Numero de factura</option>
          {dataFactura.map((item) => (
            <option key={item.idfactura} value={item.idfactura}>{item.idfactura}</option>
          ))}
        </select>
      </label>
      <input type="button" value='Buscar' onClick={handleIdSearch}/>
      {
        idSearch !== 0
          ?
          <FormEditFactura idFactura={idSearch} />
          :
          <></>
      }
    </div>

  )
}
