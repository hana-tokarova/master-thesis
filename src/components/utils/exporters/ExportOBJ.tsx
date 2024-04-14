import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { saveString } from "./Saving";

export const exportMeshOBJ = (mesh: THREE.Mesh) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const exporter = new OBJExporter();
    const data = exporter.parse(scene);

    saveString(data, clonedMesh.uuid + '.obj');
};