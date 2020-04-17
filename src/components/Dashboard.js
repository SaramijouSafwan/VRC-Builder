import React, { useState } from "react"
import { CreateProject, getSceneByShareCode } from "../api/index.js"
import { Link } from "react-router-dom";
import { addProjectId, addProjectShareCode, addSceneId } from "../redux/actions.js";
import store from "../redux/store";


const DashBoard = () => {
    const [projectInfo, setProjectInfo] = useState({ projectId: "", shareCode: "", sceneId: "" });
    const [code, setCode] = useState("");
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <h1>Dash Board Test</h1>
                <p style={{ color: "green" }}>
                    {"project Id: " + projectInfo.projectId + " | Share Code : " + projectInfo.shareCode + " | Scene id : " + projectInfo.sceneId}
                </p>

                <button onClick={async () => { setProjectInfo(await CreateProject()); }}>
                    Create New Project
                </button>
                <Link to="builder">
                    <button onClick={async () => {
                        store.dispatch(addProjectId(projectInfo.projectId));
                        store.dispatch(addProjectShareCode(projectInfo.shareCode));
                        store.dispatch(addSceneId(projectInfo.sceneId));
                    }}>
                        Open Project New Tab
                    </button>
                </Link>

            </div>
            <hr />
            <div>
                <h3>Enter Project Share Code</h3>
                <input type="text" placeholder="Share Code" value={code} onChange={e => setCode(e.target.value)}/>
                
                <Link to="viewer">
                    <button onClick={() => getSceneByShareCode(code)}>Fetch Scene</button>
                </Link>
                
            </div>

        </div>
    );
}

export default DashBoard

