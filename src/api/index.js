import store from "../redux/store";
import {loadMesh, loadScene} from "../redux/actions";

const apiKey = "AIzaSyD98C_WnhsJmKG2mJt77paECLz_QCJs_jM"

const _getURL = (keywords, nextPageToken) => {
    const Baseurl = "https://poly.googleapis.com/v1/assets?"
    let url = Baseurl + "key=" + apiKey

    url += "&pageSize=10"
    url += "&maxComplexity=MEDIUM"
    url += "&format=OBJ"
    if (keywords) { url += `&keywords=${keywords}` }
    if (nextPageToken) { url += `&pageToken=${nextPageToken}` }

    return url
}

export const getSearchResult = async (keywords, nextPageToken) => {
    const url = _getURL(keywords, nextPageToken)
    const res = await fetch(url)
    const data = await res.json()
    return data.assets
}

// https://poly.googleapis.com/downloads/fp/1582109649112130/7rUkCX-AIR2/1zHcAn1cUrx/GasStation.gltf

export const getModelURL = object => ({
    url: object.formats.find(format => format.formatType === "OBJ").root.url,
    murl: object.formats.find(format => format.formatType === "OBJ").resources[0].url
});

export const updateScene = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "sceneId": store.getState().sceneReducer.sceneId, "state": store.getState()});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let res = await fetch("https://us-central1-vrc-rest-api-e9b42.cloudfunctions.net/updateScene", requestOptions)
    let data = await res.json();
    console.log(data);
}

export const getSceneByShareCode = async (shareCode) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "shareCode": shareCode });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let result = await fetch("https://us-central1-vrc-rest-api-e9b42.cloudfunctions.net/getScene", requestOptions);
    let data =  await result.json();
    console.log(data);
    store.dispatch(loadScene(data[0].state.sceneReducer));
    store.dispatch(loadMesh(data[0].state.meshReducer));
    console.log(data);
    return data;
}
export const CreateProject = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "userId": "fzOOlmGcKLLIg2wPEpvU", "projectName": "FCISProject", "description": "Its our first project" });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        let result = await fetch("https://us-central1-vrc-rest-api-e9b42.cloudfunctions.net/createProject", requestOptions);
        let data = await result.json();
        console.log(data);

        myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        raw = JSON.stringify({ "projectId": data.projectId, "state": {} });
        requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let res = await fetch("https://us-central1-vrc-rest-api-e9b42.cloudfunctions.net/createScene", requestOptions);
        let sceneDate = await res.json();
        
        return {
            projectName: data.projectName,
            projectId: data.projectId,
            shareCode: data.shareCode,
            sceneId: sceneDate.id
        };
    }
    catch (error) {
        console.log('error', error)
    }
}

// What I recieve 
// const a = {
//     "formats": [
//         {
//             "root": {
//                 "relativePath": "model.gltf",
//                 "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/fsEm68ZSggA/model.gltf",
//                 "contentType": "model/gltf+json"
//             },
//             "resources": [
//                 {
//                     "relativePath": "model.bin",
//                     "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/fsEm68ZSggA/model.bin",
//                     "contentType": "application/octet-stream"
//                 }
//             ],
//             "formatComplexity": { "triangleCount": "23704" },
//             "formatType": "GLTF"
//         },
//         {
//             "root": {
//                 "relativePath": "model.gltf",
//                 "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/6kjZR-eGbHj/model.gltf",
//                 "contentType": "model/gltf+json"
//             },
//             "resources": [
//                 {
//                     "relativePath": "model.bin",
//                     "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/6kjZR-eGbHj/model.bin",
//                     "contentType": "application/octet-stream"
//                 }
//             ],
//             "formatComplexity": { "triangleCount": "23704" },
//             "formatType": "GLTF2"
//         },
//         {
//             "root": {
//                 "relativePath": "model.obj",
//                 "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/d_67ATjRjk2/model.obj",
//                 "contentType": "text/plain"
//             },
//             "resources": [{
//                 "relativePath": "materials.mtl",
//                 "url": "https://poly.googleapis.com/downloads/fp/1582151360044998/bI22sEdka83/d_67ATjRjk2/materials.mtl",
//                 "contentType": "text/plain"
//             }],
//             "formatComplexity": { "triangleCount": "23704" },
//             "formatType": "OBJ"
//         }],
//     "thumbnail": {
//         "relativePath": "bI22sEdka83.png",
//         "url": "https://lh3.googleusercontent.com/c-G23DRXRYnlJOFOjD3JKw5djRtrav8aoU-v_G4Auxwf2RtfgI_Y9YAmaZV3TE8i",
//         "contentType": "image/png"
//     },
//     "license": "CREATIVE_COMMONS_BY",
//     "visibility": "PUBLIC",
//     "isCurated": true,
//     "presentationParams": {
//         "orientingRotation": { "w": 1 },
//         "colorSpace": "LINEAR",
//         "backgroundColor": "#dcedc8"
//     }
// }
//     },
//     {
//         "OBJ": "https://poly.googleapis.com/downloads/fp/1582223791762370/2Rb9zxgkDEM/5lYPuNnhKfC/model.obj",
//         "material": "https://poly.googleapis.com/downloads/fp/1582223791762370/2Rb9zxgkDEM/5lYPuNnhKfC/materials.mtl"
//     }
// ]