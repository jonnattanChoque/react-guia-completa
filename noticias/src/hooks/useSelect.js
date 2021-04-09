import React, { useState } from 'react';

const UseSelect = (stateInicial, opciones) => {
    const [state, updateState] = useState(stateInicial);

    const selectNoticias = () => (
        <select className="browser-default" onChange={e => updateState(e.target.value)}>
            <option value="">Seleccione</option>
            {opciones.map(opcion => (
                <option key={opcion.label} value={opcion.value}>{opcion.label}</option>
            ))}
        </select>
    )

    return [state, selectNoticias];
}
 
export default UseSelect;