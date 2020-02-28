import React from 'react';
import ReactDOM from 'react-dom';
import Plotter from './plotter';
import Controls from './controls';

import './styles.scss';

class App extends React.Component {

    state = {
        offsetX: 0,
        offsetY: 0,
        stepLength: 0.01
    }

    handleDisplacement = (deltaX, deltaY) => {
        console.log(`moved (${ deltaX };${ deltaY }) px`);
        this.setState(state => ({ offsetX: state.offsetX + deltaX, offsetY: state.offsetY + deltaY }));
    }

    handleZoom = (zoomIn) => {
        this.setState(state => ({ stepLength: state.stepLength + (zoomIn ? -0.001 : 0.001) }));
    }

    render() {
        return (
            <div id='plotter-container'>
                <Controls
                onDisplacement={ this.handleDisplacement }
                onZoom={ this.handleZoom }
                ></Controls>

                <Plotter
                offsetX={ this.state.offsetX }
                offsetY={ this.state.offsetY }
                stepLength={ this.state.stepLength }
                ></Plotter>
            </div>
        );
    }
}

ReactDOM.render(<App></App>, document.getElementById('app-root'));
