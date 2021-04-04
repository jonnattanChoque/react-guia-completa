import { Fragment, useEffect, useState } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  console.log(citasIniciales);
  if(!citasIniciales){
    citasIniciales = []
  }
  //Arreglo de citas
  const [citas, saveCitas] = useState(citasIniciales);

  useEffect( () => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]); // Se agrega un array vacio para que se ejecute solo 1 vez, sino, agregar un state

  const addCita = cita => {
    saveCitas([
      ...citas,
      cita
    ])
  }
  const deleteCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    saveCitas(nuevasCitas)
  }

  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas' 
  return (
    <Fragment>
      <h1>Administrador</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario addCita={addCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita key={cita.id} cita={cita} deleteCita={deleteCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
