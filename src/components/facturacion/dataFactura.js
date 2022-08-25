import { useState, useEffect } from 'react'

function DataFactura() {

    const [factura, setfactura] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:5063/api/Factura/ListarFacturas')
            .then((res) => res.json())
            .then((data) => {
                let facturas = data.facturas
                setfactura(facturas)
            })

    }, [])
    return factura
}
export default DataFactura;