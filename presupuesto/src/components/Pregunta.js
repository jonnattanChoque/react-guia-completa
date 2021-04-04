import React, { Fragment, useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Pregunta = ({savePresupuesto, saveRestante, actualizarPregunta}) => {
    const [cantidad, saveCantidad] = useState(0);
    const [error, setError] = useState(false);

    const definirPresupuesto = e => {
        const presupuesto = parseInt(e.target.value, 10);
        saveCantidad(presupuesto)
    }
    const addPresupuesto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad)) {
            setError(true);
            return;
        }

        setError(false);
        savePresupuesto(cantidad);
        saveRestante(cantidad);
        actualizarPregunta(false);
    }

    return (
        <Fragment>
            <h2>Pon tu presupuesto</h2>
            {error ? <Error mensaje="El presupuesto es incorrecto" /> : null}
            <form onSubmit={addPresupuesto}>
                <input type="number" className="u-full-width" placeholder="Presupuesto" onChange={definirPresupuesto} />
                <input type="submit" className="button-primary u-full-width" value="Definir presupuesto" />
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    savePresupuesto: PropTypes.func.isRequired,
    saveRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;