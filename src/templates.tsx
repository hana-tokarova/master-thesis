import { LissajouCurve } from "./LissajouCurve";
import { ParametricSurface } from "./ParametricGeometry";

type Parameter = {
    value: number;
    min: number;
    max: number;
    step: number;
}

type Template = {
    name: string;
    description: string;
    parameters: {
        [key: string]: Parameter;
    };
    renderer: (params: { [key: string]: number }, color: string, ref: React.RefObject<THREE.Mesh>) => JSX.Element;
}

export const templates: {
    [key: string]: Template
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
        renderer: (params, color, ref) => <LissajouCurve
            mesh={ref}
            meshColor={color}
            meshRadius={params.r}
            parameterA={params.a}
            parameterB={params.b}
            parameterC={params.c}
        />
    },
    twistedTorus: {
        name: 'Twisted Torus',
        description: 'Twisted torus',
        parameters: {
            majorR: { value: 4, min: 1, max: 10, step: 1 },
            minorR: { value: 0.3, min: 0.1, max: 1, step: 0.1 },
        },
        renderer: (params, color, ref) => <ParametricSurface
            mesh={ref}
            meshColor={color}
            slices={200}
            stacks={200}
            majorR={params.majorR}
            minorR={params.minorR}
        />
    }
}