import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';

type MeshRef = React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;

type ParametricSurfaceProps = {
    mesh: MeshRef;
    meshColor: string;
    slices: number;
    stacks: number;
    majorR: number;
    minorR: number;
}

export const ParametricSurface = ({ mesh, meshColor, slices, stacks, majorR, minorR }: ParametricSurfaceProps) => {
    const geometry = useMemo(() => {
        const func = parametricTwistedTorus(4, majorR, minorR, false);
        return new ParametricGeometry(func, slices, stacks);
    }, [majorR, minorR, slices, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const parametricTwistedTorus = (s: number, majorR: number, minorR: number, twistAll: boolean) => {
    return (u: number, v: number, target: THREE.Vector3) => {

        const smoothStep = (edge0: number, edge1: number, x: number): number => {
            x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            // return x * x * (3 - 3 * x * x);
            return x * x;
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
                t = 10 * Math.sin(u * Math.PI * 2);
            } else {
                t = 0; // No twist outside the specified range
            }

            smoothT = t * smoothStep(startTwistU, endTwistU, u) * smoothStep(endTwistU, startTwistU, u);
        }

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const r = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = s * (majorR + r * minorR * Math.cos(v + smoothT * u)) * Math.cos(u);
        const y = s * (majorR + r * minorR * Math.cos(v + smoothT * u)) * Math.sin(u);
        const z = s * r * Math.sin(v + smoothT * u);

        target.set(x, y, z);
    };
};
