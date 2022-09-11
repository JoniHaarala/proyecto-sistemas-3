import { useState, useEffect } from 'react'

export const GetPropiedades = () => {
  const [PropData, setPropData] = useState([])
  useEffect(() => {
    fetch('')
      .then((req) => req.json())
      .then((res) => { setPropData(res.propiedades) })
  }, [])
  return PropData;
}

export const SetPropiedades = () => {
  const [Client, setClient] = useState([])
  useEffect(() => {
    fetch('')
      .then((req) => req.json())
      .then((res) => { setClient(res.users) })
  }, [])
  return Client;
}

export const AddPropiedades = () => {
  const [Alquiler, setAlquiler] = useState([])
  useEffect(() => {
    fetch('')
      .then((req) => req.json())
      .then((res) => { setAlquiler(res.alquiler) })
  }, [])
  return Alquiler;
}

export const DelPropiedades = () => {
  const [TempAlquiler, setTempAlquiler] = useState([])
  useEffect(() => {
    fetch('')
      .then((req) => req.json())
      .then((res) => { setTempAlquiler(res.alqTemp) })
  }, [])
  return TempAlquiler;
}
