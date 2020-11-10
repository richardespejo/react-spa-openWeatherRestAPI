import React, { useState } from 'react';
import Error from "./error.js";
import PropTypes from 'prop-types';


const Formulario = ({busqueda , guardarBusqueda, guardarConsultar}) => {
  
    const { ciudad , pais } = busqueda;
    //funcion que coloca los elementos en los states
    const handleChange = e =>{
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const [ error , guardarError ] = useState(false);

    const handleSubmit = e =>{
        
        e.preventDefault();

        if(ciudad.trim() ==='' || pais.trim() ===''){
            guardarError(true);
            return;
        }

        guardarError(false);
        guardarConsultar(true);

    }
 

    return ( 
        <form onSubmit={handleSubmit}>
            { error ? <Error mensaje="Los campos son obligatorios"></Error> : null }
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                /> 
                <label htmlFor="ciudad">Ciudad:</label>
            </div>
            <div className="input-field col s12">
                <select name="pais" id="pais" value={pais} onChange={handleChange}>
                    <option value="">Seleccione...</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor="pais">Pais</label>
            </div>
            <div className="input-field col s12">
                <input 
                    className="waves-effect waves-light btn-large btn-block yellow accent-4" 
                    type="submit" 
                    value="Buscar Clima" 
                />
            </div>
        </form>
     );
}

Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsultar : PropTypes.func.isRequired

}
export default Formulario;