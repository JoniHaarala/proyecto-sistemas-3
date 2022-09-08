import { React, useEffect, useState } from 'react'
import { TablaProveedor } from '../../components'

function Proveedor() {
    const [prov, setProv] = useState([])
    useEffect(() => {
        fetch('https://www.inmoapi.somee.com/api/Proveedor/ListarProveedor')
            .then((res) => res.json())
            .then((data) => { setProv(data.proveedores) })
    }, [])

    return (
        <TablaProveedor data={prov} />
    )
}

export default Proveedor