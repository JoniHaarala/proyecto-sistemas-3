import React from 'react'
import {FormAddProveedor, Header} from '../../components'

function CreateProv() {
  return (
    <div className="flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
        
        <Header category="Proveedor" title="Agregar Proveedor" />
        
        <FormAddProveedor />
    </div>
  )
}

export default CreateProv