import { useMemo } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

type MeshRef = React.RefObject<THREE.Mesh>;

type TorsionProps = {
    mesh: MeshRef;
    meshColor: string;
    stacks: number;
    majorR: number;
    minorR: number;
    twistAll: boolean;
    twist: number;
    scaleA: number;
    scaleB: number;
    scaleC: number;
    inflate?: number;
    screw?: number;
}

const smoothStep = (edge0: number, edge1: number, x: number) => {
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));

    // return x * x * (3 - 2 * x);
    // return x * x * x * 5;
    return x * x * x * (x * (x * 6 - 15) + 10);
};

const inflateMesh = (inflate: number, u: number) => {
    let inflateX;
    let inflateZ;

    if (inflate === undefined) {
        inflateX = 1;
        inflateZ = 1;
    } else {
        inflateX = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? inflate * (u / 2) : 1;
        inflateZ = (u > Math.PI / 2 && u < 3 * (Math.PI / 2)) ? (1 + inflate * (Math.cos(u - Math.PI))) : 1;
    }

    return { inflateX, inflateZ };
}

const twistMesh = (twistAll: boolean, u: number, twist: number, start: number, end: number) => {
    let smoothTwist;

    if (twistAll) {
        smoothTwist = twist;
    } else {
        let t;

        if (u >= start && u <= end) {
            t = twist * Math.sin(u * Math.PI);
        } else {
            t = 0;
        }

        smoothTwist = t * smoothStep(start, end, u) * smoothStep(end, start, u);
    }

    return smoothTwist;
}

const calculateDetail2D = (majorR: number, twist: number) => {
    const detail = Math.floor((majorR * 2 * Math.PI * Math.abs(twist === 0 ? 1 : twist)));
    return detail > 1000 ? 1000 : detail;
}

const taperEdge = (majorR: number, u: number, lowerFallOff: number, upperFallOff: number) => {
    let edgeTaper = 1;

    if (u > upperFallOff) {
        edgeTaper = (1 - u) / (1 - upperFallOff);
    } else if (u < lowerFallOff) {
        edgeTaper = u / (lowerFallOff);
    }

    return edgeTaper === 1 ? 1 : Math.max(0.00001, 1 - Math.pow(majorR, -5 * edgeTaper));
}

const torsion = (
    scaleA: number,
    scaleB: number,
    scaleC: number,
    majorR: number,
    minorR: number,
    twist: number,
    twistAll: boolean,
    inflate: number
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0.10, 0.90);

        u *= 2 * Math.PI;
        v *= 2 * Math.PI;

        const { inflateX, inflateZ } = inflateMesh(inflate, u);
        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * squared * inflateX * Math.cos(v + smoothTwist * u)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * squared * Math.cos(v + smoothTwist * u)) * Math.sin(u);
        const z = scaleC * squared * inflateZ * Math.sin(v + smoothTwist * u);

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
    screw: number
) => {
    return (u: number, v: number, target: THREE.Vector3) => {
        const smoothTwist = twistMesh(twistAll, u, twist, 0.10, 0.90);
        const taper = taperEdge(majorR, u, 0.10, 0.90);

        u *= 1.8 * Math.PI;
        v *= 2 * Math.PI;

        const squared = (Math.cos(v) ** 10 + Math.sin(v) ** 10) ** (-1 / 10);

        const x = scaleA * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist * u)) * Math.cos(u);
        const y = scaleB * (majorR + minorR * taper * squared * Math.cos(v + smoothTwist * u)) * Math.sin(u);
        const z = scaleC * taper * squared * Math.sin(v + smoothTwist * u) + ((screw * u) / Math.PI);

        target.set(x, y, z);
    };
}

export const TorsionRing = ({ mesh, meshColor, majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const ringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist), stacks);
        ringMesh.deleteAttribute('normal');
        ringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(ringMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, Math.PI)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const TorsionBracelet = ({ mesh, meshColor, majorR, minorR, twistAll, twist, scaleA, scaleB, scaleC, stacks, screw }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = taperedTorsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, screw!);

        const braceletMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist), stacks);
        braceletMesh.deleteAttribute('normal');
        braceletMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(braceletMesh, 0.01);
        mergedVertices.computeVertexNormals();

        return mergedVertices;
    }, [majorR, minorR, stacks, twist, twistAll, screw, scaleA, scaleB, scaleC]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(Math.PI / 2, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}

export const TorsionEarring = ({ mesh, meshColor, majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist), stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderMesh = new THREE.TorusGeometry(1, 0.5, 32, 64);
        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(new THREE.Vector3(majorR + minorR + 0.7, 0, 0));
        holderMesh.applyMatrix4(translateHolder);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const mergedMesh = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedMesh.computeVertexNormals();

        return mergedMesh;
    }, [stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 4, Math.PI / 2)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};

export const TorsionPendant = ({ mesh, meshColor, majorR, minorR, twistAll, twist, inflate, scaleA, scaleB, scaleC, stacks }: TorsionProps) => {
    const geometry = useMemo(() => {
        const func = torsion(scaleA, scaleB, scaleC, majorR, minorR, twist, twistAll, inflate!);

        const earringMesh = new ParametricGeometry(func, calculateDetail2D(majorR, twist), stacks);
        earringMesh.deleteAttribute('normal');
        earringMesh.deleteAttribute('uv');
        const mergedVertices = BufferGeometryUtils.mergeVertices(earringMesh, 0.01);

        const holderMesh = new THREE.TorusGeometry(1, 0.5, 32, 64);
        const rotationHolder = new THREE.Matrix4().makeRotationX(Math.PI / 2);
        holderMesh.applyMatrix4(rotationHolder);
        const translateHolder = new THREE.Matrix4().makeTranslation(new THREE.Vector3(majorR + minorR + 0.7, 0, 0));
        holderMesh.applyMatrix4(translateHolder);
        holderMesh.deleteAttribute('uv');
        holderMesh.deleteAttribute('normal');

        const mergedMesh = BufferGeometryUtils.mergeGeometries([mergedVertices, holderMesh]);
        mergedMesh.computeVertexNormals();

        return mergedMesh;
    }, [stacks, twistAll, twist, scaleA, scaleB, scaleC, majorR, minorR, inflate]);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new Euler(0, Math.PI / 4, Math.PI / 2)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
};
