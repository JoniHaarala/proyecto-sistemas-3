import { React, useEffect, useState } from 'react'
import { proveedorColumn } from '../../data/tableColumns';
import DataTable from '../../components/DataTable';
import Header from '../../components/Head';
import TableFilter from '../../components/TableFilter';

function Proveedor() {
    const [prov, setProv] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        fetch('https://www.inmoapi.somee.com/api/Proveedor/ListarProveedor')
            .then((res) => res.json())
            .then((data) => { setProv(data.proveedores) })
    }, [])

    const search = (data) => {
        return data.filter((value) => (value.cuit.toLowerCase().includes(query)
            || value.nombre.toLowerCase().includes(query)
            || value.telefono.toLowerCase().includes(query)
            || value.correo.toLowerCase().includes(query)
            || value.direccion.toLowerCase().includes(query)
            || value.pais.toLowerCase().includes(query)
            || value.codPostal.toString().toLowerCase().includes(query))
        )
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">

            <Header category="" title="Proveedores" />

            <TableFilter props={query} setProps={setQuery} />

            <DataTable row={search(prov)} column={proveedorColumn} />

        </div>
    )
}

export default Proveedor