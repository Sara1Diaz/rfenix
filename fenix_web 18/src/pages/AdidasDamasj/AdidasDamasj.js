import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdidasDamasj.css';

function AdidasDamasj() {
    const [productos, setProductos] = useState([]);

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

    const calcularTotalCantidadDisponible = () => {
        return productos.reduce((total, producto) => total + parseInt(producto.Cantidad_disponible_producto, 10), 0);
    };

    // Función para exportar a Excel con confirmación
    const exportToExcel = () => {
        const confirmExport = window.confirm("¿Está seguro que desea exportar los datos a Excel?");
        if (confirmExport) {
            const worksheet = XLSX.utils.json_to_sheet(productos.map(producto => ({
                ID: producto.Id_producto,
                Modelo: producto.Modelo_producto,
                Tipo: producto.Tipo_producto,
                Color: producto.Color_producto,
                Precio: producto.Precio_producto,
                "Talla Disponible": producto.Talla_disponible_producto,
                "Cantidad Disponible": producto.Cantidad_disponible_producto
            })));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
            saveAs(data, 'ProductosAdidasDamas.xlsx');
        }
    };

    // Función para exportar a PDF con confirmación
    const exportToPDF = () => {
        const confirmExport = window.confirm("¿Está seguro que desea exportar los datos a PDF?");
        if (confirmExport) {
            const doc = new jsPDF();

            doc.text("Productos Adidas Damas", 20, 10);

            const tableColumn = ["ID", "Modelo", "Tipo", "Color", "Precio", "Talla Disponible", "Cantidad Disponible"];
            const tableRows = [];

            productos.forEach(producto => {
                const productoData = [
                    producto.Id_producto,
                    producto.Modelo_producto,
                    producto.Tipo_producto,
                    producto.Color_producto,
                    producto.Precio_producto,
                    producto.Talla_disponible_producto,
                    producto.Cantidad_disponible_producto
                ];
                tableRows.push(productoData);
            });

            tableRows.push(["", "", "", "", "", "Total", calcularTotalCantidadDisponible()]);

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 20,
            });

            doc.save('ProductosAdidasDamas.pdf');
        }
    };

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    return (
        <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/IndexJefe" className="nav-link active btn btn-dark" aria-current="page">Volver atrás</Link>
                </li>
                <li className="nav-item custom-margin">
                    <button id="export-button" className="btn btn-dark" onClick={exportToExcel}>Exportar a Excel</button>
                </li>
                <li className="nav-item custom-margin">
                    <button id="export-pdf-button" className="btn btn-dark" onClick={exportToPDF}>Exportar a PDF</button>
                </li>
            </ul>
            <title>Adidas Damas</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
            <link rel="stylesheet" href="../css/inventario.css" />
            <link rel="stylesheet" href="../php_productos/csss/estilo.css" />
            <div className="contenedor">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                    </li>
                </ul>
                <h2>Adidas Damas</h2>
                <div className="barra__buscador"></div>
            </div>
            <br /><br />

            {/* Tabla de productos */}
            <div className="col-md-15 contenedor-tarjetas d-flex align-items-center justify-content-center table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Color</th>
                            <th>Precio</th>
                            <th>Talla Disponible</th>
                            <th>Cantidad Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.Id_producto}>
                                <td>{producto.Id_producto}</td>
                                <td>{producto.Modelo_producto}</td>
                                <td>{producto.Tipo_producto}</td>
                                <td>{producto.Color_producto}</td>
                                <td>{producto.Precio_producto}</td>
                                <td>{producto.Talla_disponible_producto}</td>
                                <td>{producto.Cantidad_disponible_producto}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6" className="text-end"><strong>Total:</strong></td>
                            <td>{calcularTotalCantidadDisponible()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdidasDamasj;
