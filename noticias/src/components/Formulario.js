import React from 'react';
import PropTypes from 'prop-types';
import styles from './Formulario.module.css';
import useSelect from '../hooks/useSelect';

const Formulario = ({saveCategoria}) => {
    const OPCIONES = [
        { value: 'general', label: 'General'},
        { value: 'bussiness', label: 'Negocios'},
        { value: 'Entertainment', label: 'Entretenimiento'},
        { value: 'health', label: 'Salud'},
        { value: 'science', label: 'Ciencia'},
        { value: 'sports', label: 'Deportes'},
        { value: 'technology', label: 'Tecnología'}
    ]
    const [categoria, SelectNoticias] = useSelect('general', OPCIONES);

    const buscarNoticias = e => {
        e.preventDefault();
        saveCategoria(categoria)
    }
    return (
        <div className={`${styles.buscador} row`}>
            <div className="col s12 m8 offset-m2">
                <form onSubmit={buscarNoticias}>
                    <h2 className={styles.heading}>Encuentra noticias por categoria</h2>
                    <SelectNoticias />
                    <div className="input-field col s12">
                        <input type="submit" className={`${styles.btnBlock} btn-large amber darken-2`} value="Buscar"/>
                    </div>
                </form>
            </div>
        </div>
    );
}
Formulario.propTypes = {
    saveCategoria: PropTypes.func.isRequired
}
 
export default Formulario;