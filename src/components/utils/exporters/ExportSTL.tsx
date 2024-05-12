import { Matrix4 } from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveArrayBuffer } from './Saving';

/**
 * Exports a mesh as an STL file.
 *
 * @param mesh - The mesh to be exported.
 * @param name - The name of the exported file.
 */
export const exportMeshSTL = (mesh: THREE.Mesh, name: string) => {
    const clonedMesh = mesh.clone();

    const rotationMatrix = new Matrix4().makeRotationX(Math.PI / 2);
    clonedMesh.applyMatrix4(rotationMatrix);
    clonedMesh.updateMatrixWorld();

    const exporter = new STLExporter();
    const data = exporter.parse(clonedMesh, { binary: true });

    saveArrayBuffer(data, name + '-' + clonedMesh.uuid + '.stl');
};
