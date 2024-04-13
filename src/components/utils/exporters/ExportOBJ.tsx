import { Object3D } from "three";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { saveString } from "./Saving";

export const exportMeshOBJ = (mesh: Object3D) => {
    const clonedMesh = mesh.clone();
    const scene = mesh.parent!;

    const exporter = new OBJExporter();
    const data = exporter.parse(scene);

    saveString(data, clonedMesh.uuid + '.obj');
};