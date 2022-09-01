import { useEffect, useState } from 'react'


export default function IdFactura(value, click) {

  const [id, setId] = useState([])
  useEffect(() => {
    fetch('http://localhost:5063/api/Factura/ListarIdFactura')
      .then((res) => res.json())
      .then((data) => { setId(data.idfacturas) })
  }, [])

  return (
    <>
      <label>
        Seleccione la factura a pagar:
      </label>
      <select
        value={value}
        onChange={click}
        className="bg-gray-100 p-4 mx-3 rounded-lg col-span-4"
      >
        <option value={null}>Seleccione una factura</option>
        {id.map((item) => (
          <option value={item.idfactura}>{item.idfactura}</option>
        ))}
        {/* <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option value="coconut">Coconut</option>
        <option value="mango">Mango</option> */}
      </select>
    </>
  )

}
