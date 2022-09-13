import React, { useEffect } from 'react'
import imgDb from '../data/dashboard-template.jpg'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()
  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate('/login')
    }
  }, [navigate])
  return (
    <div>
      <img src={imgDb} alt="dashboard" />
    </div>

  )
}

export default Home