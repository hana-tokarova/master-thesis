import { LissajousRing } from "./LissajousCollection";

export enum CollectionType {
    Lissajous = 'lissaje',
    Torsion = 'torsion',
}

export enum JewelryType {
    Ring = 'ring',
    Bracelet = 'bracelet',
    Earring = 'earring',
    Pendant = 'pendant'
}

export type ParameterTag = 'general' | 'collection';

export type NumberInputParameter = {
    name: string;
    tag: ParameterTag;
    type: 'number-input';
    value: number;
    min: number;
    max: number;
    step: number;
};

export type SliderParameter = {
    name: string;
    tag: ParameterTag;
    type: 'slider';
    value: number;
    min: number;
    max: number;
    step: number;
};

export type ToggleParameter = {
    name: string;
    tag: ParameterTag;
    type: 'toggle';
    value: boolean;
};

export type JewelryMesh = {
    description: string;
    dimensions: () => { x: number; y: number; z: number };
    sliderParameters: {
        [key: string]: SliderParameter;
    };
    switchParameters: {
        [key: string]: ToggleParameter;
    };
    numberInputParameters: {
        [key: string]: NumberInputParameter;
    };
    render: (sliderParams: { [key: string]: number },
        numberInputParams: { [key: string]: number },
        booleanParams: { [key: string]: boolean },
        color: string,
        ref: React.Ref<THREE.Mesh>) => JSX.Element;
};

type Jewelry = {
    name: string;
    meshes: {
        [key in JewelryType]?: JewelryMesh;
    };
}

