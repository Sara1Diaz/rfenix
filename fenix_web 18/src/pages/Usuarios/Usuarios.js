import React, { useState, useEffect } from 'react';
import './Usuarios.css';

const NavBar = ({ onLogout }) => (
    <nav className="navbar">
        <div className="brand-logo">
            Sport<span className="brand-highlight">Line</span>
        </div>
        <ul>
            <li><a href="/Agregar">Agregar nuevo usuario</a></li>
            <li><a href="/Editar">Editar información del usuario</a></li>
            <li><a href="/Indexjefe">Menú</a></li>
        </ul>
        <button onClick={onLogout} className="logout-button">Cerrar Sesión</button>
    </nav>
);

const UserTable = ({ users, onTogglePassword }) => (
    <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Id Usuario</th>
                    <th>Tipo Documento</th>
                    <th>Número de Documento</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Teléfono de Contacto</th>
                    <th>Email</th>
                    <th>Cod rol</th>
                    <th>Clave</th>
                    <th>Estado de Usuario</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {users.map(usuario => (
                    <tr key={usuario.Id_usuario}>
                        <td>{usuario.Id_usuario}</td>
                        <td>{usuario.PK_fk_Id_tdoc}</td>
                        <td>{usuario.Numero_documento}</td>
                        <td>{usuario.Primer_nombre}</td>
                        <td>{usuario.Segundo_nombre}</td>
                        <td>{usuario.Primer_apellido}</td>
                        <td>{usuario.Segundo_apellido}</td>
                        <td>{usuario.Telefono_contacto}</td>
                        <td>{usuario.Email}</td>
                        <td>{usuario.Pk_fk_Id_Cod_rol}</td>
                        <td>
                            {usuario.showPassword ? usuario.Clave : '••••••••'}
                        </td>
                        <td>{usuario.Estado_usuario}</td>
                        <td>
                            <button className="toggle-button" onClick={() => onTogglePassword(usuario.Id_usuario)}>
                                {usuario.showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchDocument, setSearchDocument] = useState('');
    const [searchFirstName, setSearchFirstName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3030/usuario');
                if (!response.ok) throw new Error('Error al obtener datos del API');
                const data = await response.json();
                const updatedUsers = data.map(user => ({
                    ...user,
                    showPassword: false
                }));
                setUsuarios(updatedUsers);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        window.location.href = '/';
    };

    const togglePasswordVisibility = id => {
        setUsuarios(prevUsers =>
            prevUsers.map(user =>
                user.Id_usuario === id ? { ...user, showPassword: !user.showPassword } : user
            )
        );
    };

    const filteredUsers = usuarios.filter(usuario => {
        const documentMatch = usuario.Numero_documento.toString().includes(searchDocument);
        const firstNameMatch = usuario.Primer_nombre.toLowerCase().includes(searchFirstName.toLowerCase());
        return documentMatch && firstNameMatch;
    });

    return (
        <div>
            <NavBar onLogout={handleLogout} />
            <div className="container">
                <main>
                    <h1>Usuarios</h1>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Buscar por Documento"
                            value={searchDocument}
                            onChange={e => setSearchDocument(e.target.value)}
                            className="search-input"
                        />
                        <input
                            type="text"
                            placeholder="Buscar por Primer Nombre"
                            value={searchFirstName}
                            onChange={e => setSearchFirstName(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    {error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <UserTable users={filteredUsers} onTogglePassword={togglePasswordVisibility} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default Usuarios;
