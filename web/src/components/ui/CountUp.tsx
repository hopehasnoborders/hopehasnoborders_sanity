'use client'

import { useEffect, useState } from 'react'

interface CountUpProps {
    target: string | number
    duration?: number
}

export function CountUp({ target, duration = 1200 }: CountUpProps) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const numericTarget = parseInt(String(target).replace(/[^0-9]/g, '')) || 0
        const end = numericTarget
        const startTime = performance.now()

        let raf = 0
        const tick = (t: number) => {
            const p = Math.min(1, (t - startTime) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setCount(Math.round(end * eased))
            if (p < 1) raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [target, duration])

    return <span>{count.toLocaleString()}</span>
}
