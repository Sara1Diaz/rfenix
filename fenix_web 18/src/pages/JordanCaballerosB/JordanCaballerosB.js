import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './JordanCaballerosB.css'; // Importa el archivo CSS

function JordanCaballerosB() {
    const [productos, setProductos] = useState([]);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [nuevoProducto, setNuevoProducto] = useState({
        PK_fk_Id_marca_producto: 3,
        Modelo_producto: "",
        Tipo_producto: "",
        Color_producto: "",
        Precio_producto: "",
        Talla_disponible_producto: "",
        Cantidad_disponible_producto: ""
    });
    const [productoEditando, setProductoEditando] = useState({
        Id_producto: null,
        Modelo_producto: "",
        Tipo_producto: "",
        Color_producto: "",
        Precio_producto: "",
        Talla_disponible_producto: "",
        Cantidad_disponible_producto: ""
    });
    const [nuevoReporteSalida, setNuevoReporteSalida] = useState({
        PK_fk_numlocal_destino: "",
        Descripcion_salida: "",
        Cantidad_salida: ""
    });
    const [errores, setErrores] = useState({});
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioEdicion, setMostrarFormularioEdicion] = useState(false);
    const [mostrarFormularioSalida, setMostrarFormularioSalida] = useState(false);
    const [productoSalida, setProductoSalida] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await fetch('http://localhost:3030/producto');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProductos(data.productos);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoProducto({
            ...nuevoProducto,
            [name]: value
        });
    };

    const handleChangeReporteSalida = (event) => {
        const { name, value } = event.target;
        setNuevoReporteSalida({
            ...nuevoReporteSalida,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3030/producto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoProducto)
                });
                if (!response.ok) {
                    throw new Error('Error al agregar el producto');
                }
                setNuevoProducto({
                    PK_fk_Id_marca_producto: 3,
                    Modelo_producto: "",
                    Tipo_producto: "",
                    Color_producto: "",
                    Precio_producto: "",
                    Talla_disponible_producto: "",
                    Cantidad_disponible_producto: ""
                });
                fetchProductos();
                setMostrarFormulario(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEditarProducto = (producto) => {
        if (!producto.Habilitado) {
            alert('No se puede editar un producto deshabilitado.');
            return;
        }
        setProductoEditando(producto);
        setMostrarFormularioEdicion(true);
    };

    const handleActualizarProducto = async (event) => {
        event.preventDefault();
    
        // Validar que todos los campos requeridos estén llenos
        if (!productoEditando.Modelo_producto ||
            !productoEditando.Tipo_producto ||
            !productoEditando.Color_producto ||
            !productoEditando.Precio_producto ||
            !productoEditando.Talla_disponible_producto ||
            !productoEditando.Cantidad_disponible_producto) {
            
            alert('Por favor llene todos los campos para actualizar el producto.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3030/producto/${productoEditando.Id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoEditando)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            setProductoEditando({
                Id_producto: null,
                Modelo_producto: "",
                Tipo_producto: "",
                Color_producto: "",
                Precio_producto: "",
                Talla_disponible_producto: "",
                Cantidad_disponible_producto: ""
            });
            setMostrarFormularioEdicion(false);
            fetchProductos();
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleReporteSalida = (producto) => {
        if (!producto.Habilitado) {
            alert('No se puede generar un reporte de salida para un producto deshabilitado.');
            return;
        }
        setProductoSalida(producto);
        setMostrarFormularioSalida(true);
    };

    const handleSubmitReporteSalida = async (event) => {
        event.preventDefault();
        const fechaActual = new Date().toISOString();
        const cantidadSalida = parseInt(nuevoReporteSalida.Cantidad_salida);

        if (cantidadSalida > productoSalida.Cantidad_disponible_producto) {
            alert("La cantidad de salida no puede ser mayor que la cantidad disponible.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3030/reportesalida', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...nuevoReporteSalida,
                    Fecha_emision: fechaActual
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el reporte de salida');
            }

            const nuevaCantidadDisponible = productoSalida.Cantidad_disponible_producto - cantidadSalida;
            const responseUpdate = await fetch(`http://localhost:3030/producto/${productoSalida.Id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...productoSalida,
                    Cantidad_disponible_producto: nuevaCantidadDisponible
                })
            });

            if (!responseUpdate.ok) {
                throw new Error('Error al actualizar la cantidad del producto');
            }

            setNuevoReporteSalida({
                PK_fk_numlocal_destino: "",
                Descripcion_salida: "",
                Cantidad_salida: ""
            });
            setMostrarFormularioSalida(false);
            fetchProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!nuevoProducto.Modelo_producto) {
            formIsValid = false;
            errors["Modelo_producto"] = "Por favor ingrese el modelo del producto.";
        }

        if (!nuevoProducto.Tipo_producto) {
            formIsValid = false;
            errors["Tipo_producto"] = "Por favor seleccione el tipo del producto.";
        }

        if (!nuevoProducto.Color_producto) {
            formIsValid = false;
            errors["Color_producto"] = "Por favor ingrese el color del producto.";
        }

        if (!nuevoProducto.Precio_producto) {
            formIsValid = false;
            errors["Precio_producto"] = "Por favor ingrese el precio del producto.";
        }

        if (!nuevoProducto.Talla_disponible_producto) {
            formIsValid = false;
            errors["Talla_disponible_producto"] = "Por favor ingrese la talla disponible del producto.";
        }

        if (!nuevoProducto.Cantidad_disponible_producto) {
            formIsValid = false;
            errors["Cantidad_disponible_producto"] = "Por favor ingrese la cantidad disponible del producto.";
        }

        setErrores(errors);
        return formIsValid;
    };

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    const calcularTotalCantidadDisponible = () => {
        return productos.reduce((total, producto) => total + parseInt(producto.Cantidad_disponible_producto), 0);
    };

    const handleBuscar = (event) => {
        setTerminoBusqueda(event.target.value);
    };

    const productosFiltrados = productos.filter(producto => {
        return (
            producto.Modelo_producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.Tipo_producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.Color_producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.Precio_producto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.Talla_disponible_producto.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
            producto.Cantidad_disponible_producto.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
    });

    const handleHabilitarProducto = async (producto) => {
        const confirmarDeshabilitar = window.confirm(`¿Estás seguro que deseas ${producto.Habilitado ? 'deshabilitar' : 'habilitar'} el producto ${producto.Modelo_producto}?`);
        
        if (confirmarDeshabilitar) {
            try {
                const response = await fetch(`http://localhost:3030/producto/${producto.Id_producto}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...producto,
                        Habilitado: !producto.Habilitado
                    })
                });
                if (!response.ok) {
                    throw new Error('Error al habilitar/deshabilitar el producto');
                }
                // Actualizamos el estado local de productos después del cambio
                const updatedProductos = productos.map(p => p.Id_producto === producto.Id_producto ? { ...p, Habilitado: !p.Habilitado } : p);
                setProductos(updatedProductos);
            } catch (error) {
                console.error(error);
            }
        }
    };
    
    return (
        <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/IndexBodega" className="nav-link active btn btn-dark" aria-current="page">Volver atrás</Link>
                </li>
            </ul>
            
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />

            <div className="contenedor">
                <h2>Jordan Caballeros</h2>
                <div className="mb-3">
                    <label htmlFor="busqueda" className="form-label">Buscar por Modelo o Tipo:</label>
                    <input type="text" className="form-control" id="busqueda" value={terminoBusqueda} onChange={handleBuscar} />
                </div>
                <button onClick={toggleFormulario} className="btn btn-primary">{mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Nuevo Producto'}</button>
                {mostrarFormulario && (
                    <div>
                        <h3>Agregar Nuevo Producto</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Modelo_producto" className="form-label">Modelo del Producto:</label>
                                <input type="text" className="form-control" id="Modelo_producto" name="Modelo_producto" value={nuevoProducto.Modelo_producto} onChange={handleChange} />
                                <div className="text-danger">{errores["Modelo_producto"]}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Tipo_producto" className="form-label">Tipo de Producto:</label>
                                <select className="form-select" id="Tipo_producto" name="Tipo_producto" value={nuevoProducto.Tipo_producto} onChange={handleChange}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Deportivas">Deportivas</option>
                                    <option value="Clásicas">Clásicas</option>
                                    <option value="Casuales">Casuales</option>
                                </select>
                                <div className="text-danger">{errores["Tipo_producto"]}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Color_producto" className="form-label">Color del Producto:</label>
                                <input type="text" className="form-control" id="Color_producto" name="Color_producto" value={nuevoProducto.Color_producto} onChange={handleChange} />
                                <div className="text-danger">{errores["Color_producto"]}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Precio_producto" className="form-label">Precio del Producto:</label>
                                <input type="number" className="form-control" id="Precio_producto" name="Precio_producto" value={nuevoProducto.Precio_producto} onChange={handleChange} />
                                <div className="text-danger">{errores["Precio_producto"]}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Talla_disponible_producto" className="form-label">Talla Disponible del Producto:</label>
                                <input type="text" className="form-control" id="Talla_disponible_producto" name="Talla_disponible_producto" value={nuevoProducto.Talla_disponible_producto} onChange={handleChange} />
                                <div className="text-danger">{errores["Talla_disponible_producto"]}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Cantidad_disponible_producto" className="form-label">Cantidad Disponible del Producto:</label>
                                <input type="number" className="form-control" id="Cantidad_disponible_producto" name="Cantidad_disponible_producto" value={nuevoProducto.Cantidad_disponible_producto} onChange={handleChange} />
                                <div className="text-danger">{errores["Cantidad_disponible_producto"]}</div>
                            </div>
                            <button type="submit" className="btn btn-primary">Agregar Producto</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                        </form>
                    </div>
                )}

                <h3>Listado de Productos</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Precio</th>
                            <th>Talla</th>
                            <th>Cantidad Disponible</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(producto => (
                            <tr key={producto.Id_producto}>
                                <td>{producto.Modelo_producto}</td>
                                <td>{producto.Tipo_producto}</td>
                                <td>{producto.Color_producto}</td>
                                <td>{producto.Precio_producto}</td>
                                <td>{producto.Talla_disponible_producto}</td>
                                <td>{producto.Cantidad_disponible_producto}</td>
                                <td>
            <button onClick={() => handleEditarProducto(producto)} className="btn btn-primary me-2">Editar</button>
            <button onClick={() => handleReporteSalida(producto)} className="btn btn-danger">Generar Salida</button>
            <button onClick={() => handleHabilitarProducto(producto)} className={`btn ${producto.Habilitado ? 'btn-success' : 'btn-secondary'}`}>
                {producto.Habilitado ? 'Habilitado' : 'Deshabilitado'}
            </button>
        </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h4>Total Cantidad Disponible: {calcularTotalCantidadDisponible()}</h4>

                {mostrarFormularioEdicion && (
    <div>
        <h3>Editar Producto</h3>
        <form onSubmit={handleActualizarProducto}>
            <div className="mb-3">
                <label htmlFor="Modelo_producto_editar" className="form-label">Modelo del Producto:</label>
                <input type="text" className="form-control" id="Modelo_producto_editar" name="Modelo_producto" value={productoEditando.Modelo_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Modelo_producto: e.target.value })} />
            </div>
            <div className="mb-3">
                <label htmlFor="Tipo_producto_editar" className="form-label">Tipo de Producto:</label>
                <select className="form-select" id="Tipo_producto_editar" name="Tipo_producto" value={productoEditando.Tipo_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Tipo_producto: e.target.value })}>
                    <option value="">Seleccione una opción</option>
                    <option value="Deportivas">Deportivas</option>
                    <option value="Clásicas">Clásicas</option>
                    <option value="Casuales">Casuales</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="Color_producto_editar" className="form-label">Color del Producto:</label>
                <input type="text" className="form-control" id="Color_producto_editar" name="Color_producto" value={productoEditando.Color_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Color_producto: e.target.value })} />
            </div>
            <div className="mb-3">
                <label htmlFor="Precio_producto_editar" className="form-label">Precio del Producto:</label>
                <input type="number" className="form-control" id="Precio_producto_editar" name="Precio_producto" value={productoEditando.Precio_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Precio_producto: e.target.value })} />
            </div>
            <div className="mb-3">
                <label htmlFor="Talla_disponible_producto_editar" className="form-label">Talla Disponible del Producto:</label>
                <input type="text" className="form-control" id="Talla_disponible_producto_editar" name="Talla_disponible_producto" value={productoEditando.Talla_disponible_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Talla_disponible_producto: e.target.value })} />
            </div>
            <div className="mb-3">
                <label htmlFor="Cantidad_disponible_producto_editar" className="form-label">Cantidad Disponible del Producto:</label>
                <input type="number" className="form-control" id="Cantidad_disponible_producto_editar" name="Cantidad_disponible_producto" value={productoEditando.Cantidad_disponible_producto} onChange={(e) => setProductoEditando({ ...productoEditando, Cantidad_disponible_producto: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">Actualizar Producto</button>
            <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormularioEdicion(false)}>Cancelar</button>
        </form>
    </div>
)}


                {mostrarFormularioSalida && productoSalida && (
                    <div>
                        <h3>Generar Reporte de Salida</h3>
                        <form onSubmit={handleSubmitReporteSalida}>
                            <div className="mb-3">
                                <label htmlFor="PK_fk_numlocal_destino" className="form-label">Número Local Destino:</label>
                                <input type="text" className="form-control" id="PK_fk_numlocal_destino" name="PK_fk_numlocal_destino" value={nuevoReporteSalida.PK_fk_numlocal_destino} onChange={handleChangeReporteSalida} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Descripcion_salida" className="form-label">Descripción de la Salida:</label>
                                <input type="text" className="form-control" id="Descripcion_salida" name="Descripcion_salida" value={nuevoReporteSalida.Descripcion_salida} onChange={handleChangeReporteSalida} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Cantidad_salida" className="form-label">Cantidad de Salida:</label>
                                <input type="number" className="form-control" id="Cantidad_salida" name="Cantidad_salida" value={nuevoReporteSalida.Cantidad_salida} onChange={handleChangeReporteSalida} />
                            </div>
                            <button type="submit" className="btn btn-primary">Generar Reporte</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormularioSalida(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
                            {/* Tarjetas de productos */}
            <div className="col-md-15 contenedor-tarjetas d-flex align-items-center justify-content-center">
                <div className="col-md-10">
                    <div className="fila">
                        <div className="row">
                            {/* Tarjeta 1 */}
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                    <img src="../img/caballeros/Jordan/Tarjeta 1/lado 1.png"  className="card-img-top" alt="..." />
                                    <h5>Air Jordan 1 Retro High OG</h5>
                                    <p className="card-text"></p>
                                    <a href="/jordancaballeros1"  className="btn btn-primary">ver detalles</a>

                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 2 */}
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                    <img src="../img/caballeros/Jordan/Tarjeta 2/lado 1.png" className="card-img-top" alt="..." />
                                    <h5>Air Jordan 1 Mid</h5>
                                    <p className="card-text"></p>
                                    <a href="/jordancaballeros2"  className="btn btn-primary">ver detalles</a>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 3 */}
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                    <img src="../img/caballeros/Jordan/Tarjeta 3/lado 1.png"className="card-img-top" alt="..." />
                                    <h5>Air Jordan 1 Elevate High</h5>
                                    <p className="card-text"></p>
                                    <a href="/jordancaballeros3"  className="btn btn-primary">ver detalles</a>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta 4 */}
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <div className="card">
                                    <div className="card-body">
                                    <img src="../img/caballeros/Jordan/Tarjeta 4/lado 1.png" className="card-img-top" alt="..." />
                                    <h5>Air Jordan 1 Element</h5>
                                    <p className="card-text"></p>
                                    <a href="/jordancaballeros4"  className="btn btn-primary">ver detalles</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>

        
    );
}


export default JordanCaballerosB;
