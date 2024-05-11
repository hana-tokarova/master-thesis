import { LissajousBracelet, LissajousEarring, LissajousPendant, LissajousRing } from './LissajousCollection';
import { TorsionBracelet, TorsionEarring, TorsionPendant, TorsionRing } from './TorsionCollection';

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
    { value: 220, diameter: 35.1 },
    { value: 230, diameter: 36.7 },
    { value: 240, diameter: 38.3 },
    { value: 250, diameter: 39.9 },
    { value: 260, diameter: 41.5 },
    { value: 270, diameter: 43.1 },
    { value: 280, diameter: 44.7 },
    { value: 290, diameter: 46.3 },
    { value: 300, diameter: 47.9 },
    { value: 310, diameter: 49.5 },
    { value: 320, diameter: 51.1 },
    { value: 330, diameter: 52.7 },
    { value: 340, diameter: 54.3 },
    { value: 350, diameter: 55.9 },
    { value: 360, diameter: 57.5 },
    { value: 370, diameter: 59.1 },
    { value: 380, diameter: 60.7 },
    { value: 390, diameter: 62.3 },
    { value: 400, diameter: 63.9 },
    { value: 410, diameter: 65.5 },
    { value: 420, diameter: 67.1 },
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
    { value: 55, diameter: 17.5 },
    { value: 56, diameter: 17.8 },
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

export type Material = {
    name: string;
    thicknessMinimum: number;
    additionalCost: number;
    roughness: number;
    metalness: number;
};

