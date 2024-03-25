import { LissajousRing } from "./LissajousCollection";
import { TorsionBracelet, TorsionEarring, TorsionRing } from "./TorsionCollection";

export enum CollectionType {
    Lissajous = 'lissajous',
    Torsion = 'torsion'
}

export enum JewelryType {
    Ring = 'ring',
    Bracelet = 'bracelet',
    Earring = 'earring',
    Pendant = 'pendant'
}

type SliderParameter = {
    type: 'slider';
    value: number;
    min: number;
    max: number;
    step: number;
};

type ToggleParameter = {
    type: 'toggle';
    value: boolean;
};

type JewelryMesh = {
    numericParameters: {
        [key: string]: SliderParameter;
    };
    booleanParameters: {
        [key: string]: ToggleParameter;
    };
    render: (numericParams: { [key: string]: number },
        booleanParams: { [key: string]: boolean },
        color: string,
        ref: React.RefObject<THREE.Mesh>) => JSX.Element;
};

type Jewelry = {
    name: string;
    description: string;
    meshes: {
        [key in JewelryType]?: JewelryMesh;
    };
}

export const collections: {
    [key in CollectionType]: Jewelry
} = {
    [CollectionType.Lissajous]: {
        name: 'Lissajous',
        description: 'Lissajous surface',
        meshes: {
            [JewelryType.Ring]: {
                numericParameters: {
                    a: { type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    b: { type: 'slider', value: 5, min: 1, max: 10, step: 1 },
                    scaleA: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: { type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                booleanParameters: {},
                render: (numParams, togParams, color, ref) => <LissajousRing
                    mesh={ref}
                    meshColor={color}
                    meshRadius={numParams.r}
                    parameterA={numParams.a}
                    parameterB={numParams.b}
                    scaleA={numParams.scaleA}
                    scaleB={numParams.scaleB}
                    detail={1000}
                />
            },
            // [JewelryType.Bracelet]: {
            //     numericParameters: {
            //         a: { type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         b: { type: 'slider', value: 5, min: 1, max: 10, step: 1 },
            //         scaleA: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         scaleB: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         r: { type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     booleanParameters: {},
            //     render: (params, color, ref) => <LissajousBracelet
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={params.r}
            //         parameterA={params.a}
            //         parameterB={params.b}
            //         scaleA={params.scaleA}
            //         scaleB={params.scaleB}
            //         detail={1000}
            //     />
            // },
            // [JewelryType.Earring]: {
            //     parameters: {
            //         a: { type: 'slider', value: 4, min: 2, max: 8, step: 2 },
            //         b: { type: 'slider', value: 3, min: 1, max: 5, step: 1 },
            //         c: { type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         scaleA: { type: 'slider', value: 15, min: 5, max: 10, step: 1 },
            //         scaleB: { type: 'slider', value: 15, min: 10, max: 20, step: 1 },
            //         scaleC: { type: 'slider', value: 15, min: 10, max: 20, step: 1 },
            //         r: { type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     render: (params, color, ref) => <LissajousEarring
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={params.r}
            //         parameterA={params.a}
            //         parameterB={params.b}
            //         parameterC={params.c}
            //         scaleA={params.scaleA}
            //         scaleB={params.scaleB}
            //         scaleC={params.scaleC}
            //         detail={1000}
            //     />
            // },
            // [JewelryType.Pendant]: {
            //     parameters: {
            //         a: { type: 'slider', value: 3, min: 1, max: 5, step: 2 },
            //         b: { type: 'slider', value: 3, min: 1, max: 5, step: 1 },
            //         scaleA: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         scaleB: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
            //         r: { type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
            //     },
            //     render: (params, color, ref) => <LissajousPendant
            //         mesh={ref}
            //         meshColor={color}
            //         meshRadius={params.r}
            //         parameterA={params.a}
            //         parameterB={params.b}
            //         scaleA={params.scaleA}
            //         scaleB={params.scaleB}
            //         detail={1000}
            //     />
            // },
        }
    },

    [CollectionType.Torsion]: {
        name: 'Torsion',
        description: 'Twisted surface',
        meshes: {
            [JewelryType.Ring]: {
                numericParameters: {
                    majorR: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    minorR: { type: 'slider', value: 0.3, min: 0.1, max: 0.5, step: 0.01 },
                    twist: { type: 'slider', value: 3, min: -5, max: 5, step: 0.5 },
                    inflate: { type: 'slider', value: 2, min: 1, max: 3, step: 0.01 },
                    scaleC: { type: 'slider', value: 0.7, min: 0.5, max: 1, step: 0.01 },
                },
                booleanParameters: {
                    twistAll: { type: 'toggle', value: false },
                },
                render: (numParams, togParams, color, ref) => <TorsionRing
                    mesh={ref}
                    meshColor={color}
                    stacks={64}
                    majorR={numParams.majorR}
                    minorR={numParams.minorR}
                    twistAll={togParams.twistAll}
                    twist={numParams.twist}
                    inflate={numParams.inflate}
                    scaleA={1}
                    scaleB={1}
                    scaleC={numParams.scaleC}
                />
            },
            [JewelryType.Bracelet]: {
                numericParameters: {
                    majorR: { type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    minorR: { type: 'slider', value: 0.6, min: 0.2, max: 1, step: 0.01 },
                    twist: { type: 'slider', value: 3, min: 0, max: 5, step: 1 },
                    scaleC: { type: 'slider', value: 4, min: 3, max: 5, step: 0.01 },
                    screw: { type: 'slider', value: 1.5, min: 0, max: 3, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { type: 'toggle', value: true },
                },
                render: (numParams, togParams, color, ref) => <TorsionBracelet
                    mesh={ref}
                    meshColor={color}
                    stacks={64}
                    majorR={numParams.majorR}
                    minorR={numParams.minorR}
                    twistAll={togParams.twistAll}
                    twist={numParams.twist}
                    scaleA={1}
                    scaleB={1}
                    scaleC={numParams.scaleC}
                    screw={numParams.screw}
                />
            },
            [JewelryType.Earring]: {
                numericParameters: {
                    majorR: { type: 'slider', value: 8, min: 3, max: 9, step: 1 },
                    minorR: { type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                    twist: { type: "slider", value: 3, min: 0, max: 5, step: 1 },
                    inflate: { type: 'slider', value: 2, min: 1, max: 3, step: 0.01 },
                    scaleC: { type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { type: 'toggle', value: true },
                },
                render: (numParams, togParams, color, ref) => <TorsionEarring
                    mesh={ref}
                    meshColor={color}
                    stacks={64}
                    twistAll={togParams.twistAll}
                    twist={numParams.twist}
                    majorR={numParams.majorR}
                    minorR={numParams.minorR}
                    inflate={numParams.inflate}
                    scaleA={1}
                    scaleB={1}
                    scaleC={numParams.scaleC}
                />
            },
            [JewelryType.Pendant]: {
                numericParameters: {
                    majorR: { type: 'slider', value: 8, min: 3, max: 9, step: 1 },
                    minorR: { type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                    twist: { type: "slider", value: 3, min: 0, max: 5, step: 1 },
                    scaleC: { type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { type: 'toggle', value: true },
                },
                render: (numParams, togParams, color, ref) => <TorsionEarring
                    mesh={ref}
                    meshColor={color}
                    stacks={64}
                    twistAll={togParams.twistAll}
                    twist={numParams.twist}
                    majorR={numParams.majorR}
                    minorR={numParams.minorR}
                    scaleA={1}
                    scaleB={1}
                    scaleC={numParams.scaleC}
                />
            }
        },
    }
}
