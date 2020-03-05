export default function (percentage) {
    let r = 143, g = 0, b = 255;

    const sampleR = [
        255,
        255,
        255,
        0,
        0,
        75,
        143
    ];

    const sampleG = [
        0,
        127,
        255,
        255,
        0,
        0,
        0
    ];

    const sampleB = [
        0,
        0,
        0,
        0,
        255,
        130,
        255
    ];

    let percentageAcum = .14;
    for ( let i = 0; i < 6; i++ ) {
        if (percentage < percentageAcum) {
            let internalPercentage = ( percentage - ( percentageAcum - .14 )) / .14;
            r = sampleR[i] + ( sampleR[i + 1] - sampleR[i] ) * internalPercentage;
            g = sampleG[i] + ( sampleG[i + 1] - sampleG[i] ) * internalPercentage;
            b = sampleB[i] + ( sampleB[i + 1] - sampleB[i] ) * internalPercentage;

            break;
        }
        percentageAcum += .14;
    }

    return { r, g, b };
}