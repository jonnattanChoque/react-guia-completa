import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({addCita}) => {
    // crear state de citas
    const [cita, setCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, setError] = useState(false);

    const handleChange = e => {
        setCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }
    const submitCita = e => {
        e.preventDefault();
        
        if(cita.mascota.trim() === '' || cita.propietario.trim() === '' || cita.fecha.trim() === '' || cita.hora.trim() === '' || cita.sintomas.trim() === ''){
            console.log("Error en mascota");
            setError(true);
            return;
        }

        setError(false);
        cita.id = uuidv4();
        addCita(cita);
        setCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? (<p className="alerta-error">Todos los campos son obligatorios</p>) : null}
            <form onSubmit={submitCita}>
                <label>Nombre de mascota</label>
                <input type="text" value={cita.mascota} onChange={handleChange} name="mascota" className="u-full-width" placeholder="Nombre de mascota" />
                <label>Nombre del dueño</label>
                <input type="text" value={cita.propietario} onChange={handleChange} name="propietario" className="u-full-width" placeholder="Nombre del dueño" />
                <label>Fecha</label>
                <input type="date" value={cita.fecha} onChange={handleChange} name="fecha" className="u-full-width" />
                <label>Hora</label>
                <input type="time" value={cita.hora} onChange={handleChange} name="hora" className="u-full-width" placeholder="Nombre del dueño" />
                <label>Sintomas</label>
                <textarea className="u-full-width" onChange={handleChange} value={cita.sintomas} name="sintomas">{cita.sintomas}</textarea>
                <button type="submit" className="u-full-width button-primary">Agregar cita</button>
            </form>
        </Fragment>
    );
}
 
Formulario.propTypes = {
    addCita: PropTypes.func.isRequired
}

export default Formulario;