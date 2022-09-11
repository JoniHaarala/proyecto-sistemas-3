import React from 'react'
import { Header, TablePropiedades } from '../../components'

export default function Propiedades() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl">
      
      <Header category={'Propiedades'} title={'Lista de Propiedades'} />
      
      <TablePropiedades />
    </div>
  )
}
