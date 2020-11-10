import React , { Fragment, useState , useEffect} from 'react';
import Header from './components/header.js';
import Formulario from "./components/formulario.js";
import Clima from "./components/clima.js";
import Error from "./components/error.js";


function App() {

  const [ busqueda , guardarBusqueda ] = useState({
    ciudad : '',
    pais : ''
  });
  const [ consultar , guardarConsultar ] = useState(false);
  const [ resultado , guardarResultado ] = useState({});
  const [ error , guardarError ] = useState(false);

  const { ciudad , pais } = busqueda;

  useEffect( () => {
      const  consultarApi = async () => {

        if(consultar === true){
          const appId = '11cc924d3da0805711aeec53ecff0bfb';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado); 
          guardarConsultar(false);

          if(resultado.cod === '404'){
            guardarError(true);
          }else{
            guardarError(false);
          } 


        }
      }
      consultarApi();
      //eslint-disable-next-line
  },[consultar]);

  //manejo de errores en base de componentes
  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados"></Error>
  } else {
    componente = <Clima resultado={resultado}></Clima>
  }

  return (
    <Fragment>
      <Header 
        titulo="Clima React App"
      ></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12" >
              <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar}>

              </Formulario>
            </div>
            <div className="col m6 s12" >
              { componente }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
   
  );
}

export default App;
