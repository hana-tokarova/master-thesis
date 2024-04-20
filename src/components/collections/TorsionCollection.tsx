import { useMemo } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type TorsionProps = {
    mesh: React.Ref<THREE.Mesh>;
    meshColor: string;
    stacks: number;
    majorR: number;
    minorR: number;
    twistAll: boolean;
    twist: number;
    scaleA: number;
    scaleB: number;
    scaleC: number;
    roughness: number;
    metalness: number;
    inflate?: number;
    screw?: number;
};

const makeCircleCurve2D = (nbSteps: number) => {
    const points = [];
    const stepSize = (Math.PI * 2) / nbSteps;

    for (let t = 0; t <= nbSteps; t++) {
        const x = Math.cos(t * stepSize);
        const y = Math.sin(t * stepSize);

        points.push(new THREE.Vector3(x, y, 0));
    }

    return points;
};

const smoothStep = (edge0: number, edge1: number, x: number) => {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return x * x * x * (x * (x * 6 - 15) + 10);
};

const inflateMesh = (i: number, u: number) => {
    let inflate;

    if (i === undefined) {
        inflate = 1;
    } else {
        inflate = u > Math.PI / 2 && u < 3 * (Math.PI / 2) ? i * 0.5 * (1 - Math.cos(u * 2 - Math.PI)) + 1 : 1;
    }

    return inflate;
};

const twistMesh = (twistAll: boolean, u: number, twist: number, start: number, end: number) => {
    let smoothTwist;

    if (twistAll) {
        smoothTwist = (Math.PI * u * twist) / 5;
    } else {
        let t;

        if (u >= start && u <= end) {
            t = twist;
        } else {
            t = 0;
        }

        smoothTwist = t * smoothStep(start, end, u) * smoothStep(end, start, u);
    }

    smoothTwist *= 10;

    return smoothTwist;
};

const calculateDetail2D = (majorR: number, twist: number) => {
    const detail = Math.floor(majorR * 2 * Math.PI * Math.abs(twist === 0 ? 1 : twist));
    return detail > 1000 ? 1000 : detail;
};

const taperEdge = (u: number, lowerFallOff: number, upperFallOff: number) => {
    let edgeTaper = 1;

    if (u > upperFallOff) {
        edgeTaper = (1 - u) / (1 - upperFallOff);
    } else if (u < lowerFallOff) {
        edgeTaper = u / lowerFallOff;
    }

    edgeTaper = 1 - edgeTaper;
    edgeTaper = Math.min(Math.max(0.00001, edgeTaper), 0.99999);

    return edgeTaper === 1 ? 1 : Math.sqrt(1 - edgeTaper * edgeTaper); //1 - Math.pow(majorR, -5 * edgeTaper));
};

const torsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    inflate: number,
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0, 1);

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const inflation = inflateMesh(inflate, u);
        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * squared * inflation * Math.cos(v + smoothTwist)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * squared * Math.cos(v + smoothTwist)) * Math.sin(u);
        const z = scaleC * squared * inflation * Math.sin(v + smoothTwist);

        target.set(x, y, z);
    };
};

const taperedTorsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    screw: number,
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0, 1);
        const taper = taperEdge(u, 0.1, 0.9);

        u *= 1.8 * Math.PI;
        v *= 2 * Math.PI;

        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist)) * Math.sin(u);
        const z = scaleC * taper * squared * Math.sin(v + smoothTwist) + (screw * u) / Math.PI;

        target.set(x, y, z);
    };
};

export const TorsionRing = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    roughness,
    metalness,
}: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const ringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 2, stacks);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        const meshRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        mergedVertices.applyMatrix4(meshRotation);

        return mergedVertices;
    }, [majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, Math.PI)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const TorsionBracelet = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    screw,
    roughness,
    metalness,
}: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = taperedTorsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, screw!);

        const braceletMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 2, stacks);
        braceletMesh.deleteAttribute('normal');
        braceletMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.02);
        mergedVertices.computeVertexNormals();

        const meshRotation = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        mergedVertices.applyMatrix4(meshRotation);

        return mergedVertices;
    }, [majorR, minorR, stacks, twist, twistAll, screw, scaleA, scaleB, scaleC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)}>
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const TorsionEarring = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    roughness,
    metalness,
}: TorsionProps) => {
    const holderPoints = makeCircleCurve2D(100);

    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 3, stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(majorR + minorR + 0.5, 0, 0);
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [holderPoints, stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, Math.PI / 2)}
        >
            <meshStandardMaterial attach="material" color={meshColor} roughness={roughness} metalness={metalness} />
        </mesh>
    );
};

export const TorsionPendant = ({
    mesh,
    meshColor,
    majorR,
    minorR,
    twistAll,
    twist,
    inflate,
    scaleA,
    scaleB,
    scaleC,
    stacks,
    metalness,
    roughness,
}: TorsionProps) => {
    const holderPoints = makeCircleCurve2D(100);

    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist) * 3, stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderPath = new THREE.CatmullRomCurve3(holderPoints);
        const holderMesh = new THREE.TubeGeometry(holderPath, 32, 0.3, 32, true);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(scaleA * (majorR + minorR + 0.5), 0, 0);
        holderMesh.applyMatrix4(translateHolder);

        const mergedGeometries = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedGeometries.computeVertexNormals();

        return mergedGeometries;
    }, [holderPoints, stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            position={[0, 0, 0]}
            rotation={new THREE.Euler(0, Math.PI / 2, Math.PI / 2)}
        >
            <meshStandardMaterial attach="material" color={meshColor} metalness={metalness} roughness={roughness} />
        </mesh>
    );
};
