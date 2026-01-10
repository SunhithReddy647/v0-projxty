"use client"

import { useState, useEffect, RefObject } from "react"

export function useShaderLoader(ref: RefObject<Element | null>) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const checkShaderReady = () => {
            if (ref.current) {
                const canvas = ref.current.querySelector("canvas")
                if (canvas && canvas.width > 0 && canvas.height > 0) {
                    setIsLoaded(true)
                    return true
                }
            }
            return false
        }

        if (checkShaderReady()) return

        const intervalId = setInterval(() => {
            if (checkShaderReady()) {
                clearInterval(intervalId)
            }
        }, 100)

        const fallbackTimer = setTimeout(() => {
            setIsLoaded(true)
        }, 1500)

        return () => {
            clearInterval(intervalId)
            clearTimeout(fallbackTimer)
        }
    }, [ref])

    return isLoaded
}
