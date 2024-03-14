import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler, ExtrudeGeometry, Shape } from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';


type MeshRef = React.RefObject<THREE.Mesh>;

type LissajousProps = {
    mesh: MeshRef;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC?: number;
};

// ked dosadim za t = 0, tak dostavam ten bod kde chcem dat kruzok, to iste aj pre 2d
const makeLissajousCurve3D = (nbSteps: number, s: number, a: number, b: number, c: number, delta: number, gamma: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = s * Math.sin(a * t);
        const y = (s / 4) * Math.sin(b * t + delta);
        const z = s * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

const makeLissajousCurve2D = (nbSteps: number, s: number, lA: number, lB: number, a: number, b: number, delta: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = (s / lA) * Math.sin(a * t + delta);
        const y = (s / lB) * Math.sin(b * t);

        points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
};

const bendLissajous = (geometry: THREE.BufferGeometry, angle: number) => {
    const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const v = positionAttribute.array;

    for (let i = 0; i < v.length; i += 3) {
        const x = v[i];
        const y = v[i + 1];
        const z = v[i + 2];

        // Bending along the y-axis
        const theta = x * angle;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        // Applying bending calculations
        v[i] = (z - 1.0 / angle) * sinTheta;
        v[i + 1] = y;
        v[i + 2] = -(z - 1.0 / angle) * cosTheta;
    }
};

export const LissajousBracelet = ({ parameterA, parameterB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points2D = makeLissajousCurve2D(200, 30, 1, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points2D, true, "centripetal");

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, Math.PI / 2 + Math.PI / 4, -Math.PI / 2 - Math.PI / 4, true); // Draw half-circle

        const extrudeSettings = {
            steps: 2000,
            extrudePath: path,
        };

        console.log(semicircleShape, meshRadius)
        const extrudeGeometry = new ExtrudeGeometry(semicircleShape, extrudeSettings);

        bendLissajous(extrudeGeometry, 0.09); // Adjust the bending angle as needed

        extrudeGeometry.deleteAttribute('normal');
        extrudeGeometry.deleteAttribute('uv');
        const mergedGeometry = BufferGeometryUtils.mergeVertices(extrudeGeometry);
        mergedGeometry.computeVertexNormals();

        return mergedGeometry;
    }, [points2D, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)} castShadow receiveShadow>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousPendant = ({ parameterA, parameterB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points2D = makeLissajousCurve2D(200, 30, 5, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points2D, true, "centripetal");

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, -Math.PI, Math.PI, true);

        const extrudeSettings = {
            steps: 2000,
            extrudePath: path,
        };

        const extrudeGeometry = new ExtrudeGeometry(semicircleShape, extrudeSettings);
        extrudeGeometry.deleteAttribute('normal');
        extrudeGeometry.deleteAttribute('uv');

        const mergedGeometry = BufferGeometryUtils.mergeVertices(extrudeGeometry);
        mergedGeometry.computeVertexNormals();

        const hole = new THREE.TorusGeometry(0.7 + meshRadius, meshRadius, 16, 32);
        hole.deleteAttribute('normal');
        hole.deleteAttribute('uv');

        const translationMatrix = new THREE.Matrix4().makeTranslation((30 / 5) * Math.sin(Math.PI / 2) + meshRadius + 0.7, 0, 0);
        hole.applyMatrix4(translationMatrix);
        const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        hole.applyMatrix4(rotationMatrix);

        const mergedGeometry2 = BufferGeometryUtils.mergeVertices(hole);
        mergedGeometry2.computeVertexNormals();

        const mergedGeometry3 = BufferGeometryUtils.mergeGeometries([mergedGeometry, mergedGeometry2]);

        return mergedGeometry3;
    }, [points2D, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, Math.PI / 2)} castShadow receiveShadow>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousRing = ({ parameterA, parameterB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points = makeLissajousCurve3D(100, 20, parameterA, parameterB, parameterA, Math.PI, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points, true, "centripetal");

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, -Math.PI, Math.PI, true);

        const extrudeSettings = {
            steps: 2000,
            extrudePath: path,
        };

        const extrudeGeometry = new ExtrudeGeometry(semicircleShape, extrudeSettings);
        extrudeGeometry.deleteAttribute('normal');
        extrudeGeometry.deleteAttribute('uv');
        const mergedGeometry = BufferGeometryUtils.mergeVertices(extrudeGeometry);
        mergedGeometry.computeVertexNormals();

        return mergedGeometry;
    }, [points, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)} castShadow receiveShadow>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );

};
