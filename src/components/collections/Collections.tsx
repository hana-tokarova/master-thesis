import { LissajousBracelet, LissajousEarring, LissajousPendant, LissajousRing } from './LissajousCollection';

export enum CollectionType {
    Lissajous = 'lissaje',
    Torsion = 'torsion',
}

export enum JewelryType {
    Ring = 'ring',
    Bracelet = 'bracelet',
    Earring = 'earring',
    Pendant = 'pendant',
}

export type ParameterTag = 'general' | 'collection';

export type RingSize = {
    value: number;
    diameter: number;
};

export type BraceletSize = {
    value: number;
    diameter: number;
};

export const braceletSizes: BraceletSize[] = [
    { value: 160, diameter: 25.5 },
    { value: 170, diameter: 27.1 },
    { value: 180, diameter: 28.7 },
    { value: 190, diameter: 30.3 },
    { value: 200, diameter: 31.9 },
    { value: 210, diameter: 33.5 },
];

export const ringSizes: RingSize[] = [
    { value: 43, diameter: 13.6 },
    { value: 44, diameter: 13.9 },
    { value: 45, diameter: 14.3 },
    { value: 46, diameter: 14.6 },
    { value: 47, diameter: 14.9 },
    { value: 48, diameter: 15.3 },
    { value: 49, diameter: 15.6 },
    { value: 50, diameter: 15.9 },
    { value: 51, diameter: 16.2 },
    { value: 52, diameter: 16.6 },
    { value: 53, diameter: 16.9 },
    { value: 54, diameter: 17.2 },
];

export type DropdownParameter = {
    name: string;
    tag: ParameterTag;
    type: 'dropdown';
    size: RingSize;
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

export const materials = {
    Metal: {
        name: 'Metal',
        thicknessMinimum: 0.3,
        additionalCost: 20,
        roughness: 0.3,
        metalness: 1,
    },
    Resin: {
        name: 'Resin',
        thicknessMinimum: 0.4,
        additionalCost: 10,
        roughness: 0.3,
        metalness: 0,
    },
    PLA: {
        name: 'PLA',
        thicknessMinimum: 0.5,
        additionalCost: 5,
        roughness: 0.8,
        metalness: 0,
    },
};

export type JewelryMesh = {
    description: string;
    sliderParameters: {
        [key: string]: SliderParameter;
    };
    switchParameters: {
        [key: string]: ToggleParameter;
    };
    dropdownParameters: {
        [key: string]: DropdownParameter;
    };
    render: (
        sliderParams: { [key: string]: number },
        dropdownParams: { [key: string]: RingSize | BraceletSize },
        booleanParams: { [key: string]: boolean },
        color: string,
        ref: React.Ref<THREE.Mesh>,
        roughness: number,
        metalness: number,
    ) => JSX.Element;
};

type Jewelry = {
    name: string;
    meshes: {
        [key in JewelryType]?: JewelryMesh;
    };
};

export const collections: {
    [key in CollectionType]: Jewelry;
} = {
    [CollectionType.Lissajous]: {
        name: 'Lissajous',
        meshes: {
            [JewelryType.Ring]: {
                description:
                    'Lissaje ring is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical number of lines, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Number of horizontal lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 2,
                    },
                    b: {
                        name: 'Number of vertical lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 5,
                        min: 1,
                        max: 10,
                        step: 1,
                    },
                    scaleB: { name: 'Height', tag: 'general', type: 'slider', value: 10, min: 10, max: 30, step: 1 },
                    r: {
                        name: 'Wire thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 0.5,
                        min: materials.PLA.thicknessMinimum,
                        max: 1.0,
                        step: 0.1,
                    },
                },
                switchParameters: {},
                dropdownParameters: {
                    scaleA: { name: 'Sizing', tag: 'general', type: 'dropdown', size: ringSizes[0] },
                },
                render: (slider, dropdown, _, color, ref, roughness, metalness) => (
                    <LissajousRing
                        mesh={ref}
                        meshColor={color}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        meshRadius={slider.r}
                        scaleA={dropdown.scaleA.diameter}
                        scaleB={slider.scaleB}
                        roughness={roughness}
                        metalness={metalness}
                        detail={1000}
                    />
                ),
            },
            [JewelryType.Bracelet]: {
                description:
                    'Lissaje bracelet is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical number of lines, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Number of horizontal lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 2,
                    },
                    b: {
                        name: 'Number of vertical lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 5,
                        min: 1,
                        max: 10,
                        step: 1,
                    },
                    scaleB: { name: 'Height', tag: 'general', type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: {
                        name: 'Wire thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 0.5,
                        min: materials.PLA.thicknessMinimum,
                        max: 1,
                        step: 0.01,
                    },
                },
                switchParameters: {},
                dropdownParameters: {
                    scaleA: { name: 'Sizing', tag: 'general', type: 'dropdown', size: braceletSizes[0] },
                },
                render: (slider, dropdown, _, color, ref) => (
                    <LissajousBracelet
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        scaleA={dropdown.scaleA.diameter * Math.PI}
                        scaleB={slider.scaleB}
                        detail={1000}
                    />
                ),
            },
            [JewelryType.Earring]: {
                description: 'Lissajous curve earring',
                sliderParameters: {
                    a: {
                        name: 'Number of vertical lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 4,
                        min: 2,
                        max: 8,
                        step: 2,
                    },
                    c: {
                        name: 'Number of horizontal lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 2,
                    },
                    b: { name: 'Twisting ', tag: 'collection', type: 'slider', value: 3, min: 1, max: 5, step: 1 },
                    scaleA: { name: 'Width', tag: 'general', type: 'slider', value: 15, min: 5, max: 20, step: 1 },
                    scaleB: { name: 'Depth', tag: 'general', type: 'slider', value: 15, min: 10, max: 20, step: 1 },
                    scaleC: { name: 'Height', tag: 'general', type: 'slider', value: 15, min: 10, max: 20, step: 1 },
                    r: {
                        name: 'Wire thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 0.5,
                        min: materials.PLA.thicknessMinimum,
                        max: 1,
                        step: 0.01,
                    },
                },
                switchParameters: {},
                dropdownParameters: {},
                render: (slider, _, __, color, ref) => (
                    <LissajousEarring
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        parameterC={slider.c}
                        scaleA={slider.scaleA}
                        scaleB={slider.scaleB}
                        scaleC={slider.scaleC}
                        detail={1000}
                    />
                ),
            },
            [JewelryType.Pendant]: {
                description: 'Lissajous curve pendant',
                sliderParameters: {
                    a: {
                        name: 'Number of horizontal lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    b: {
                        name: 'Number of vertical lines',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 2,
                    },
                    scaleA: { name: 'Width', tag: 'general', type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    scaleB: { name: 'Height', tag: 'general', type: 'slider', value: 20, min: 10, max: 30, step: 1 },
                    r: {
                        name: 'Wire thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 0.5,
                        min: 0.1,
                        max: 1,
                        step: 0.01,
                    },
                },
                switchParameters: {},
                dropdownParameters: {},
                render: (slider, _, __, color, ref) => (
                    <LissajousPendant
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.b}
                        parameterB={slider.a}
                        scaleA={slider.scaleB}
                        scaleB={slider.scaleA}
                        detail={1000}
                    />
                ),
            },
        },
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
};
