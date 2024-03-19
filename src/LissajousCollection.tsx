import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler, ExtrudeGeometry, Shape, TubeGeometry } from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { lcm } from './Utils';


type MeshRef = React.RefObject<THREE.Mesh>;

type LissajousProps = {
    mesh: MeshRef;
    meshColor: string;
    meshRadius: number;
    parameterA: number;
    parameterB: number;
    parameterC?: number;
    scaleA: number;
    scaleB: number;
    scaleC?: number;
};

const makeLissajousCurve3D = (nbSteps: number, sA: number, sB: number, sC: number, lA: number, lB: number, lC: number, a: number, b: number, c: number, delta: number, gamma: number) => {
    const points = [];
    const range = 2 * Math.PI//((2 * Math.PI) * (lcm(a, b))) / (a * b)
    const stepSize = range / nbSteps;

    for (let t = 0; t <= range; t += stepSize) {
        const x = (sA / lA) * Math.sin(a * t);
        const y = (sB / lB) * Math.sin(b * t + delta);
        const z = (sC / lC) * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

const makeLissajousCurve2D = (nbSteps: number, sA: number, sB: number, lA: number, lB: number, a: number, b: number, delta: number) => {

    if (a > 1) { // skipping those that were already in the sequence
        b += Math.floor((b - 1) / (a - 1));
    }

    // b *= a & (~(a - 1));

    const points = [];
    const range = (2 * Math.PI) * ((lcm(a, b)) / (a * b));
    const stepSize = range / nbSteps;

    for (let t = 0; t <= range; t += stepSize) {
        const x = (sA / lA) * Math.sin(a * t + delta);
        const y = (sB / lB) * Math.sin(b * t);

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

export const LissajousRing = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve3D(200, scaleA, scaleB, scaleA, 1, 4, 1, parameterA, parameterB, parameterA, Math.PI, Math.PI / 2);

    const geometry = useMemo(() => {
        const ringPath = new THREE.CatmullRomCurve3(lissajousPoints, true);
        const ringMesh = new TubeGeometry(ringPath, 800, meshRadius, 800, true);

        return ringMesh;
    }, [lissajousPoints, meshRadius]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const LissajousBracelet = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const lissajousPoints = makeLissajousCurve2D(100, scaleA, scaleB, 1, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const braceletPath = new THREE.CatmullRomCurve3(lissajousPoints, true);
        const braceletMesh = new TubeGeometry(braceletPath, 800, meshRadius, 800, true);

        bendLissajous(braceletMesh, 2 * Math.pow(scaleA, -0.9));

        return braceletMesh;
    }, [lissajousPoints, meshRadius, scaleA]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousPendant = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points2D = makeLissajousCurve2D(200, scaleA, scaleB, 5, 5, parameterA, parameterB, Math.PI / 2);

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

        const holder = new THREE.TorusGeometry(0.7 + meshRadius, meshRadius, 16, 32);
        holder.deleteAttribute('normal');
        holder.deleteAttribute('uv');

        const translationMatrix = new THREE.Matrix4().makeTranslation((scaleA / 5) * Math.sin(Math.PI / 2) + meshRadius + 0.7, 0, 0);
        holder.applyMatrix4(translationMatrix);
        const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holder.applyMatrix4(rotationMatrix);

        const mergedGeometry2 = BufferGeometryUtils.mergeVertices(holder);
        mergedGeometry2.computeVertexNormals();

        const mergedGeometry3 = BufferGeometryUtils.mergeGeometries([mergedGeometry, mergedGeometry2]);

        return mergedGeometry3;
    }, [points2D, meshRadius, scaleA]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 3, Math.PI / 2)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const LissajousEarring = ({ parameterA, parameterB, parameterC, scaleA, scaleB, scaleC, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points = makeLissajousCurve3D(200, scaleA, scaleB, scaleC!, 4, 4, 4, parameterA, parameterB, parameterC!, Math.PI, Math.PI / 2);

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

        const holder = new THREE.TorusGeometry(0.7 + meshRadius, meshRadius, 16, 32);
        holder.deleteAttribute('normal');
        holder.deleteAttribute('uv');

        const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holder.applyMatrix4(rotationMatrix);
        const translationMatrix = new THREE.Matrix4().makeTranslation(0, 0, scaleC! / 4 * Math.sin(Math.PI / 2) + meshRadius + 0.7);
        holder.applyMatrix4(translationMatrix);
        const rotationMatrix2 = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
        holder.applyMatrix4(rotationMatrix2);

        const mergedGeometry2 = BufferGeometryUtils.mergeVertices(holder);
        mergedGeometry2.computeVertexNormals();

        const mergedGeometry3 = BufferGeometryUtils.mergeGeometries([mergedGeometry, mergedGeometry2]);

        return mergedGeometry3;
    }, [points, meshRadius, scaleC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(-Math.PI / 2, 0, Math.PI / 3)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );
}
