import React, { useEffect, forwardRef } from "react"
import { useThree } from "react-three-fiber"
import store from "../redux/store"

const Camera = forwardRef((props, ref) => {
    const { setDefaultCamera } = useThree()
    const { camera, orthographic } = store.getState().sceneReducer

    useEffect(() => void setDefaultCamera(ref.current))

    return orthographic
        ? <orthographicCamera ref={ref} {...camera} {...props} /> 
        : <perspectiveCamera ref={ref} {...camera} {...props} />
})

export default Camera