import {EasingFunctions} from "../utils/animate";

function generateBox(injectors, de2ra, options) {
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var color = Math.random() * 0xffffff;
    var material = new THREE.MeshLambertMaterial({
        color: color,
        transparent: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set.apply(mesh.position, options.position);
    mesh.rotation.set(0, 0, 0);
    mesh.rotation.y = de2ra(-90);
    mesh.scale.set.apply(mesh.scale, options.scale);
    mesh.doubleSided = true;
    mesh.castShadow = true;
    injectors.scene.add(mesh);
    return {
        color,
        mesh
    };
}

export function init(injectors) {
    var de2ra = function(degree) { return degree*(Math.PI/180);};

    injectors.renderer.shadowMap.enabled = true;
    injectors.renderer.shadowMapSoft = true;
    // to antialias the shadow
    injectors.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.getElementById("WebGL-output").appendChild(injectors.renderer.domElement);

    injectors.camera.position.set(0, 6, 6);
    injectors.camera.lookAt(injectors.scene.position);
    injectors.scene.add(injectors.camera);

    // 盒子
    // var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // var color = Math.random() * 0xffffff;
    // var material = new THREE.MeshLambertMaterial({
    //     color: color,
    //     transparent: true
    // });
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0, 0, 0);
    // mesh.rotation.set(0, 0, 0);
    // mesh.rotation.y = de2ra(-90);
    // mesh.scale.set(1, 1, 1);
    // mesh.doubleSided = true;
    // mesh.castShadow = true;
    // injectors.scene.add(mesh);

    // generateBox(injectors, de2ra, {
    //     position: [3, 0, 0],
    //     scale: [1, 1, 1]
    // });
    var { color, mesh } = generateBox(injectors, de2ra, {
        position: [0, 0, 0],
        scale: [1, 1, 1]
    });

    // 地面
    var planeGeometry = new THREE.BoxGeometry( 10, 10, 0.1 );
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(0, -3, 0);
    planeMesh.rotation.set(0, 0, 0);
    planeMesh.rotation.x = de2ra(90);
    planeMesh.receiveShadow = true;
    injectors.scene.add(planeMesh);

    // 白色直光
    var object3d  = new THREE.DirectionalLight('white', 0.15);
    object3d.position.set(6,3,9);
    object3d.name = 'Back light';
    injectors.scene.add(object3d);

    // 白色直光
    object3d = new THREE.DirectionalLight('white', 0.35);
    object3d.position.set(-6, -3, 0);
    object3d.name   = 'Key light';
    injectors.scene.add(object3d);

    // 白色直光
    object3d = new THREE.DirectionalLight('white', 0.55);
    object3d.position.set(9, 9, 6);
    object3d.name = 'Fill light';
    injectors.scene.add(object3d);

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 3, 30, 3 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 45;
    injectors.scene.add( spotLight );


    var controls = new THREE.OrbitControls(injectors.camera, injectors.renderer.domElement);
    window.addEventListener( 'resize', onWindowResize, false );


    var controller = new function() {
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;
        this.rotationX = 0;
        this.rotationY = 90;
        this.rotationZ = 0;
        this.boxColor = color;
        this.castShadow = true;
        this.boxOpacity = 1;
    }();

    var gui = new dat.GUI();
    var f1 = gui.addFolder('Scale');
    f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
        mesh.scale.x = (controller.scaleX);
    });
    f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
        mesh.scale.y = (controller.scaleY);
    });
    f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
        mesh.scale.z = (controller.scaleZ);
    });

    var f2 = gui.addFolder('Position');
    f2.add(controller, 'positionX', -5, 5).onChange( function() {
        mesh.position.x = (controller.positionX);
    });
    f2.add(controller, 'positionY', -3, 5).onChange( function() {
        mesh.position.y = (controller.positionY);
    });
    f2.add(controller, 'positionZ', -5, 5).onChange( function() {
        mesh.position.z = (controller.positionZ);
    });

    var f3 = gui.addFolder('Rotation');
    f3.add(controller, 'rotationX', -180, 180).onChange( function() {
        mesh.rotation.x = de2ra(controller.rotationX);
    });
    f3.add(controller, 'rotationY', -180, 180).onChange( function() {
        mesh.rotation.y = de2ra(controller.rotationY);
    });
    f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
        mesh.rotation.z = de2ra(controller.rotationZ);
    });
    gui.addColor( controller, 'boxColor', color ).onChange( function() {
        mesh.material.color.setHex( dec2hex(controller.boxColor) );
    });
    gui.add( controller, 'castShadow', false ).onChange( function() {
        mesh.castShadow = controller.castShadow;
    });
    gui.add( controller, 'boxOpacity', 0.1, 1 ).onChange( function() {
        material.opacity = (controller.boxOpacity);
    });

    function dec2hex(i) {
        var result = "0x000000";
        if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
        else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
        else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
        else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
        else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
        else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
        if (result.length == 8){return result;}
    }

    function onWindowResize() {
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        injectors.camera.aspect = window.innerWidth / window.innerHeight;
        injectors.camera.updateProjectionMatrix();

        injectors.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    var start = null;

    function animate(timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;
        var y  = EasingFunctions.easeInQuad(Math.sin(progress / 1000));
        // mesh.position.y = -y;
        requestAnimationFrame(animate);
        controls.update();
        renderScene();
    }

    function renderScene(){
        injectors.renderer.render(injectors.scene, injectors.camera);
    }

    return {
        animate
    };
}