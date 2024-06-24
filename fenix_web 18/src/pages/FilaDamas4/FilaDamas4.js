import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './FilaDamas4.css'; // Asegúrate de tener este archivo CSS con estilos correspondientes

const SizeButton = ({ size, selectedSize, handleSizeSelect }) => {
  return (
    <button
      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
      onClick={() => handleSizeSelect(size)}
    >
      {size}
    </button>
  );
};

const FilaDamas4 = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState(250.00); // Precio inicial

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setPrice(59.99); // Precio cuando se selecciona una talla
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div className="container">
      <h1 className="title">Fila Damas</h1>
      <div className="content">
        <div className="carousel-container">
          <Link to="/filadamasb" className="back-link">Volver atrás</Link>
          <Carousel 
            showArrows={true} 
            dynamicHeight={true} 
            infiniteLoop={true} 
            useKeyboardArrows={true} 
            autoPlay={true} 
            interval={3000}
            showThumbs={false}
          >
            <div>
              <img src="../img/damas/fila/Fila Ray Tracer/2.png" alt="Imagen 1" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/fila/Fila Ray Tracer/1.png" alt="Imagen 2" className="carousel-image" />
            </div>
            <div>
              <img src="../img/damas/fila/Fila Ray Tracer/3.png" alt="Imagen 3" className="carousel-image" />
            </div>
          </Carousel>
        </div>
        <div className="details">
          <h2 className="product-title">Fila Ray Tracer</h2>
          <p><strong>Precio:</strong> ${price.toFixed(2)}</p>
          <div className="size-container">
            <p><strong>Tallas disponibles:</strong></p>
            <div className="size-buttons">
              {['36', '37', '38', '39', '40'].map(size => (
                <SizeButton
                  key={size}
                  size={size}
                  selectedSize={selectedSize}
                  handleSizeSelect={handleSizeSelect}
                />
              ))}
            </div>
          </div>
          <div className="quantity-container">
            <p><strong>Cantidad:</strong></p>{quantity}

          </div>
          <div className="description">
            <h3 className="description-title">Descripción</h3>
            <p className="description-content">Zapatillas deportivas super comodas y a la moda para tu dia a dia</p>
          </div>
          <div className="specifications">
            <h3 className="specifications-title">Especificaciones</h3>
            <ul className="specifications-content">
              <li>Color: blancas con azul</li>
              <li>Género: Mujer</li>
              <li>Material: Sintético</li>
              <li>Suela: Sintética</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilaDamas4;
