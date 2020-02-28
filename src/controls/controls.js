import React from 'react';

import './styles.scss';

export default class Controls extends React.Component {

    startX = 0;
    startY = 0;
    
    handlePointerDown = (event) => {
        this.startX = event.screenX;
        this.startY = event.screenY;
    }

    handlePointerUp = (event) => {
        const deltaX = (event.screenX - this.startX) * -1, deltaY = (event.screenY - this.startY) * -1;

        if (Math.abs(deltaX) > 7 || Math.abs(deltaY) > 7)
            this.props.onDisplacement(deltaX, deltaY);
    }

    handleZoomClick = (event) => {
        event.stopPropagation();

        let zoomIn = event.target.id === 'controls-zoom-in';

        this.props.onZoom(zoomIn);
    }

    render () {
        return (
            <div 
            id='controls' 
            onPointerDown={ this.handlePointerDown } 
            onPointerUp={ this.handlePointerUp }
            >
                <div id='controls-zoom'>
                    <button id='controls-zoom-in' onClick={ this.handleZoomClick }>+</button>
                    <button id='controls-zoom-out' onClick={ this.handleZoomClick }>-</button>
                </div>
            </div>
        );
    }
}