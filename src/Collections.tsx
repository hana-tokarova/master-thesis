import { LissajouCurve } from "./LissajouCurve";
import { ParametricSurface } from "./ParametricGeometry";

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
    lissajous: {
        name: 'Lissajous',
        description: 'Lissajous surface',
        meshes: {
            ring: {
                parameters: {
                    a: { value: 5, min: 1, max: 10, step: 1 },
                    b: { value: 5, min: 1, max: 10, step: 1 },
                    c: { value: 3, min: 1, max: 10, step: 1 },
                    r: { value: 0.5, min: 0.1, max: 1, step: 0.1 },
                },
                render: (params, color, ref) => <LissajouCurve
                    mesh={ref}
                    meshColor={color}
                    meshRadius={params.r}
                    parameterA={params.a}
                    parameterB={params.b}
                    parameterC={params.c}
                />
            },
        }
    },

    torsion: {
        name: 'Torsion',
        description: 'Twisted surface',
        meshes: {
            ring: {
                parameters: {
                    slices: { value: 75, min: 50, max: 100, step: 1 },
                    stacks: { value: 75, min: 50, max: 100, step: 1 },
                    majorR: { value: 4, min: 1, max: 10, step: 1 },
                    minorR: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
                },
                render: (params, color, ref) => <ParametricSurface
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
