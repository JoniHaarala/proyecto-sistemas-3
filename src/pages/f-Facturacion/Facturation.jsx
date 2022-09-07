import { React, useEffect, useState } from 'react'
import TableFactura from '../../components/facturacion/TableFactura';


export default function Facturation() {

  const [factura, setfactura] = useState([])

  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Factura/ListarFacturas')
      .then((res) => res.json())
      .then((data) => { setfactura(data.facturas) })
  }, [])


  return (
    <TableFactura data={factura} />
  );
}
