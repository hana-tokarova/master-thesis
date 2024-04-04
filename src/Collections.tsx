import { LissajousBracelet, LissajousEarring, LissajousPendant, LissajousRing } from "./LissajousCollection";
import { TorsionBracelet, TorsionEarring, TorsionPendant, TorsionRing } from "./TorsionCollection";

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

type SliderParameter = {
    name: string;
    type: 'slider';
    value: number;
    min: number;
    max: number;
    step: number;
};

type ToggleParameter = {
    name: string;
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
        description: 'Lissajous curve surface',
        meshes: {
            [JewelryType.Ring]: {
                numericParameters: {
                    a: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    b: { name: "Vertical lines", type: 'slider', value: 5, min: 1, max: 10, step: 1 },
                    scaleA: { name: "Scaling A", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { name: "Scaling B", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
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
            [JewelryType.Bracelet]: {
                numericParameters: {
                    a: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
                    b: { name: "Vertical lines", type: 'slider', value: 5, min: 1, max: 10, step: 1 },
                    scaleA: { name: "Scaling A", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { name: "Scaling B", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                booleanParameters: {},
                render: (numParams, togParams, color, ref) => <LissajousBracelet
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
            [JewelryType.Earring]: {
                numericParameters: {
                    a: { name: "Vertical lines", type: 'slider', value: 4, min: 2, max: 8, step: 2 },
                    b: { name: "Twisting ", type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    c: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
                    scaleA: { name: "Scale A", type: 'slider', value: 15, min: 5, max: 10, step: 1 },
                    scaleB: { name: "Scale B", type: 'slider', value: 15, min: 10, max: 20, step: 1 },
                    scaleC: { name: "Scale C", type: 'slider', value: 15, min: 10, max: 20, step: 1 },
                    r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                booleanParameters: {},
                render: (numParams, togParams, color, ref) => <LissajousEarring
                    mesh={ref}
                    meshColor={color}
                    meshRadius={numParams.r}
                    parameterA={numParams.a}
                    parameterB={numParams.b}
                    parameterC={numParams.c}
                    scaleA={numParams.scaleA}
                    scaleB={numParams.scaleB}
                    scaleC={numParams.scaleC}
                    detail={1000}
                />
            },
            [JewelryType.Pendant]: {
                numericParameters: {
                    a: { name: "Horizontal lines", type: 'slider', value: 3, min: 1, max: 5, step: 2 },
                    b: { name: "Vertical lines", type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    scaleA: { name: "Scale A", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { name: "Scale B", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: { name: "Radius", type: 'slider', value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                booleanParameters: {},
                render: (numParams, togParams, color, ref) => <LissajousPendant
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
        }
    },

    [CollectionType.Torsion]: {
        name: 'Torsion',
        description: 'Twisted surface',
        meshes: {
            [JewelryType.Ring]: {
                numericParameters: {
                    majorR: { name: "Radius", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    minorR: { name: "Thickness", type: 'slider', value: 0.3, min: 0.1, max: 0.5, step: 0.01 },
                    twist: { name: "Twistiness", type: 'slider', value: 3, min: -5, max: 5, step: 0.5 },
                    inflate: { name: "Inflation", type: 'slider', value: 2, min: 1, max: 3, step: 0.01 },
                    scaleC: { name: "Height", type: 'slider', value: 0.7, min: 0.5, max: 1, step: 0.01 },
                },
                booleanParameters: {
                    twistAll: { name: "Twist all?", type: 'toggle', value: false },
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
                    majorR: { name: "Radius", type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    minorR: { name: "Thickness", type: 'slider', value: 0.6, min: 0.2, max: 1, step: 0.01 },
                    twist: { name: "Twistiness", type: 'slider', value: 3, min: 0, max: 5, step: 1 },
                    scaleC: { name: "Height", type: 'slider', value: 4, min: 3, max: 5, step: 0.01 },
                    screw: { name: "Screwness", type: 'slider', value: 1.5, min: 0, max: 3, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { name: "Twist all?", type: 'toggle', value: true },
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
                    majorR: { name: "Radius", type: 'slider', value: 8, min: 3, max: 9, step: 1 },
                    minorR: { name: "Thickness", type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                    twist: { name: "Twistiness", type: "slider", value: 3, min: 0, max: 5, step: 1 },
                    inflate: { name: "Inflation", type: 'slider', value: 1, min: 1, max: 3, step: 0.01 },
                    scaleC: { name: "Height", type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { name: "Twist all?", type: 'toggle', value: true },
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
                    majorR: { name: "Radius", type: 'slider', value: 8, min: 3, max: 9, step: 1 },
                    minorR: { name: "Thickness", type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                    twist: { name: "Twistiness", type: "slider", value: 3, min: 0, max: 5, step: 1 },
                    scaleA: { name: "Height", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
                    scaleB: { name: "Width", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
                    scaleC: { name: "Depth", type: 'slider', value: 1, min: 1, max: 1.5, step: 0.1 },
                },
                booleanParameters: {
                    twistAll: { name: "Twist all?", type: 'toggle', value: true },
                },
                render: (numParams, togParams, color, ref) => <TorsionPendant
                    mesh={ref}
                    meshColor={color}
                    stacks={64}
                    twistAll={togParams.twistAll}
                    twist={numParams.twist}
                    majorR={numParams.majorR}
                    minorR={numParams.minorR}
                    scaleA={numParams.scaleA}
                    scaleB={numParams.scaleB}
                    scaleC={numParams.scaleC}
                />
            }
        },
    },
}
