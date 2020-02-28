import React from 'react';

export default class Plotter extends React.Component {
    iterations = 30;
    DIVERGENCE = 10000;

    constructor (props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    belongsToMandelbrot(cx, cy) {
        let zx = 0, zy = 0;
        let realPart = 0, imaginaryPart = 0;

        for (let i = 1; i <= this.iterations; i++) {
            realPart = ( zx * zx ) - ( zy * zy ) + cx;
            imaginaryPart = ( 2 * zx * zy ) + cy;

            if ( Math.sqrt(( realPart * realPart ) + (imaginaryPart * imaginaryPart)) > this.DIVERGENCE )
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

        const ctx = this.canvasRef.current.getContext('2d');
        const   canvasWidth = this.canvasRef.current.width, 
                canvasHeight = this.canvasRef.current.height;

        const   step = this.props.stepLength;

        const   originX = this.props.offsetX,
                originY = this.props.offsetY;

        const   cOffsetX = Math.abs(originX - ( canvasWidth / 2 )), 
                cOffsetY = Math.abs(originY - ( canvasHeight / 2 ));

        const imageData = ctx.createImageData(canvasWidth, canvasHeight);

        let pixel = 0;
        for (let i = 0; i < canvasHeight; i++) {
            for (let j = 0; j < canvasWidth; j++) {
                let r, g, b, a = 255;
                    
                const result = this.belongsToMandelbrot((j - cOffsetX) * step, (i - cOffsetY) * step);
                if (result == 0) {
                    r = 0;
                    g = 0;
                    b = 0;
                }
                else {
                    r = 89 + ( result / this.iterations ) * 102;
                    g = 255 - ( result / this.iterations ) * 166;
                    b = 255 - ( result / this.iterations ) * 144;
                }

                imageData.data[pixel++] = r;
                imageData.data[pixel++] = g;
                imageData.data[pixel++] = b;
                imageData.data[pixel++] = a;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        console.log(`Rendered in ${ Date.now() - startTime }ms`);
    }

    componentDidMount () {
        this.renderFractal();
    }

    render () {
        this.renderFractal();
        return <canvas width='640' height='480' ref={ this.canvasRef } />;
    }
}