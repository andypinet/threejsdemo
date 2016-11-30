export function init(injectors) {
    let dataSet = [
        "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
        "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
        "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
        "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
        "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
        "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
        "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
        "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
        "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
        "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
        "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
        "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
        "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
        "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
        "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
        "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
    ];

    function getRgbColor(colorType)
    {
        var colorHash = {
            //"BK":0x000000, // black
            "BK":0xdcaa6b, // black
            "WH":0xFFFFFF, // white
            "BG":0xFFCCCC, // beige
            "BR":0x800000, // brown
            "RD":0xFF0000, // red
            "YL":0xFFFF00, // yellow
            "GN":0x00FF00, // green
            "WT":0x00FFFF, // water
            "BL":0x0000FF, // blue
            "PR":0x800080  // purple
        };
        return colorHash[colorType];
    }

    const PI = Math.PI;
    const CUBE_SIZE = 20; /* width, height */
    const GRID = 16; /* cols, rows */
    const TOTAL_CUBES = (GRID * GRID);
    const WALL_SIZE = (GRID * CUBE_SIZE);
    const HALF_WALL_SIZE = (WALL_SIZE / 2);
    const MAIN_COLOR = 0xFFFFFF;
    const SECONDARY_COLOR = 0x222222;

    let cubes = [];
    let renderer = injectors.renderer;
    let camera = injectors.camera;
    let scene = injectors.scene;
    let group = injectors.group;
    let _width = 0;
    let _height = 0;

    function resizeHandler(renderer, camera) {
        _width = window.innerWidth;
        _height = window.innerHeight;
        renderer.setSize(_width, _height);
        camera.aspect = _width / _height;
        camera.updateProjectionMatrix();
    }
    
    // init
    function setupCamera(x, y, z) {
        camera.position.set(x, y, z);
        scene.add(camera);
    }

    function setupCubes(parent) {
        var i, geometry, material, pos, x, y, row, col, minDuration, maxDuration, minDelay, maxDelay, attrOptions, attr, direction, config;

        pos = {x: 0, y: 0};
        x = 0;
        y = 0;
        row = 0;
        col = 0;
        minDuration = 3;
        maxDuration = 6;
        minDelay = 0.5;
        maxDelay = 6;
        attrOptions = ['x', 'y'];

        for (i = 0; i < TOTAL_CUBES; i++) {
            var color = getRgbColor(dataSet[i]);
            geometry = new THREE.BoxGeometry(CUBE_SIZE * 0.9, CUBE_SIZE * 0.9, 1);
            material = new THREE.MeshLambertMaterial({
                color: color
            });
            cubes.push(new THREE.Mesh(geometry, material));

            if ((i % GRID) === 0) {
                col = 1;
                row++;
            } else {
                col++;
            }

            x = -(((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * col) + (CUBE_SIZE / 2));
            y = (((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * row) + (CUBE_SIZE / 2));

            cubes[i].position.set(x, y, 0);
        }

        cubes.forEach(function(cube) {
            cube.castShadow = true;
            // chrome 53 bug
            cube.receiveShadow = true;

            // config = {
            //     ease: Elastic.easeOut,
            //     delay: Utils.randomInRange(minDelay, maxDelay),
            //     repeat: -1
            // }
            // attr = attrOptions[~~(Math.random() * attrOptions.length)];
            // direction = (Math.random() < 0.5 ? -PI : PI);
            // config[attr] = direction;
            //
            // TweenMax.to(
            //     cube.rotation,
            //     Utils.randomInRange(minDuration, maxDuration),
            //     config
            // );

            parent.add(cube);
        });

    }

    function setupLights(parent) {
        var light, soft_light;

        light = new THREE.DirectionalLight(MAIN_COLOR, 1.25);
        soft_light = new THREE.DirectionalLight(MAIN_COLOR, 1.5);

        light.position.set(-WALL_SIZE, -WALL_SIZE, CUBE_SIZE * GRID);
        light.castShadow = true;
        light.shadowDarkness = 0.5;

        soft_light.position.set(WALL_SIZE, WALL_SIZE, CUBE_SIZE * GRID);

        parent.add(light).add(soft_light);
    }

    setupCamera(0, 0, 400);
    setupCubes(group);
    setupLights(group);
    group.position.y = 50;
    group.rotation.set(-60 * (PI / 180), 0, -45 * (PI / 180));
    scene.add(group);

    // for inspector
    window.scene = scene;

    window.setCamera = function (params) {
        Object.keys(params).forEach(function (key) {
            camera[key] = params[key];
        });
        camera.updateProjectionMatrix();
    };

    window.setRotation = function (x, y, z) {
        group.rotation.set(x, y, z);
        window.renderThree();
    }
}