import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from "./EventEmitter";

export default class Ressources extends EventEmitter {
  constructor(sources){
    super()

    // Options
    this.sources = sources

    // Setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeLoader = new THREE.CubeTextureLoader()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch(source.type) {
        
        case "gltfModel" :
          this.loaders.gltfLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          )
          break;

        case "texture" :
          this.loaders.textureLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          )
          break;

        case "cubeTexture" :
          this.loaders.cubeLoader.load(
            source.path,
            (file) => {
              this.sourceLoaded(source, file);
            }
          )
          break;

        default:
          console.log('error loading type');
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++

    if(this.loaded === this.toLoad) {
      this.trigger('ready')
    }
  }
}