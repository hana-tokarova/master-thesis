import { useMemo } from "react";
import * as THREE from 'three';

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

const createSpiralPoints = (index: number, initialSideLength: number, offset: number, initialAngleRadians: number, angleIncrement: number) => {
    const points = [];

    let currentPosition = new THREE.Vector3(0, 0, 0);
    let direction = new THREE.Vector3(1, 0, 0);
    let sideLength = initialSideLength;
    let angleRadians = initialAngleRadians;

    points.push(currentPosition.clone());

    const axisOfRotation = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i < index; i++) {
        // Calculate next point based on the current direction and side length
        const nextPoint = currentPosition.clone().add(direction.clone().multiplyScalar(sideLength));
        points.push(nextPoint.clone());
        currentPosition = nextPoint; // Update current position

        // Rotate direction for the next side
        direction.applyAxisAngle(axisOfRotation, angleRadians);

        if (i % 4 === 1) {
            angleRadians += angleIncrement;
            sideLength -= offset;
        }
    }

    return points;
}

export const PlowyRing = ({ mesh, meshColor, majorR, minorR, scaleA, scaleB, scaleC }: PlowyProps) => {
    const geometry = useMemo(() => {
        const path = createSpiralPoints(4, 100, 5, Math.PI / 2, Math.PI / 180);
        const curve = new THREE.CatmullRomCurve3(path, false, 'catmullrom', 0.01);

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 3);
        shape.lineTo(3, 3);
        shape.lineTo(3, 0);
        shape.lineTo(0, 0);

        const extrudeSettings = {
            steps: 1000,
            bevelEnabled: false,
            extrudePath: curve,
        };

        const ringM = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // const changedNormals = BufferGeometryUtils.toCreasedNormals(ringMesh, Math.PI / 96);
        // const mergedVertices = BufferGeometryUtils.mergeVertices(changedNormals, 0.01);
        // mergedVertices.computeVertexNormals();
        return ringM;
    }, []);

    return (
        <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} rotation={new THREE.Euler(0, 0, 0)}>
            <meshLambertMaterial attach="material" color={meshColor} />
        </mesh>
    );
}