import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Editar.css'; // Importa tus estilos CSS aquí

function Editar() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [camposEditables, setCamposEditables] = useState({
        Numero_documento: true,
        Primer_nombre: true,
        Segundo_nombre: true,
        Primer_apellido: true,
        Segundo_apellido: true,
        Telefono_contacto: true,
        Email: true,
        Clave: true,
        Estado_usuario: true
    });

    useEffect(() => {
        fetch('http://localhost:3030/usuario')
            .then(response => response.json())
            .then(data => {
                setUsuarios(data);
            })
            .catch(error => {
                console.error('Error al obtener datos del API:', error);
            });
    }, []);

    const handleEditarUsuario = (usuarioId) => {
        const usuario = usuarios.find(usuario => usuario.Id_usuario === usuarioId);
        setUsuarioSeleccionado(usuario);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioSeleccionado({
            ...usuarioSeleccionado,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3030/usuario/${usuarioSeleccionado.Id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioSeleccionado)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }
            setUsuarios(prevUsuarios => prevUsuarios.map(usuario => usuario.Id_usuario === usuarioSeleccionado.Id_usuario ? usuarioSeleccionado : usuario));
            alert('Usuario actualizado exitosamente');
            setUsuarioSeleccionado(null);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar el usuario');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="brand-logo">
                    Sport<span className="brand-highlight">Line</span>
                </div>
                <ul>
                    <li><a href="/Usuarios">Usuarios</a></li>
                    <li><a href="/IndexJefe">Menu</a></li>
                    <li><a href="/Agregar">Agregar usuarios</a></li>
                </ul>
                <Link to="/"><button className="logout-button">Cerrar Sesión</button></Link>
            </nav>

            <div className="container">
                <main>
                    <h1>Usuarios</h1>
                    <div className="table-container">
                        <table className="centered-table">
                            <thead>
                                <tr>
                                    <th>Id Usuario</th>
                                    <th>Número de Documento</th>
                                    <th>Primer Nombre</th>
                                    <th>Segundo Nombre</th>
                                    <th>Primer Apellido</th>
                                    <th>Segundo Apellido</th>
                                    <th>Teléfono de Contacto</th>
                                    <th>Email</th>
                                    <th>Clave</th>
                                    <th>Estado Usuario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.Id_usuario}>
                                        <td>{usuario.Id_usuario}</td>
                                        <td>{usuario.Numero_documento}</td>
                                        <td>{usuario.Primer_nombre}</td>
                                        <td>{usuario.Segundo_nombre}</td>
                                        <td>{usuario.Primer_apellido}</td>
                                        <td>{usuario.Segundo_apellido}</td>
                                        <td>{usuario.Telefono_contacto}</td>
                                        <td>{usuario.Email}</td>
                                        <td>{usuario.Clave}</td>
                                        <td>{usuario.Estado_usuario}</td>
                                        <td>
                                            <button className="editar-btn" onClick={() => handleEditarUsuario(usuario.Id_usuario)}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {usuarioSeleccionado && (
                        <div className="editar-form-container">
                            <div className="editar-form">
                                <h2>Editar Usuario</h2>
                                <form onSubmit={handleSubmit}>
                                    {Object.keys(camposEditables).map((campo, index) => (
                                        camposEditables[campo] &&
                                        <div key={index}>
                                            <label>{campo.replace('_', ' ')}:</label>
                                            <input
                                                type="text"
                                                name={campo}
                                                value={usuarioSeleccionado[campo]}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                    <div className="button-container">
                                        <button type="submit">Guardar Cambios</button>
                                        <button type="button" className="cancel-btn" onClick={() => setUsuarioSeleccionado(null)}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Editar;
