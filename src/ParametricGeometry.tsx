import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';

type ParametricSurfaceProps = {
    parametricFunction: (u: number, v: number, target: THREE.Vector3) => void;
    mesh: React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;
    meshColor: string;
    slices: number;
    stacks: number;
}

export const ParametricSurface = ({ parametricFunction, mesh, meshColor, slices, stacks }: ParametricSurfaceProps) => {
    const geometry = useMemo(() => {
        return new ParametricGeometry(parametricFunction, slices, stacks);
    }, [parametricFunction, slices, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshStandardMaterial attach="material" flatShading={false} color={meshColor} side={0} />
        </mesh>
    );
};

export const parametricTwistedTorus = (s: number, majorR: number, minorR: number) => {
    return (u: number, v: number, target: THREE.Vector3) => {

        const smoothStep = (edge0: number, edge1: number, x: number): number => {
            x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
            // Evaluate polynomial
            // 3x^2 - 2x^3
            return x * x;
        };

        // Define start and end of the twist section
        const startTwistU = 0.25;
        const endTwistU = 0.75;
        // Calculate smooth transition for twisting
        let t;
        if (u >= startTwistU && u <= endTwistU) {
            t = 10 * Math.sin(u * Math.PI * 2);
        } else {
            t = 0; // No twist outside the specified range
        }
        // Apply smooth step to t for a smoother transition
        const smoothT = t * smoothStep(startTwistU, endTwistU, u) * smoothStep(endTwistU, startTwistU, u);

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const r = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = s * (majorR + r * minorR * Math.cos(v + smoothT * u)) * Math.cos(u);
        const y = s * (majorR + r * minorR * Math.cos(v + smoothT * u)) * Math.sin(u);
        const z = s * r * Math.sin(v + smoothT * u);

        target.set(x, y, z);
    };
};
