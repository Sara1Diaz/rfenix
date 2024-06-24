import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RecuperarContraseña from './pages/Recuperar/Recuperar';
import Usuarios from './pages/Usuarios/Usuarios';
import Agregar from './pages/Agregar/Agregar';  
import Editar from './pages/Editar/Editar';  
import IndexJefe from './pages/IndexJefe/IndexJefe';
import IndexBodega from './pages/IndexBodega/IndexBodega';
import AdidasDamasB from './pages/AdidasDamasB/AdidasDamasB';
import AdidasDamasj from './pages/AdidasDamasj/AdidasDamasj';
import NikeDamasB from './pages/NikeDamasB/NikeDamasB';
import NikeDamasj from './pages/NikeDamasj/NikeDamasj';
import FilaDamasB from './pages/FilaDamasB/FilaDamasB';
import FilaDamasj from './pages/FilaDamasj/FilaDamasj';
import JordanDamasB from './pages/JordanDamasB/JordandamasB';
import JordanDamasj from './pages/JordanDamasj/JordanDamasj';
import AdidasCaballerosB from './pages/AdidasCaballerosB/AdidasCaballerosB';
import AdidasCaballerosj from './pages/AdidasCaballerosj/AdidasCaballerosj';
import NikeCaballerosB from './pages/NikeCaballerosB/NikeCaballerosB';
import NikeCaballerosj from './pages/NikeCaballerosj/NikeCaballerosj';
import FilaCaballerosB from './pages/FilaCaballerosB/FilaCaballerosB';
import FilaCaballerosj from './pages/FilaCaballerosj/FilaCaballerosj';
import JordanCaballerosB from './pages/JordanCaballerosB/JordanCaballerosB';
import JordanCaballerosj from './pages/JordanCaballerosj/JordanCaballerosj';
import AdidasDamas1  from './pages/AdidasDamas1/AdidasDamas1';
import Bodegas from './pages/Bodegas/Bodegas';  
import AdidasCaballeros1 from './pages/AdidasCaballeros1/AdidasCaballeros1';
import AdidasCaballeros2  from './pages/AdidasCaballeros2/AdidasCaballeros2';
import AdidasCaballeros3  from './pages/AdidasCaballeros3/AdidasCaballeros3';
import AdidasCaballeros4  from './pages/AdidasCaballeros4/AdidasCaballeros4';
import AdidasDamas2 from './pages/AdidasDamas2/AdidasDamas2';
import AdidasDamas3 from './pages/AdidasDamas3/AdidasDamas3';
import AdidasDamas4 from './pages/AdidasDamas4/AdidasDamas4';
import FilaCaballeros1 from './pages/FilaCaballeros1/FilaCaballeros1';
import FilaCaballeros2 from './pages/FilaCaballeros2/FilaCaballeros2';
import FilaCaballeros3 from './pages/FilaCaballeros3/FilaCaballeros3';
import FilaCaballeros4 from './pages/FilaCaballeros4/FilaCaballeros4';
import FilaDamas1 from './pages/FilaDamas1/FilaDamas1';
import FilaDamas2 from './pages/FilaDamas2/FilaDamas2';
import FilaDamas3 from './pages/FilaDamas3/FilaDamas3';
import FilaDamas4 from './pages/FilaDamas4/FilaDamas4';
import JordanCaballeros1 from './pages/JordanCaballeros1/JordanCaballeros1';
import JordanCaballeros2 from './pages/JordanCaballeros2/JordanCaballeros2';
import JordanCaballeros3 from './pages/JordanCaballeros3/JordanCaballeros3';
import JordanCaballeros4 from './pages/JordanCaballeros4/JordanCaballeros4';
import JordanDamas1 from './pages/JordanDamas1/JordanDamas1';
import JordanDamas2 from './pages/JordanDamas2/JordanDamas2';
import JordanDamas3 from './pages/JordanDamas3/JordanDamas3';
import JordanDamas4 from './pages/JordanDamas4/JordanDamas4';
import NikeCaballeros1 from './pages/NikeCaballeros1/NikeCaballeros1';
import NikeCaballeros2 from './pages/NikeCaballeros2/NikeCaballeros2';
import NikeCaballeros3 from './pages/NikeCaballeros3/NikeCaballeros3';
import NikeCaballeros4 from './pages/NikeCaballeros4/NikeCaballeros4';
import NikeDamas1 from './pages/NikeDamas1/NikeDamas1.js';
import NikeDamas2 from './pages/NikeDamas2/NikeDamas2';
import NikeDamas3 from './pages/NikeDamas3/NikeDamas3';
import NikeDamas4 from './pages/NikeDamas4/NikeDamas4';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recuperar" element={<RecuperarContraseña />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/agregar" element={<Agregar />} />
                <Route path="/editar" element={<Editar />} />
                <Route path="/indexjefe" element={<IndexJefe />} /> 
                <Route path="/indexBodega" element={<IndexBodega />} /> 
                <Route path="/adidasdamasb" element={<AdidasDamasB />} />
                <Route path="/adidasdamasj" element={<AdidasDamasj />} />
                <Route path="/nikedamasb" element={<NikeDamasB />} />
                <Route path="/nikedamasj" element={<NikeDamasj />} />
                <Route path="/filadamasb" element={<FilaDamasB />} />
                <Route path="/filadamasj" element={<FilaDamasj />} />
                <Route path="/jordandamasb" element={<JordanDamasB/>} />
                <Route path="/jordandamasj" element={<JordanDamasj/>} />
                <Route path="/adidascaballerosb" element={<AdidasCaballerosB />} />
                <Route path="/adidascaballerosj" element={<AdidasCaballerosj />} />
                <Route path="/nikecaballerosb" element={<NikeCaballerosB />} />
                <Route path="/nikecaballerosj" element={<NikeCaballerosj />} />
                <Route path="/filacaballerosb" element={<FilaCaballerosB />} />
                <Route path="/filacaballerosj" element={<FilaCaballerosj />} />
                <Route path="/jordancaballerosb" element={<JordanCaballerosB/>} />
                <Route path="/jordancaballerosj" element={<JordanCaballerosj/>} />
                <Route path="/adidasdamas1" element={<AdidasDamas1 />} />
                <Route path="/bodegas" element={<Bodegas/>} />
                <Route path="/AdidasCaballeros1" element={<AdidasCaballeros1/>} />
                <Route path="/AdidasCaballeros2" element={<AdidasCaballeros2/>} />
                <Route path="/AdidasCaballeros3" element={<AdidasCaballeros3/>} />
                <Route path="/AdidasCaballeros4" element={<AdidasCaballeros4/>} />
                <Route path="/adidasdamas2" element={<AdidasDamas2 />} />
                <Route path="/adidasdamas3" element={<AdidasDamas3 />} />
                <Route path="/adidasdamas4" element={<AdidasDamas4 />} />
                <Route path="/filacaballeros1" element={<FilaCaballeros1 />} />
                <Route path="/filacaballeros2" element={<FilaCaballeros2 />} />
                <Route path="/filacaballeros3" element={<FilaCaballeros3 />} />
                <Route path="/filacaballeros4" element={<FilaCaballeros4 />} />
                <Route path="/filadamas1" element={<FilaDamas1 />} />
                <Route path="/filadamas2" element={<FilaDamas2 />} />
                <Route path="/filadamas3" element={<FilaDamas3 />} />
                <Route path="/filadamas4" element={<FilaDamas4 />} />
                <Route path="/jordancaballeros1" element={<JordanCaballeros1/>} />
                <Route path="/jordancaballeros2" element={<JordanCaballeros2/>} />
                <Route path="/jordancaballeros3" element={<JordanCaballeros3/>} />
                <Route path="/jordancaballeros4" element={<JordanCaballeros4/>} />
                <Route path="/jordandamas1" element={<JordanDamas1/>} />
                <Route path="/jordandamas2" element={<JordanDamas2/>} />
                <Route path="/jordandamas3" element={<JordanDamas3/>} />
                <Route path="/jordandamas4" element={<JordanDamas4/>} />
                <Route path="/nikecaballeros1" element={<NikeCaballeros1 />} />
                <Route path="/nikecaballeros2" element={<NikeCaballeros2 />} />
                <Route path="/nikecaballeros3" element={<NikeCaballeros3 />} />
                <Route path="/nikecaballeros4" element={<NikeCaballeros4 />} />
                <Route path="/nikedamas1" element={<NikeDamas1 />} />
                <Route path="/nikedamas2" element={<NikeDamas2 />} />
                <Route path="/nikedamas3" element={<NikeDamas3 />} />
                <Route path="/nikedamas4" element={<NikeDamas4 />} />

            </Routes>
        </Router>
    );
}

export default App;