// additionalCost = (density / density conversion) * price per kg
export const materials: { [key: string]: Material } = {
    Metal: {
        name: 'Metal',
        thicknessMinimum: 0.5,
        additionalCost: (10.49 / 1000000) * 30000,
        roughness: 0.3,
        metalness: 1,
    },
    Resin: {
        name: 'Resin',
        thicknessMinimum: 1,
        additionalCost: (1.11 / 1000000) * 30,
        roughness: 1,
        metalness: 0.5,
    },
    Plastic: {
        name: 'Plastic',
        thicknessMinimum: 0.75,
        additionalCost: (1.25 / 1000000) * 25,
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
                    'Lissaje ring is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical segments, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Horizontal segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    b: {
                        name: 'Vertical segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 5,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    scaleB: { name: 'Height', tag: 'general', type: 'slider', value: 5, min: 3, max: 8, step: 0.1 },
                    r: {
                        name: 'Wire radius',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
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
                        scaleA={dropdown.scaleA.diameter / 2 + slider.r}
                        scaleB={slider.scaleB / 2}
                        roughness={roughness}
                        metalness={metalness}
                        detail={1000}
                    />
                ),
            },
            [JewelryType.Bracelet]: {
                description:
                    'Lissaje bracelet is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical segments, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Horizontal segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    b: {
                        name: 'Vertical segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 5,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    scaleB: { name: 'Height', tag: 'general', type: 'slider', value: 13, min: 8, max: 20, step: 0.1 },
                    r: {
                        name: 'Wire radius',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
                        step: 0.1,
                    },
                },
                switchParameters: {},
                dropdownParameters: {
                    scaleA: { name: 'Sizing', tag: 'general', type: 'dropdown', size: braceletSizes[0] },
                },
                render: (slider, dropdown, _, color, ref, roughness, metalness) => (
                    <LissajousBracelet
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        scaleA={(dropdown.scaleA.diameter * Math.PI) / 2 + slider.r}
                        scaleB={slider.scaleB / 2}
                        detail={1000}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
            [JewelryType.Earring]: {
                description:
                    'Lissaje earring is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal, vertical and twisting segments, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Horizontal segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 4,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    c: {
                        name: 'Vertical segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    b: {
                        name: 'Twisting segments ',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                    scaleA: { name: 'Width', tag: 'general', type: 'slider', value: 13, min: 5, max: 15, step: 0.1 },
                    scaleB: { name: 'Depth', tag: 'general', type: 'slider', value: 7, min: 5, max: 10, step: 0.1 },
                    scaleC: { name: 'Height', tag: 'general', type: 'slider', value: 12, min: 10, max: 15, step: 0.1 },
                    r: {
                        name: 'Wire radius',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
                        step: 0.1,
                    },
                },
                switchParameters: {},
                dropdownParameters: {},
                render: (slider, _, __, color, ref, roughness, metalness) => (
                    <LissajousEarring
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        parameterC={slider.c}
                        scaleA={slider.scaleA / 2}
                        scaleB={slider.scaleB / 2}
                        scaleC={slider.scaleC / 2}
                        detail={1000}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
            [JewelryType.Pendant]: {
                description:
                    'Lissaje pendant is a generativelly created pattern from the Lissajous curves. By adjusting the parameters for the horizontal and vertical segments, the curve changes its shape.',
                sliderParameters: {
                    a: {
                        name: 'Horizontal segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 2,
                        min: 1,
                        max: 3,
                        step: 1,
                    },
                    b: {
                        name: 'Vertical segments',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: 1,
                        max: 3,
                        step: 1,
                    },
                    scaleB: { name: 'Width', tag: 'general', type: 'slider', value: 12, min: 10, max: 15, step: 0.1 },
                    scaleA: { name: 'Height', tag: 'general', type: 'slider', value: 10, min: 10, max: 15, step: 0.1 },
                    r: {
                        name: 'Wire radius',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
                        step: 0.1,
                    },
                },
                switchParameters: {},
                dropdownParameters: {},
                render: (slider, _, __, color, ref, roughness, metalness) => (
                    <LissajousPendant
                        mesh={ref}
                        meshColor={color}
                        meshRadius={slider.r}
                        parameterA={slider.a}
                        parameterB={slider.b}
                        scaleA={slider.scaleA / 2}
                        scaleB={slider.scaleB / 2}
                        detail={1000}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
        },
    },
    [CollectionType.Torsion]: {
        name: 'Torsion',
        meshes: {
            [JewelryType.Ring]: {
                description:
                    'Torsion ring is a generativelly created pattern from the twisted torus. By adjusting the twist and inflate parameters, the torus changes its shape.',
                sliderParameters: {
                    scaleC: { name: 'Height', tag: 'general', type: 'slider', value: 3, min: 1, max: 5, step: 0.1 },
                    minorR: {
                        name: 'Wall thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
                        step: 0.1,
                    },
                    inflate: {
                        name: 'Inflate',
                        tag: 'collection',
                        type: 'slider',
                        value: 0.5,
                        min: 0,
                        max: 1,
                        step: 0.1,
                    },
                    twist: {
                        name: 'Twist',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: -5,
                        max: 5,
                        step: 0.5,
                    },
                },
                switchParameters: {
                    twistAll: { name: 'Twist all?', tag: 'collection', type: 'toggle', value: false },
                },
                dropdownParameters: {
                    majorR: { name: 'Sizing', tag: 'general', type: 'dropdown', size: ringSizes[0] },
                },
                render: (slider, dropdown, bool, color, ref, roughness, metalness) => (
                    <TorsionRing
                        mesh={ref}
                        meshColor={color}
                        stacks={64}
                        majorR={dropdown.majorR.diameter / 2 + slider.minorR / 2}
                        minorR={slider.minorR / 2}
                        twistAll={bool.twistAll}
                        twist={slider.twist}
                        inflate={slider.inflate}
                        scaleA={1}
                        scaleB={1}
                        scaleC={slider.scaleC / 2}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
            [JewelryType.Bracelet]: {
                description:
                    'Torsion bracelet is a generativelly created pattern from the twisted torus. By adjusting the twist and screw parameters, the torus changes its shape.',
                sliderParameters: {
                    scaleC: { name: 'Height', tag: 'general', type: 'slider', value: 7, min: 3, max: 10, step: 0.1 },
                    minorR: {
                        name: 'Wall thickness',
                        tag: 'general',
                        type: 'slider',
                        value: 1,
                        min: materials.Plastic.thicknessMinimum,
                        max: 1.5,
                        step: 0.1,
                    },
                    screw: {
                        name: 'Screw offset',
                        type: 'slider',
                        tag: 'collection',
                        value: 0,
                        min: 0,
                        max: 10,
                        step: 0.1,
                    },
                    twist: {
                        name: 'Twist',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: -5,
                        max: 5,
                        step: 0.5,
                    },
                },
                switchParameters: {
                    twistAll: { name: 'Twist all?', tag: 'collection', type: 'toggle', value: false },
                },
                dropdownParameters: {
                    majorR: { name: 'Sizing', tag: 'general', type: 'dropdown', size: braceletSizes[0] },
                },
                render: (slider, dropdown, bool, color, ref, roughness, metalness) => (
                    <TorsionBracelet
                        mesh={ref}
                        meshColor={color}
                        stacks={64}
                        majorR={dropdown.majorR.diameter / 2 + slider.minorR / 2}
                        minorR={slider.minorR / 2}
                        twistAll={bool.twistAll}
                        twist={slider.twist}
                        scaleA={1}
                        scaleB={1}
                        scaleC={slider.scaleC / 2}
                        screw={slider.screw}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
            [JewelryType.Earring]: {
                description:
                    'Torsion earring is a generativelly created pattern from the twisted torus. By adjusting the twist and inflate parameters, the torus changes its shape.',
                sliderParameters: {
                    majorR: { name: 'Width', type: 'slider', tag: 'general', value: 13, min: 5, max: 20, step: 0.1 },
                    minorR: {
                        name: 'Wall thickness',
                        type: 'slider',
                        tag: 'general',
                        value: 2,
                        min: materials.Plastic.thicknessMinimum,
                        max: 2,
                        step: 0.1,
                    },
                    inflate: {
                        name: 'Inflate',
                        tag: 'collection',
                        type: 'slider',
                        value: 0.5,
                        min: 0,
                        max: 1,
                        step: 0.1,
                    },
                    twist: {
                        name: 'Twist',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: -5,
                        max: 5,
                        step: 0.5,
                    },

                    scaleC: { name: 'Depth', tag: 'general', type: 'slider', value: 2, min: 1, max: 3, step: 0.1 },
                },
                switchParameters: {
                    twistAll: { name: 'Twist all?', tag: 'collection', type: 'toggle', value: true },
                },
                dropdownParameters: {},
                render: (slider, _, bool, color, ref, roughness, metalness) => (
                    <TorsionEarring
                        mesh={ref}
                        meshColor={color}
                        stacks={64}
                        twistAll={bool.twistAll}
                        twist={slider.twist}
                        majorR={slider.majorR / 2}
                        minorR={slider.minorR / 2}
                        inflate={slider.inflate}
                        scaleA={1}
                        scaleB={1}
                        scaleC={slider.scaleC / 2}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
            [JewelryType.Pendant]: {
                description:
                    'Torsion pendant is a generativelly created pattern from the twisted torus. By adjusting the twist parameters, the torus changes its shape.',
                sliderParameters: {
                    majorR: { name: 'Width', type: 'slider', tag: 'general', value: 8, min: 3, max: 9, step: 0.1 },
                    minorR: {
                        name: 'Wall thickness',
                        type: 'slider',
                        tag: 'general',
                        value: 2,
                        min: materials.Plastic.thicknessMinimum,
                        max: 2,
                        step: 0.1,
                    },
                    scaleC: { name: 'Depth', type: 'slider', tag: 'general', value: 1, min: 1, max: 1.5, step: 0.1 },
                    twist: {
                        name: 'Twist',
                        tag: 'collection',
                        type: 'slider',
                        value: 3,
                        min: -5,
                        max: 5,
                        step: 0.5,
                    },
                },
                switchParameters: {
                    twistAll: { name: 'Twist all?', tag: 'collection', type: 'toggle', value: true },
                },
                dropdownParameters: {},
                render: (slider, _, bool, color, ref, roughness, metalness) => (
                    <TorsionPendant
                        mesh={ref}
                        meshColor={color}
                        stacks={64}
                        twistAll={bool.twistAll}
                        twist={slider.twist}
                        majorR={slider.majorR / 2}
                        minorR={slider.minorR / 2}
                        scaleA={1}
                        scaleB={1}
                        scaleC={slider.scaleC / 2}
                        roughness={roughness}
                        metalness={metalness}
                    />
                ),
            },
        },
    },
};
