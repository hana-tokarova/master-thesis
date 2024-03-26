import { useMemo } from "react";
import { Euler } from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type MeshRef = React.RefObject<THREE.Mesh>;

type PlowyProps = {
    mesh: MeshRef;
    meshColor: string;
}

const torus = (majorR: number, minorR: number) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        let x = (majorR + minorR * Math.cos(v)) * Math.cos(u);
        let y = (majorR + minorR * Math.cos(v)) * Math.sin(u);
        let z = 8 * minorR * Math.sin(v);

        const noise = new ImprovedNoise();
        const scale = 0.5;
        let p = noise.noise(x * scale, y * scale, z * scale);

        const quantizationStep = 2;
        p = Math.floor(p * quantizationStep) / quantizationStep;

        if ((v >= 0 && v <= Math.PI / 2) || (v >= 3 * Math.PI / 2 && v <= 2 * Math.PI)) {
            const displacement = p * 2; // Increase displacement magnitude
            x += displacement;
            y += displacement;
            z += displacement;
        }

        target.set(x, y, z);
    };
};

export const PlowyRing = ({ mesh, meshColor }: PlowyProps) => {
    const geometry = useMemo(() => {
        const func = torus(22, 0.6);
        const ringMesh = new ParametricGeometry(func, 16, 8);

        const changedNormals = BufferGeometryUtils.toCreasedNormals(ringMesh, Math.PI / 12);
        return changedNormals;
    }, []);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}