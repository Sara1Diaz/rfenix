import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { jefeCredenciales, bodeguerosCredenciales } from './credenciales'; // Importa las credenciales simuladas

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === jefeCredenciales.username && password === jefeCredenciales.password) {
            window.location.href = "/Indexjefe";
        } else if (bodeguerosCredenciales.some(credencial => credencial.username === username && credencial.password === password)) {
            window.location.href = "/IndexBodega";
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <h1>Iniciar sesión</h1>
                <div className="input-box">
                    <input type="number" placeholder='Documento' value={username} onChange={(e) => setUsername(e.target.value)} required min="0" />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className="icon" />
                </div>

                <button type="submit">Iniciar sesión</button>
                <Link to="/" className="return-link">REGRESAR</Link>
            </form>
        </div>
    );
};

export default Login;