export const collections: {
    [key in CollectionType]: Jewelry
} = {
    [CollectionType.Lissajous]: {
        name: 'Lissajous',
        meshes: {
            [JewelryType.Ring]: {
                description: 'Lissaje ring is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical number of lines, the curve changes its shape.',
                sliderParameters: {
                    a: { name: "Number of horizontal lines", tag: 'collection', type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    b: { name: "Number of vertical lines", tag: 'collection', type: 'slider', value: 5, min: 1, max: 10, step: 1 },
                },
                switchParameters: {},
                numberInputParameters: {
                    scaleA: { name: "Scaling A", tag: "general", type: 'number-input', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { name: "Scaling B", tag: "general", type: 'number-input', value: 10, min: 10, max: 30, step: 1 },
                    r: { name: "Radius", tag: "general", type: 'number-input', value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                dimensions: function () {
                    return {
                        x: this.numberInputParameters.scaleA.value,
                        y: this.numberInputParameters.scaleA.value,
                        z: this.numberInputParameters.scaleB.value
                    };
                },
                render: (slider, numberInput, _, color, ref) => <LissajousRing
                    mesh={ref}
                    meshColor={color}
                    parameterA={slider.a}
                    parameterB={slider.b}
                    meshRadius={numberInput.r}
                    scaleA={numberInput.scaleA}
                    scaleB={numberInput.scaleB}
                    detail={1000}
                />
            },
            // [JewelryType.Bracelet]: {
            //     description: 'Lissajous curve bracelet',
            //     numericParameters: {
            //         a: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         b: { name: "Vertical lines", type: 'slider', value: 5, min: 1, max: 10, step: 1 },
            //         scaleA: { name: "Scaling A", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         scaleB: { name: "Scaling B", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     booleanParameters: {},
            //     render: (numParams, togParams, color, ref) => <LissajousBracelet
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={numParams.r}
            //         parameterA={numParams.a}
            //         parameterB={numParams.b}
            //         scaleA={numParams.scaleA}
            //         scaleB={numParams.scaleB}
            //         detail={1000}
            //     />
            // },
            // [JewelryType.Earring]: {
            //     description: 'Lissajous curve earring',
            //     numericParameters: {
            //         a: { name: "Vertical lines", type: 'slider', value: 4, min: 2, max: 8, step: 2 },
            //         b: { name: "Twisting ", type: 'slider', value: 3, min: 1, max: 5, step: 1 },
            //         c: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         scaleA: { name: "Scale A", type: 'slider', value: 15, min: 5, max: 10, step: 1 },
            //         scaleB: { name: "Scale B", type: 'slider', value: 15, min: 10, max: 20, step: 1 },
            //         scaleC: { name: "Scale C", type: 'slider', value: 15, min: 10, max: 20, step: 1 },
            //         r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     booleanParameters: {},
            //     render: (numParams, togParams, color, ref) => <LissajousEarring
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={numParams.r}
            //         parameterA={numParams.a}
            //         parameterB={numParams.b}
            //         parameterC={numParams.c}
            //         scaleA={numParams.scaleA}
            //         scaleB={numParams.scaleB}
            //         scaleC={numParams.scaleC}
            //         detail={1000}
            //     />
            // },
            // [JewelryType.Pendant]: {
            //     description: 'Lissajous curve pendant',
            //     numericParameters: {
            //         a: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         b: { name: "Vertical lines", type: 'slider', value: 3, min: 1, max: 5, step: 1 },
            //         scaleA: { name: "Scale A", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         scaleB: { name: "Scale B", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     booleanParameters: {},
            //     render: (numParams, togParams, color, ref) => <LissajousPendant
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={numParams.r}
            //         parameterA={numParams.a}
            //         parameterB={numParams.b}
            //         scaleA={numParams.scaleA}
            //         scaleB={numParams.scaleB}
            //         detail={1000}
            //     />
            // },
        }
    },

    [CollectionType.Torsion]: {
        name: 'Torsion',
        meshes: {
            // [JewelryType.Ring]: {
            //     description: 'Torsion ring',
            //     numericParameters: {
            //         majorR: { name: "Radius", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         minorR: { name: "Thickness", type: 'slider', value: 0.3, min: 0.1, max: 0.5, step: 0.01 },
            //         twist: { name: "Twistiness", type: 'slider', value: 3, min: -5, max: 5, step: 0.5 },
            //         inflate: { name: "Inflation", type: 'slider', value: 2, min: 1, max: 3, step: 0.01 },
            //         scaleC: { name: "Height", type: 'slider', value: 0.7, min: 0.5, max: 1, step: 0.01 },
            //     },
            //     booleanParameters: {
            //         twistAll: { name: "Twist all?", type: 'toggle', value: false },
            //     },
            //     render: (numParams, togParams, color, ref) => <TorsionRing
            //         mesh={ref}
            //         meshColor={color}
            //         stacks={64}
            //         majorR={numParams.majorR}
            //         minorR={numParams.minorR}
            //         twistAll={togParams.twistAll}
            //         twist={numParams.twist}
            //         inflate={numParams.inflate}
            //         scaleA={1}
            //         scaleB={1}
            //         scaleC={numParams.scaleC}
            //     />
            // },
            // [JewelryType.Bracelet]: {
            //     description: 'Torsion bracelet',
            //     numericParameters: {
            //         majorR: { name: "Radius", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         minorR: { name: "Thickness", type: 'slider', value: 0.6, min: 0.2, max: 1, step: 0.01 },
            //         twist: { name: "Twistiness", type: 'slider', value: 3, min: 0, max: 5, step: 1 },
            //         scaleC: { name: "Height", type: 'slider', value: 4, min: 3, max: 5, step: 0.01 },
            //         screw: { name: "Screwness", type: 'slider', value: 1.5, min: 0, max: 3, step: 0.1 },
            //     },
            //     booleanParameters: {
            //         twistAll: { name: "Twist all?", type: 'toggle', value: true },
            //     },
            //     render: (numParams, togParams, color, ref) => <TorsionBracelet
            //         mesh={ref}
            //         meshColor={color}
            //         stacks={64}
            //         majorR={numParams.majorR}
            //         minorR={numParams.minorR}
            //         twistAll={togParams.twistAll}
            //         twist={numParams.twist}
            //         scaleA={1}
            //         scaleB={1}
            //         scaleC={numParams.scaleC}
            //         screw={numParams.screw}
            //     />
            // },
            // [JewelryType.Earring]: {
            //     description: 'Torsion earring',
            //     numericParameters: {
            //         majorR: { name: "Radius", type: 'slider', value: 8, min: 3, max: 9, step: 1 },
            //         minorR: { name: "Radius of ring", type: 'slider', value: 2, min: 0.5, max: 2, step: 0.1 },
            //         twist: { name: "Twistiness", type: "slider", value: 3, min: 0, max: 5, step: 1 },
            //         inflate: { name: "Inflation", type: 'slider', value: 1, min: 0.01, max: 1, step: 0.01 },
            //         scaleC: { name: "Depth", type: 'slider', value: 2, min: 1, max: 2, step: 0.1 },
            //     },
            //     booleanParameters: {
            //         twistAll: { name: "Twist all?", type: 'toggle', value: true },
            //     },
            //     render: (numParams, togParams, color, ref) => <TorsionEarring
            //         mesh={ref}
            //         meshColor={color}
            //         stacks={64}
            //         twistAll={togParams.twistAll}
            //         twist={numParams.twist}
            //         majorR={numParams.majorR}
            //         minorR={numParams.minorR}
            //         inflate={numParams.inflate}
            //         scaleA={1}
            //         scaleB={1}
            //         scaleC={numParams.scaleC}
            //     />
            // },
            // [JewelryType.Pendant]: {
            //     description: 'Torsion pendant',
            //     numericParameters: {
            //         majorR: { name: "Radius", type: 'slider', value: 8, min: 3, max: 9, step: 1 },
            //         minorR: { name: "Radius of ring", type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
            //         twist: { name: "Twistiness", type: "slider", value: 3, min: 0, max: 5, step: 1 },
            //         scaleA: { name: "Height", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
            //         scaleB: { name: "Width", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
            //         scaleC: { name: "Depth", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
            //     },
            //     booleanParameters: {
            //         twistAll: { name: "Twist all?", type: 'toggle', value: true },
            //     },
            //     render: (numParams, togParams, color, ref) => <TorsionPendant
            //         mesh={ref}
            //         meshColor={color}
            //         stacks={64}
            //         twistAll={togParams.twistAll}
            //         twist={numParams.twist}
            //         majorR={numParams.majorR}
            //         minorR={numParams.minorR}
            //         scaleA={numParams.scaleA}
            //         scaleB={numParams.scaleB}
            //         scaleC={numParams.scaleC}
            //     />
            // }
        },
    },
}
