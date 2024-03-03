import * as THREE from 'three';
import { Euler } from 'three';

type MeshRef = React.RefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>;

type LissajouCurveProps = {
    mesh: MeshRef;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC: number;
};

const makeLissajousCurve3D = (nbSteps: number, s: number, a: number, b: number, c: number, delta: number, gamma: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    // Lissajou curve
    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = (s / 2) * Math.sin(a * t);
        const y = s * Math.sin(b * t + delta);
        const z = s * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

export const LissajouCurve = (props: LissajouCurveProps) => {
    const points = makeLissajousCurve3D(100, 20, props.parameterA, props.parameterB, props.parameterC, Math.PI, Math.PI / 2);
    const path = new THREE.CatmullRomCurve3(points, true, "centripetal");

    return (
        <mesh ref={props.mesh} position={[0, 0, 0]} rotation={new Euler(0, 0, Math.PI / 2)}>
            <tubeGeometry attach="geometry" args={[path, 512, props.meshRadius, 20, true]} />
            <meshStandardMaterial attach="material" flatShading={false} color={props.meshColor} />
        </mesh>
    );
};