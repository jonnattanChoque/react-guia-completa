import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    &:hover {
        background-color: #326ac0;
        cursor: pointer;
        transition: background-color .3s ease;
    }
`;

const Formulario = ({saveMoneda, saveCriptomoneda}) => {
    const [listaCripto, saveListacripto] = useState([]);
    const [error, saveError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url);
            saveListacripto(resultado.data.Data)
        }
        consultarApi();
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === '') {
            saveError(true);
            return;
        }

        saveError(false);
        saveMoneda(moneda);
        saveCriptomoneda(criptomoneda);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton type="submit" value="Calcular" />
        </form>
    );
}
Formulario.propTypes = {
    saveMoneda: PropTypes.func.isRequired,
    saveCriptomoneda: PropTypes.func.isRequired
}
 
export default Formulario;