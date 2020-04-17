import React, { useRef } from "react"
import { useResource, useFrame } from "react-three-fiber"

import TransformControl from "./TransformControl"

import store from "../redux/store"
import { selectMesh } from "../redux/actions"

// TODO: change BoxGeometry to Universal Geometry  
const BoxGeometry = (props) => {
    const [ref, mesh] = useResource()
    const boxHelperRef = useRef()

    let hovered = store.getState().meshReducer.selectedMesh.id === props.name ? true : false
    let state = store.getState().meshReducer.meshes.find(({ id }) => id === props.name)

    useFrame(() => {
        if (boxHelperRef.current)
            boxHelperRef.current.update()
    })

    return (
        <>
            <mesh
                scale={[state.scale, state.scale, state.scale,]}
                ref={ref}
                visible={state.visible}
                position={state.position}
                onClick={() => store.dispatch(selectMesh(props.name, "MESH"))}
                castShadow={state.castShadow}
                receiveShadow={state.receiveShadow}
                {...props}
            >
                <boxGeometry attach="geometry" args={state.dimensions} />
                <meshNormalMaterial attach="material" />
            </mesh>

            {hovered ? mesh && <TransformControl orbit={props.orbit} mesh={mesh} /> : null}
            {hovered ? mesh && <boxHelper args={[mesh, 0xffff00]} ref={boxHelperRef} /> : null}
        </>
    )
}
export default BoxGeometry


// let basicMaterial = state.material === "Basic" ? true : false
// let normalMaterial = state.material === "Normal" ? true : false
// let phongMaterial = state.material === "Phong" ? true : false
// {/* {normalMaterial && <meshNormalMaterial attach="material" />} */ }
// {/* {basicMaterial && <meshBasicMaterial attach="material" color={state.color} />} */ }
// {/* {phongMaterial && <meshPhongMaterial attach="material" color={state.color} />} */ }