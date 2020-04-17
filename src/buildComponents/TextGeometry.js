import React, { useMemo, useRef } from 'react'
import { useLoader, useResource, useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import TransformControl from "./TransformControl"

import store from "../redux/store"
import { selectMesh } from "../redux/actions"

const TextGeometry = ({ text, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', ...props }) => {
    const [ref, mesh] = useResource()
    const boxHelperRef = useRef()

    let hovered = store.getState().meshReducer.selectedMesh.id === props.name ? true : false
    let state = store.getState().meshReducer.meshes.find(({ id }) => id === props.name)

    useFrame(() => {
        if (boxHelperRef.current)
            boxHelperRef.current.update()
    })

    const font = useLoader(THREE.FontLoader, '/helvetiker_regular.typeface.json')
    const config = useMemo(
        () => ({ font, size: 12, height: 5, curveSegments: 12, bevelEnabled: true, bevelThickness: 2, bevelSize: 2, bevelOffset: 0, bevelSegments: 3 }),
        [font]
    )

    return (
        <>
            <mesh
                scale={[state.scale * 0.1, state.scale * 0.1, state.scale * 0.1]}
                ref={ref}
                visible={state.visible}
                position={state.position}
                onClick={() => store.dispatch(selectMesh(props.name, "MESH"))}
                castShadow={state.castShadow}
                receiveShadow={state.receiveShadow}
                {...props}
            >
                <textGeometry attach="geometry" args={[text, config]} />
                <meshNormalMaterial attach="material" />
            </mesh>

            {hovered ? mesh && <TransformControl orbit={props.orbit} mesh={mesh} /> : null}
            {hovered ? mesh && <boxHelper args={[mesh, 0xffff00]} ref={boxHelperRef} /> : null}

        </>
    )
}

export default TextGeometry


// const mesh = useUpdate(
//     self => {
//         const size = new THREE.Vector3()
//         self.geometry.computeBoundingBox()
//         self.geometry.boundingBox.getSize(size)
//         self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
//         self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
//     },
//     [text]
// )
// <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
// {/* </group> */ }