import React from 'react';

import './styles.scss';
import rainbowInterpolator from './rainbow-interpolator';

export default class Plotter extends React.Component {
    SQR_DIVERGENCE = 4;
    startStepLenght = 0.008;
    rendering = false;

    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
        this.overlayRef = React.createRef();
    }

    belongsToMandelbrot = (cx, cy) => {

        let zx = 0, zy = 0;
        let realPart = 0, imaginaryPart = 0;
        const iterations = this.iterations;

        for (let i = 1; i <= iterations; i++) {
            realPart = ( zx * zx ) - ( zy * zy ) + cx;
            imaginaryPart = ( 2 * zx * zy ) + cy;

            if ( ( realPart * realPart ) + (imaginaryPart * imaginaryPart) > this.SQR_DIVERGENCE )
                return i;
            else {
                zx = realPart;
                zy = imaginaryPart;
            }
        }

        return 0;
    }

    renderFractal = () => { if (!this.canvasRef.current) return;

        let startTime = Date.now();

        const   ctx = this.canvasRef.current.getContext('2d');

        const   canvasWidth = this.canvasRef.current.width, 
                canvasHeight = this.canvasRef.current.height;

        const   cOffsetX = Math.abs(this.props.originX - (( canvasWidth / 2 ) * this.props.step)), 
                cOffsetY = Math.abs(this.props.originY - (( canvasHeight / 2 ) * this.props.step ));

        const   imageData = ctx.createImageData(canvasWidth, canvasHeight);

        this.iterations = this.props.iterations;

        const   originX = this.props.originX,
                originY = this.props.originY;

        const   step = this.props.step;

        /* LOGING */

        console.log(`Starting rendering with ${ this.iterations } iters/pixel`);
        console.log(`Iterations needed for this pass: ${ this.iterations * canvasWidth * canvasHeight }`);
        console.log(`Plane origin at (${ originX };${ originY })`);
        console.log(`c starts from (${ -cOffsetX };${ -cOffsetY })`);
        
        /* ****** */

        let pixelComponent = 0;
        for (let i = canvasHeight - 1; i >= 0; i--) {
            for (let j = 0; j < canvasWidth; j++) {
                let r, g, b, a = 255;
                    
                const result = this.belongsToMandelbrot(-cOffsetX + ( step * j ), -cOffsetY + ( step * i ));
                if (result == 0) {
                    r = 0;
                    g = 0;
                    b = 0;
                }
                else {
                    const color = rainbowInterpolator(1 - (result / this.iterations));
                    r = color.r;
                    g = color.g;
                    b = color.b;
                }

                imageData.data[pixelComponent++] = r;
                imageData.data[pixelComponent++] = g;
                imageData.data[pixelComponent++] = b;
                imageData.data[pixelComponent++] = a;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        console.log(`Rendered in ${ Date.now() - startTime }ms`);
    }

    componentDidMount () {
        this.renderFractal();
    }

    componentDidUpdate () {
        this.renderFractal();
    }

    render () {
        return <canvas id='render-canvas' width='640' height='480' ref={ this.canvasRef } />;
    }
}