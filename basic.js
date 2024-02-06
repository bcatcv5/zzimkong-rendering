import * as THREE from "./build/three.module.js"
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"
import { PLYLoader } from "../examples/jsm/loaders/PLYLoader.js"
import Stats from "../examples/jsm/libs/stats.module.js"

class App
{
    constructor()
    {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer = renderer
        divContainer.appendChild(renderer.domElement)

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x72645b );
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupControls();
        this._setupModel();

        const stats = new Stats();
        this._stats = stats;
        document.body.appendChild(stats.dom);

        window.onresize = this.resize.bind(this);
        this.resize();
        
        requestAnimationFrame(this.render.bind(this));
    }
    
    resize()
    {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render(time)
    {
        this._renderer.render(this._scene, this._camera);
        //this._updateModel(time);
        this._stats.update();
        console.log(this._camera.position);
        requestAnimationFrame(this.render.bind(this));
    }
    
    _setupControls()
    {
        const controls = new OrbitControls(this._camera, this._renderer.domElement)
        this._controls = controls;
    }

    _setupCamera()
    {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.0001, 300);

        camera.position.set(0, 20, 10)
        this._camera = camera;
    }

    _setupLight()
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel()
    {   
        const plyLoader = new PLYLoader();
            plyLoader.load(
                "./assets/neucon_demodata_b5f1.ply",
                (geometry) => {
                    geometry.computeVertexNormals();
                    const material = new THREE.MeshLambertMaterial({
                        color: 0x997777,
                        emissive: 0x00000,
                        wireframe: false
                    });

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.rotateX(-Math.PI / 2);
                    mesh.scale.multiplyScalar(2.5);
                    mesh.position.x = -10.0;
                    mesh.position.y = 0.0;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    
                    this._mesh = mesh;
                    this._scene.add(this._mesh);
                    // const axesHelper = new THREE.AxesHelper(30)
                    // this._scene.add(axesHelper);
                    // const boundingBox = new THREE.Box3();
                    // const boxHelper = new THREE.Box3Helper(boundingBox, 0xffff00);
                    // this._scene.add(boxHelper);
                    // boundingBox.setFromObject(this._mesh);
                    // boxHelper.setFromObject(this._mesh);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                    console.log(error);
                }
        );
        
    }
}

window.onload = function()
{
    new App();
}