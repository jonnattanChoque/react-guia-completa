import { Fragment, useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import ListadoNoticias from "./components/ListadoNoticias";


function App() {
  const [categoria, saveCategoria] = useState('');
  const [noticias, saveNoticias] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      let apiKey = '5e789207cbdb4b4b9d459d17258ce5c1';
      let country = 'co'
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${categoria}&apiKey=${apiKey}`;
      const response = await fetch(url);
      const noticias = await response.json();
     
      saveNoticias(noticias.articles);
    }

    consultarAPI();
  }, [categoria]);

  return (
    <Fragment>
      <Header titulo="Buscador de noticias" />
      <div className="container white">
        <Formulario saveCategoria={saveCategoria} />
        <ListadoNoticias noticias={noticias} />
      </div>
    </Fragment>
  );
}

export default App;
