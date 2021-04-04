import { useEffect, useState } from "react";
import ControlPresupuesto from "./components/ControlPresupuesto";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Pregunta from "./components/Pregunta";

function App() {
  const [presupuesto, savePresupuesto] = useState(0);
  const [restante, saveRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, saveGastos] = useState([]);
  const [gasto, saveGasto] = useState({});
  const [creargasto, saveCreargasto] = useState(false);

  useEffect(() => {
    if(creargasto) {
      saveGastos([
        ...gastos,
        gasto
      ])

      const presupuestoRestante = restante - gasto.cantidad
      saveRestante(presupuestoRestante);

      saveCreargasto(false);
    }
  }, [gasto, creargasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarpregunta ? (
            <Pregunta savePresupuesto={savePresupuesto} saveRestante={saveRestante} actualizarPregunta={actualizarPregunta} />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario saveGasto={saveGasto} saveCreargasto={saveCreargasto} />
              </div>
              <div className="one-half column">
                <Listado gastos={gastos} />
                <ControlPresupuesto presupuesto={presupuesto} restante={restante} />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
