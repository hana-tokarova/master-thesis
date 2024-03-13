import { LissajouCurve } from "./LissajouCurve";
import { ParametricSurface } from "./ParametricGeometry";

export enum CollectionType {
    Lissajous = 'lissajous',
    Torsion = 'torsion'
}

enum JewelryType {
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

type Jewelry = {
    name: string;
    description: string;
    // type: { [key in JewelryType]: JewelryType; }
    parameters: {
        [key: string]: Parameter;
    };
    render: (params: { [key: string]: number }, color: string, ref: React.RefObject<THREE.Mesh>) => JSX.Element;
}

export const collections: {
    [key in CollectionType]: Jewelry
} = {
    lissajous: {
        name: 'Lissajous',
        description: 'Lissajous curve',
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

    torsion: {
        name: 'Torsion',
        description: 'Twisted parametric surface',
        parameters: {
            majorR: { value: 4, min: 1, max: 10, step: 1 },
            minorR: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
        },
        render: (params, color, ref) => <ParametricSurface
            mesh={ref}
            meshColor={color}
            slices={200}
            stacks={200}
            majorR={params.majorR}
            minorR={params.minorR}
        />
    }
}