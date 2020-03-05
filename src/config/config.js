import React from 'react';

import './styles.scss';

export default class Config extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            iterations: 150,
            zoomScale: 2
        }
    }

    
    handleInputChange = (event) => {
        let field = '';

        switch (event.target.id) {
            case 'config-iterations': field = 'iterations'; break;
            case 'config-zoomScale': field = 'zoomScale'; break;
        }

        this.setState({ [field]: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.charCode === 13)
            this.props.onChange(this.state);
    }

    render () {
        return <div id='config'
        onKeyPress={ this.handleKeyPress }>
            <label htmlFor='config-iterations'> Iteraciones </label>
            <input
            id='config-iterations'
            type='number'
            value={ this.state.iterations }
            onChange={ this.handleInputChange }
            ></input>
            <div className='config-description'>
                Controla la cantidad de iteraciones por pixel, al aumentar este valor la resolucion de la imagen mejora, a costa de velocidad de renderizado. Se recomienda aumentar este valor a medida que se hace zoom o si el detalle no es satisfactorio
            </div>

            <label htmlFor='config-zoomScale'> Factor de zoom </label>
            <input
            id='config-zoomScale'
            type='number'
            value={ this.state.zoomScale }
            onChange={ this.handleInputChange }
            ></input>
            <div className='config-description'>
                El multiplicador del acercamiento. Aumentar este valor hará que el control de zoom aumente mas la imagen. Se recomienda aumentar este valor a medida que se haga zoom en la imagen
            </div>

            <button onClick={ _ => this.props.onChange(this.state) }> Aplicar </button>
        </div>
    }
}