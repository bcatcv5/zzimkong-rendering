import * as THREE from "./build/three.module.js"
import { OrbitControls } from "./examples/jsm/controls/OrbitControls.js"
import { PLYLoader } from "./examples/jsm/loaders/PLYLoader.js"
import Stats from "./examples/jsm/libs/stats.module.js"

class App
{
    constructor()
    {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer = renderer
        divContainer.appendChild(renderer.domElement)

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x72645b);
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
        this._stats.update();
        requestAnimationFrame(this.render.bind(this));
        // console.log(this._camera.position);
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
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.0001, 300);

        camera.position.set(10, 10, 10)
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
                "./assets/chj.ply",
                (geometry) => {
                    geometry.computeVertexNormals();
                    let material;
                    if (geometry.index !== null)
                    {
                        console.log(geometry.attributes.color);
                        if (geometry.attributes.color !== undefined)
                        {
                            material = new THREE.PointsMaterial( { size: 0.05, vertexColors: true } );
                        }
                        else
                        {
                            material = new THREE.MeshLambertMaterial({color: 0x997777, emissive: 0x00000, wireframe: false});
                        }
                        const mesh = new THREE.Mesh(geometry, material);
                        this._processMesh(mesh);
                        this._setupHelper();
                        this._setMeshPosition();
                    } 
                    else
                    {
                        material = new THREE.PointsMaterial({ size: 0.02, vertexColors: true });
                        const points = new THREE.Points(geometry, material);
                        this._processPointCloud(points);
                        this._setupHelper();
                    }
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                },
                (error) => {
                    console.log(error);
                }
        );
    }

    _debug()
    {
        this._scene.add(this._axesHelper);
        this._scene.add(this._boxHelper);
    }

    _setupHelper()
    {
        const axesHelper = new THREE.AxesHelper(30)
        const boundingBox = new THREE.Box3();
        const boxHelper = new THREE.Box3Helper(boundingBox, 0xffff00);
        this._boundingBox = boundingBox;
        this._axesHelper = axesHelper;
        this._boxHelper = boxHelper;
        boundingBox.setFromObject(this._mesh);
    }

    _setMeshPosition()
    {
        this._mesh.position.x = -(this._boundingBox.min.x + this._boundingBox.max.x) / 2;
        this._mesh.position.y = 0;
        this._mesh.position.z = -(this._boundingBox.min.z + this._boundingBox.max.z) / 2;
        this._boundingBox.setFromObject(this._mesh);
        const value = (this._boundingBox.max.x ** 2 + this._boundingBox.max.y ** 2 + this._boundingBox.max.z ** 2) ** 0.5
        this._camera.position.set(value / 2, value / 2, value / 2)
    }

    _processMesh(mesh)
    {
        mesh.rotateX(-Math.PI / 2);
        mesh.scale.multiplyScalar(5);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        this._mesh = mesh;
        this._scene.add(this._mesh);
    }

    _processPointCloud(points)
    {
        points.rotateX(-Math.PI / 2);
        points.scale.multiplyScalar(5);
        
        this._mesh = points;
        this._scene.add(this._mesh);
    }


}

window.onload = function()
{
    new App();
}