import React, { useState, useEffect } from 'react'
import { TablaPagos } from '../../components'


export default function Pagos() {

  const [pagos, setPagos] = useState([])
  useEffect(() => {
    fetch('https://www.inmoapi.somee.com/api/Pagos/ListarPagos')
      .then((res) => res.json())
      .then((data) => { setPagos(data.pagos) })
  }, [])
  console.log(pagos)
  return (
    <TablaPagos data={pagos} />
  )
}
