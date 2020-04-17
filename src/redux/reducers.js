import { v1 as uuid } from "uuid"


//import { SWITCH_ORTHOGRAPHIC, CHANGE_CAMERA_POSITION, ADD_SKYBOX, SELECT_SKYBOX, DELETE_SKYBOX } from "./actions"
// import { ADD_MESH, DELETE_MESH, UPDATE_MESH, SELECT_OBJECT, SCALE_DOWN_MESH, SCALE_UP_MESH } from "./actions"
// import { ADD_TEXT, UPDATE_TEXT, SELECT_TEXT, DELETE_TEXT } from "./actions"

const initialSceneState = {
    projectId: "",
    shareCode: "",
    sceneId: "",
    skybox: {
        selectedSkybox: "",
        gallary: []
    },
    camera: {
        fov: 80,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 500,
        position: [5, 5, 5]
    },
    orthographic: false,
    vr: false,
}

export const sceneReducer = (state = initialSceneState, action) => {
    switch (action.type) {
        case "LOAD-SCENE": {
            state = {
            ...state,
            projectId: action.payload.projectId,
            sceneId: action.payload.sceneId,
            shareCode: action.payload.shareCode,
            skybox: action.payload.skybox,
            vr: action.payload.vr,
            orthographic: action.payload.orthographic
            }
            return state;
        }
        case "ADD-PROJECT-ID": {
            state = {...state, projectId: action.payload};
            return state;
        }
        case "ADD-SCENE-ID": {
            state = {...state, sceneId: action.payload};
            return state;
        }
        case 'ADD-PROJECT-SHARECODE': {
            state =  {...state, shareCode: action.payload};
            return state;
        }
        case 'SWITCH_ORTHOGRAPHIC':
            return { ...state, orthographic: !state.orthographic }
        case 'CHANGE_CAMERA_POSITION':
            return {
                ...state, camera: { position: [action.position.x || state.camera.position[0], action.position.y || state.camera.position[1], action.position.z || state.camera.position[2]] }
            }
        case 'ADD_SKYBOX':
            return {
                ...state, skybox: {
                    selectedSkybox: action.image,
                    gallary: [...state.skybox.gallary, action.image]
                }
            }
        case 'SELECT_SKYBOX':
            return {
                ...state, skybox: {
                    selectedSkybox: action.image,
                    gallary: [...state.skybox.gallary]
                }
            }
        case 'DELETE_SKYBOX':
            const skybox = {
                selectedSkybox: state.skybox.selectedSkybox,
                gallary: state.skybox.gallary.filter(image => image !== action.image)
            }
            if (skybox.selectedSkybox === action.image) skybox.selectedSkybox = ""
            return { ...state, skybox: skybox }
        default:
            return state
    }
}

const initialMeshState = {
    selectedMesh: {},
    meshes: []
}

export const meshReducer = (state = initialMeshState, action) => {
    console.log("stated adding")
    let mesh, changedMesh, otherMesh
    switch (action.type) {
        case "LOAD-MESH": {
            state = action.payload;
            return state;
        }
        case 'ADD_MESH': {
            mesh = { ...action.payload, id: uuid() }
            return { selectedMesh: mesh, meshes: [...state.meshes, mesh] }
        }
        case 'DELETE_MESH': {
            return { selectedMesh: {}, meshes: state.meshes.filter(mesh => mesh.id !== action.payload) }
        }
        case 'UPDATE_MESH': {
            mesh = state.meshes.filter(({ id }) => id !== action.payload.id)
            state = { ...state, meshes: [...mesh, action.payload.object], selectedMesh: action.payload.object }
            return state
        }
        case 'SELECT_OBJECT': {
            mesh = state.meshes.find(({ id }) => id === action.payload.id)
            return { ...state, selectedMesh: mesh }
        }
        case 'SCALE_UP_MESH':
            changedMesh = state.meshes.find(({ id }) => id === action.payload)
            otherMesh = state.meshes.filter(({ id }) => id !== action.payload)
            if (state.selectedMesh.id === action.payload) {
                return ({
                    ...state,
                    selectedMesh: { ...state.selectedMesh, scale: state.selectedMesh.scale * 2 },
                    meshes: [...otherMesh, { ...changedMesh, scale: changedMesh.scale * 2 }]
                })
            }
            return ({
                ...state,
                meshes: [...otherMesh, { ...changedMesh, scale: changedMesh.scale * 2 }]
            })
        case 'SCALE_DOWN_MESH':
            changedMesh = state.meshes.find(({ id }) => id === action.payload)
            otherMesh = state.meshes.filter(({ id }) => id !== action.payload)
            if (state.selectedMesh.id === action.payload) {
                return ({
                    ...state,
                    selectedMesh: { ...state.selectedMesh, scale: state.selectedMesh.scale / 2 },
                    meshes: [...otherMesh, { ...changedMesh, scale: changedMesh.scale / 2 }]
                })
            }
            return ({
                ...state,
                meshes: [...otherMesh, { ...changedMesh, scale: changedMesh.scale / 2 }]
            })

        // case ADD_TEXT:
        //     mesh = { id: uuid(), ...action.payload }
        //     return { selectedMesh: mesh, meshes: [...state.meshes, mesh] }
        // case DELETE_TEXT:
        //     mesh = { id: uuid(), ...action.payload }
        //     return { selectedMesh: mesh, meshes: [...state.meshes, mesh] }

        default: {
            return state
        }
    }
}


/*
selectedMesh: {
        type: "Poly",
        id: "6e9d1ee0-7237-11ea-8ca1-0d0e35c16ea4",
        scale: 4,
        visible: true,
        position: [Array],
        url:
            "https://poly.googleapis.com/downloads/fp/1585475375569438/5rf3YuZfJAW/eJO0l-Cymf7/PUSHILIN_pond.obj",
        murl:
            "https://poly.googleapis.com/downloads/fp/1585475375569438/5rf3YuZfJAW/eJO0l-Cymf7/PUSHILIN_pond.mtl"
    },
    meshes: [{
        type: 'Poly',
        id: '65b09320-7237-11ea-8ca1-0d0e35c16ea4',
        scale: 8,
        visible: true,
        position:
            [-4.074295585190134, 2.884784424393823, -0.732393450978404],
        url:
            'https://poly.googleapis.com/downloads/fp/1585474611286536/2Rb9zxgkDEM/5lYPuNnhKfC/model.obj',
        murl:
            'https://poly.googleapis.com/downloads/fp/1585474611286536/2Rb9zxgkDEM/5lYPuNnhKfC/materials.mtl'
    },
    {
        type: 'Poly',
        id: '6e9d1ee0-7237-11ea-8ca1-0d0e35c16ea4',
        scale: 4,
        visible: true,
        position: [3.546109374915792, 0, 4.678690581072722],
        url:
            'https://poly.googleapis.com/downloads/fp/1585475375569438/5rf3YuZfJAW/eJO0l-Cymf7/PUSHILIN_pond.obj',
        murl:
            'https://poly.googleapis.com/downloads/fp/1585475375569438/5rf3YuZfJAW/eJO0l-Cymf7/PUSHILIN_pond.mtl'
    }]
*/