import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';

type MeshRef = React.RefObject<THREE.Mesh>;

type TorsionProps = {
    mesh: MeshRef;
    meshColor: string;
    slices: number;
    stacks: number;
    majorR: number;
    minorR: number;
    twistAll: boolean;
    taper: boolean;
}

const twisting = (s: number, majorR: number, minorR: number, twistAll: boolean, taper: boolean) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothStep = (edge0: number, edge1: number, x: number) => {
            x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            return x * x * (4 - 4 * x); // skusit to spravit nejak symetrickejsie
        };

        const startTwistU = 0.10;
        const endTwistU = 0.90;

        let t;
        let smoothT;

        if (twistAll) {
            t = 3;
            smoothT = t;
        } else {
            if (u >= startTwistU && u <= endTwistU) {
                t = 4 * Math.sin(u * Math.PI * 2);
            } else {
                t = 0;
            }

            smoothT = t * smoothStep(startTwistU, endTwistU, u) * smoothStep(endTwistU, startTwistU, u);
        }

        let edgeTaper = 1;

        const upperEdgeFalloff = 0.9;
        const lowerEdgeFalloff = 1 - upperEdgeFalloff;

        if (u > upperEdgeFalloff) {
            // When we are ending the twist, we want to taper the edge
            edgeTaper = (1 - u) / (1 - upperEdgeFalloff);
        } else if (u < lowerEdgeFalloff) {
            // When we are starting the twist, we want to taper the edge
            edgeTaper = u / (lowerEdgeFalloff);
        }

        if (taper) {
            edgeTaper = edgeTaper === 1 ? 1 : 1 - Math.pow(2, -10 * edgeTaper);
            u *= 1.5 * Math.PI; // Adjust for 3/4 of a circle
        } else {
            edgeTaper = 1;
            u *= 2 * Math.PI;
        }

        v *= 2 * Math.PI;

        const r = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const cosV = Math.cos(v + smoothT * u);
        const sinV = Math.sin(v + smoothT * u);

        const x = s * (majorR + r * minorR * cosV * edgeTaper) * Math.cos(u);
        const y = s * (majorR + r * minorR * cosV * edgeTaper) * Math.sin(u);
        const z = edgeTaper * s * r * sinV * 0.5;

        target.set(x, y, z);
    };
};


export const TorsionRing = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = twisting(4, majorR, minorR, twistAll, taper);
        return new ParametricGeometry(func, slices, stacks);
    }, [majorR, minorR, slices, stacks, twistAll, taper]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const TorsionBracelet = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = twisting(4, majorR, minorR, twistAll, taper);
        return new ParametricGeometry(func, slices, stacks);
    }, [majorR, minorR, slices, stacks, twistAll, taper]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const TorsionEarring = ({ mesh, meshColor, slices, stacks, majorR, minorR, twistAll, taper }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = twisting(4, majorR, minorR, twistAll, taper);
        return new ParametricGeometry(func, slices, stacks);
    }, [majorR, minorR, slices, stacks, twistAll, taper]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 4, Math.PI / 2)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
};
