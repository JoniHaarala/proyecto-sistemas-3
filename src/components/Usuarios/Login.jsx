import React, { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <form>
                <section>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        placeholder='Nombre o usuario...'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </section>
                <section>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        placeholder='Contraseña...'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </section>
            </form>
        </div>
    )
}
