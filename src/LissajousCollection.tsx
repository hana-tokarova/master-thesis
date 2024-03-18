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
    scaleA: number;
    scaleB: number;
    scaleC?: number;
};

const makeLissajousCurve3D = (nbSteps: number, sA: number, sB: number, sC: number, a: number, b: number, c: number, delta: number, gamma: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
        const x = sA * Math.sin(a * t);
        const y = (sB / 4) * Math.sin(b * t + delta);
        const z = sC * Math.sin(c * t + gamma);

        points.push(new THREE.Vector3(x, y, z));
    }

    return points;
};

const makeLissajousCurve2D = (nbSteps: number, sA: number, sB: number, lA: number, lB: number, a: number, b: number, delta: number) => {
    const points = [];
    const range = 2 * Math.PI;
    const stepSize = range / nbSteps;

    for (let t = -range / 2; t <= range / 2; t += stepSize) {
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

export const LissajousBracelet = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points2D = makeLissajousCurve2D(200, scaleA, scaleB, 1, 5, parameterA, parameterB, Math.PI / 2);

    const geometry = useMemo(() => {
        const path = new THREE.CatmullRomCurve3(points2D, true);

        const semicircleShape = new Shape();
        semicircleShape.arc(0, 0, meshRadius, Math.PI / 2, -Math.PI / 2, true); // Draw half-circle

        const extrudeSettings = {
            steps: 4000,
            extrudePath: path,
        };

        const extrudeGeometry = new ExtrudeGeometry(semicircleShape, extrudeSettings);

        // Soft surface in the making
        extrudeGeometry.deleteAttribute('normal');
        extrudeGeometry.deleteAttribute('uv');
        const mergedGeometry = BufferGeometryUtils.mergeVertices(extrudeGeometry);
        mergedGeometry.computeVertexNormals();

        const ending1 = new THREE.SphereGeometry(meshRadius + 0.5, 16, 16);
        ending1.deleteAttribute('normal');
        ending1.deleteAttribute('uv');
        const t = Math.PI / 2;
        const translationMatrix = new THREE.Matrix4().makeTranslation(new THREE.Vector3((scaleA / 1) * (Math.sin(parameterA * t + Math.PI / 2)), (scaleB / 5) * Math.sin(parameterB * t), 0));
        ending1.applyMatrix4(translationMatrix);
        const mergedGeometry2 = BufferGeometryUtils.mergeVertices(ending1);
        mergedGeometry2.computeVertexNormals();
        const mergedGeometry3 = BufferGeometryUtils.mergeGeometries([mergedGeometry, mergedGeometry2]);

        bendLissajous(mergedGeometry3, 2 * Math.pow(scaleA, -0.9));

        return mergedGeometry3;
    }, [points2D, meshRadius, scaleA, scaleB, parameterA, parameterB]);

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
    const points = makeLissajousCurve3D(200, scaleA, scaleB, scaleC!, parameterA, parameterB, parameterC!, Math.PI, Math.PI / 2);

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
        const translationMatrix = new THREE.Matrix4().makeTranslation(0, 0, scaleC! * Math.sin(Math.PI / 2) + meshRadius + 0.7);
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

export const LissajousRing = ({ parameterA, parameterB, scaleA, scaleB, meshRadius, mesh, meshColor }: LissajousProps) => {
    const points = makeLissajousCurve3D(100, scaleA, scaleB, scaleA, parameterA, parameterB, parameterA, Math.PI, Math.PI / 2);

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
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} />
        </mesh>
    );

};
