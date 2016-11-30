export function AppendToDocument(renderer) {
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
}