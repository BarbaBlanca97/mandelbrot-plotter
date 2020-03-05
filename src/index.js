import React from 'react';
import ReactDOM from 'react-dom';
import Plotter from './plotter';
import Controls from './controls';
import Config from './config';

import './styles.scss';

class App extends React.Component {

    initialStepLenght = 0.008;

    state = {
        originX: -0.7318681622023773,
        originY: -0.1680631213321451,
        pixelOffsetX: 0,
        pixelOffsetY: 0,
        zoomFactor: 1,
        zoomScale: 2,
        zoom: 2,
        step: this.initialStepLenght,
        iterations: 150
    }

    handleDisplacement = (deltaX, deltaY) => {
        console.log(`moved (${ deltaX };${ deltaY }) px`);
        this.setState(state => ({ originX: state.originX - ( deltaX * state.step ), originY: state.originY - ( deltaY * state.step ) }));
    }

    handleZoom = (zoomIn) => {
        this.setState(state => {
            const nextZoom = zoomIn ? state.zoom * state.zoomScale : state.zoom / state.zoomScale ;

            return { 
                zoom: nextZoom,
                step: this.initialStepLenght / nextZoom
            }
        }); 
    }

    handleRendered = () => { 
        this.setState({ rendering: false });
    }

    handleRenderStart = () => {
        this.setState({ rendering: true });
    }

    handleConfigChange = (changes) => {
        this.setState({ ...changes });
    }

    render() {
        return (
            <>
            <div id='header'>
                <h1> Graficador de Mandelbrot </h1>

                <ul>
                    <li> Arrastrar el puntero sobre el visor para mover la imagen </li>
                    <li> Hacer click en los botones del visor para acercar o alejar la imagen </li>
                    <li> No se recomienda utilizar esta aplicacion en dispositivos mobiles </li>
                </ul>
            </div>

            <div id='app'>
                <div id='plotter-container'>

                    <Controls
                    onDisplacement={ this.handleDisplacement }
                    onZoom={ this.handleZoom }
                    ></Controls>

                    <Plotter
                    pixelOffsetX={ this.state.pixelOffsetX }
                    pixelOffsetY={ this.state.pixelOffsetY }
                    originX={ this.state.originX }
                    originY={ this.state.originY }
                    zoom={ this.state.zoom }
                    step={ this.state.step }
                    iterations={ this.state.iterations }
                    onRenderStart={ this.handleRenderStart }
                    onRendered={ this.handleRendered }
                    ></Plotter>
                </div>

                <Config
                onChange={ this.handleConfigChange }
                ></Config>
            </div>
            </>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('app-root'));
