import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Agregar.css';

function Agregar() {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        PK_fk_Id_tdoc: '',
        Numero_documento: '',
        Primer_nombre: '',
        Segundo_nombre: '',
        Primer_apellido: '',
        Segundo_apellido: '',
        Telefono_contacto: '',
        Email: '',
        Pk_fk_Id_Cod_rol: '',
        Clave: '',
        Estado_usuario: ''
    });
    
    const [isValid, setIsValid] = useState({
        PK_fk_Id_tdoc: false,
        Numero_documento: false,
        Primer_nombre: false,
        Segundo_nombre: false,
        Primer_apellido: false,
        Segundo_apellido: false,
        Telefono_contacto: false,
        Email: false,
        Pk_fk_Id_Cod_rol: false,
        Clave: false,
        Estado_usuario: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({
            ...nuevoUsuario,
            [name]: value
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

            // Validar campos vacíos
    for (const key in nuevoUsuario) {
        if (nuevoUsuario[key].trim() === '') {
            alert(`El campo ${key.replace(/_/g, ' ')} no puede estar vacío.`);
            return;
        }
    }
        // Validaciones
        if (nuevoUsuario.PK_fk_Id_tdoc.length !== 2) {
            alert('El tipo de documento debe tener exactamente dos letras.');
            return;
        }
        if (!/^\d+$/.test(nuevoUsuario.Numero_documento) || nuevoUsuario.Numero_documento.length !== 10) {
            alert('El número de documento debe ser un número de 10 dígitos.');
            return;
        }
        if (!/^[a-zA-Z-ñ]+$/.test(nuevoUsuario.Primer_nombre) || !/^[a-zA-Z]+$/.test(nuevoUsuario.Segundo_nombre) || !/^[a-zA-Z]+$/.test(nuevoUsuario.Primer_apellido) || !/^[a-zA-Z]+$/.test(nuevoUsuario.Segundo_apellido)) {
            alert('Los nombres y apellidos solo pueden contener letras.');
            return;
        }
        if (!/^\d{10}$/.test(nuevoUsuario.Telefono_contacto)) {
            alert('El teléfono debe ser un número de 10 dígitos.');
            return;
        }
        if (!/^\d+$/.test(nuevoUsuario.Pk_fk_Id_Cod_rol)) {
            alert('El rol debe ser un número.');
            return;
        }
        if (!/^[01]$/.test(nuevoUsuario.Estado_usuario)) {
            alert('El estado de usuario debe ser 0 o 1.');
            return;
        }
        if (!/^[\w-.-]+@gmail\.com$/.test(nuevoUsuario.Email)) {
            alert('El correo electrónico debe ser una dirección de Gmail válida.');
            return;
        }
        if (nuevoUsuario.Clave.length > 8) {
            alert('La contraseña no puede tener más de 8 caracteres.');
            return;
        }
        



        fetch('http://localhost:3030/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoUsuario)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear un nuevo usuario');
            }
            setNuevoUsuario({
                PK_fk_Id_tdoc: '',
                Numero_documento: '',
                Primer_nombre: '',
                Segundo_nombre: '',
                Primer_apellido: '',
                Segundo_apellido: '',
                Telefono_contacto: '',
                Email: '',
                Pk_fk_Id_Cod_rol: '',
                Clave: '',
                Estado_usuario: ''
            });
            alert('Usuario creado exitosamente');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al crear un nuevo usuario');
        });
    };

    const handleValidation = (e) => {
        const { name, value } = e.target;
        // Validar el campo según su nombre
        switch (name) {
            case 'PK_fk_Id_tdoc':
                // Validar el tipo de documento
                setIsValid({ ...isValid, PK_fk_Id_tdoc: value.length === 2 });
                break;
            case 'Numero_documento':
                // Validar el número de documento
                setIsValid({ ...isValid, Numero_documento: /^\d{10}$/.test(value) });
                break;
            case 'Primer_nombre':
                // Validar el primer nombre
                setIsValid({ ...isValid, Primer_nombre: /^[a-zA-Z-ñ]+$/.test(value) });
                break;
            // Agregar más validaciones para los otros campos aquí
            default:
                break;
        }
    };


    return (
        <div className="page-container">
            <nav className="navbar">
                <div className="brand-logo">
                    Sport<span className="brand-highlight">Line</span>
                </div>
                <ul>
                    <li><a href="/Editar">Editar usuarios</a></li>
                    <li><a href="/indexjefe">Menu</a></li>
                    <li><a href="/Usuarios">Usuarios</a></li>
                </ul>
                <Link to="/"><button className="logout-button">Cerrar Sesión</button></Link>
            </nav>
            <main>
    
    <form onSubmit={handleSubmit} className="form-container">
        <div className="form-column">
            <label htmlFor="PK_fk_Id_tdoc">Tipo de Documento:</label>
            <input type="text" name="PK_fk_Id_tdoc" value={nuevoUsuario.PK_fk_Id_tdoc} onChange={handleChange} />

            <label htmlFor="Primer_nombre">Primer Nombre:</label>
            <input type="text" name="Primer_nombre" value={nuevoUsuario.Primer_nombre} onChange={handleChange} />

            <label htmlFor="Primer_apellido">Primer Apellido:</label>
            <input type="text" name="Primer_apellido" value={nuevoUsuario.Primer_apellido} onChange={handleChange} />

            <label htmlFor="Telefono_contacto">Teléfono de Contacto:</label>
            <input type="text" name="Telefono_contacto" value={nuevoUsuario.Telefono_contacto} onChange={handleChange} />

            <label htmlFor="Pk_fk_Id_Cod_rol">Rol:</label>
            <input type="text" name="Pk_fk_Id_Cod_rol" value={nuevoUsuario.Pk_fk_Id_Cod_rol} onChange={handleChange} />

            <label htmlFor="Estado_usuario">Estado de Usuario:</label>
            <input type="text" name="Estado_usuario" value={nuevoUsuario.Estado_usuario} onChange={handleChange} />
        </div>

        <div className="form-column">
            <label htmlFor="Numero_documento">Número de Documento:</label>
            <input type="text" name="Numero_documento" value={nuevoUsuario.Numero_documento} onChange={handleChange} />

            <label htmlFor="Segundo_nombre">Segundo Nombre:</label>
            <input type="text" name="Segundo_nombre" value={nuevoUsuario.Segundo_nombre} onChange={handleChange} />

            <label htmlFor="Segundo_apellido">Segundo Apellido:</label>
            <input type="text" name="Segundo_apellido" value={nuevoUsuario.Segundo_apellido} onChange={handleChange} />

            <label htmlFor="Email">Email:</label>
            <input type="email" name="Email" value={nuevoUsuario.Email} onChange={handleChange} />

            <label htmlFor="Clave">Clave:</label>
            <input type="password" name="Clave" value={nuevoUsuario.Clave} onChange={handleChange} />
        </div>

        <button type="submit">Crear Usuario</button>
    </form>
</main>
            </div>

    );
}

export default Agregar;