import { useMemo } from "react";
import { Euler } from "three";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type MeshRef = React.RefObject<THREE.Mesh>;

type PlowyProps = {
    mesh: MeshRef;
    meshColor: string;
    majorR: number;
    minorR: number;
    scaleA: number;
    scaleB: number;
    scaleC: number;
}

const torus = (majorR: number, minorR: number, scaleA: number, scaleB: number, scaleC: number) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        let x = scaleA * (majorR + minorR * Math.cos(v)) * Math.cos(u);
        let y = scaleB * (majorR + minorR * Math.cos(v)) * Math.sin(u);
        let z = scaleC * Math.sin(v);

        const noise = new ImprovedNoise();
        const scale = 0.3;
        let p = noise.noise(x * scale, y * scale, z * scale);

        const quantizationStep = 2;
        p = Math.floor(p * quantizationStep) / quantizationStep;

        if (((v >= 0 && v <= Math.PI / 2) || (v >= 3 * Math.PI / 2 && v <= 2 * Math.PI)) && (u >= Math.PI / 2 && u <= 3 * Math.PI / 2)) {
            x += p * 5;
            y += p * 5;
            z += p;
        }

        target.set(x, y, z);
    };
};

export const PlowyRing = ({ mesh, meshColor, majorR, minorR, scaleA, scaleB, scaleC }: PlowyProps) => {
    const geometry = useMemo(() => {
        const func = torus(majorR, minorR, scaleA, scaleB, scaleC);
        const ringMesh = new ParametricGeometry(func, 10, 8);

        const changedNormals = BufferGeometryUtils.toCreasedNormals(ringMesh, Math.PI / 96);
        const mergedVertices = BufferGeometryUtils.mergeVertices(changedNormals, 0.01);
        mergedVertices.computeVertexNormals();
        return mergedVertices;
    }, [majorR, minorR, scaleA, scaleB, scaleC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}