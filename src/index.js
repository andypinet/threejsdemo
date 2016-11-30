import {MyScene} from "./scene";
import {MyPerspectiveCamera} from "./camera";
import {MyWebGLRenderer} from "./renderer";
import {AppendToDocument} from "./dom";
import {MyCubeGeometry} from "./geometry";
import {MyMeshBasicMaterial} from "./material";
import {MyMesh} from "./mesh";
import {bootstrapRender} from "./bootstrap";
import {getRandomColor} from "./utils/color";
import {MyObject3d} from "./object";
import * as Main from './examples/box';

let scene = new MyScene();
let camera = new MyPerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);//
let renderer = new MyWebGLRenderer({
    antialias: true
});
let group = new MyObject3d();

// init
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;
AppendToDocument(renderer);

// main
bootstrapRender(function () {
})();

var webglthree = Main.init({
    scene,
    camera,
    renderer,
    group
});

window.renderThree = function () {
    webglthree.animate();
};

window.renderThree();

window.renderer = renderer;