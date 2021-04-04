import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({saveGasto, saveCreargasto}) => {
    const [nombre, saveNombre] = useState('');
    const [cantidad, saveCantidad] = useState(0);
    const [error, setError] = useState(false);

    const addGasto = e => {
        e.preventDefault();

        if(nombre.trim() === '' || cantidad < 1 || isNaN(cantidad)){
            setError(true);
            return;
        }

        setError(false);
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        
        saveGasto(gasto);
        saveCreargasto(true);
        
        saveNombre('');
        saveCantidad(0);
    }
    return (
        <form onSubmit={addGasto}>
            <h2>Agregar gastos</h2>
            {error ? <Error mensaje="Debes llenar los campos" /> : null}
            <div className="campo">
                <label>Nombre del gasto</label>
                <input type="text" className="u-full-width" value={nombre} 
                onChange={e => saveNombre(e.target.value)} placeholder="EJ. transporte" />
            </div>
            <div className="campo">
                <label>Cantidad del gasto</label>
                <input type="number" className="u-full-width" value={cantidad}
                onChange={e => saveCantidad(parseInt(e.target.value, 10))} placeholder="EJ. 346" />
            </div>
            <input type="submit" className="button-primary u-full-width" value="Agregar gasto"/>
        </form>
    );
}
Formulario.propTypes = {
    saveGasto: PropTypes.func.isRequired,
    saveCreargasto: PropTypes.func.isRequired
}
 
export default Formulario;