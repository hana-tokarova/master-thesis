import { LissajousBracelet, LissajousPendant, LissajousRing } from "./LissajousCollection";
import { TorsionRing } from "./TorsionCollection";
import { RandomIntFromInterval } from "./Utils";

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

type Parameter = {
    value: number;
    min: number;
    max: number;
    step: number;
}

type JewelryMesh = {
    parameters: {
        [key: string]: Parameter;
    };
    render: (params: { [key: string]: number }, color: string, ref: React.RefObject<THREE.Mesh>) => JSX.Element;
}

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
                parameters: {
                    a: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    b: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    r: { value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                render: (params, color, ref) => <LissajousRing
                    mesh={ref}
                    meshColor={color}
                    meshRadius={params.r}
                    parameterA={params.a}
                    parameterB={params.b}
                />
            },
            [JewelryType.Bracelet]: {
                parameters: {
                    a: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    b: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    r: { value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                render: (params, color, ref) => <LissajousBracelet
                    mesh={ref}
                    meshColor={color}
                    meshRadius={params.r}
                    parameterA={params.a}
                    parameterB={params.b}
                />
            },
            [JewelryType.Pendant]: {
                parameters: {
                    a: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    b: { value: Math.floor(RandomIntFromInterval(1, 11)), min: 1, max: 10, step: 1 },
                    r: { value: 0.5, min: 0.1, max: 1, step: 0.01 },
                },
                render: (params, color, ref) => <LissajousPendant
                    mesh={ref}
                    meshColor={color}
                    meshRadius={params.r}
                    parameterA={params.a}
                    parameterB={params.b}
                />
            },
        }
    },

    [CollectionType.Torsion]: {
        name: 'Torsion',
        description: 'Twisted surface',
        meshes: {
            [JewelryType.Ring]: {
                parameters: {
                    slices: { value: 75, min: 50, max: 100, step: 1 },
                    stacks: { value: 75, min: 50, max: 100, step: 1 },
                    majorR: { value: 4, min: 1, max: 10, step: 1 },
                    minorR: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
                },
                render: (params, color, ref) => <TorsionRing
                    mesh={ref}
                    meshColor={color}
                    slices={params.slices}
                    stacks={params.stacks}
                    majorR={params.majorR}
                    minorR={params.minorR}
                />
            },
        },
    }
}