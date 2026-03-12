import { useEffect, useState, useRef } from 'react'
import threegoatsImg from './assets/threegoats.jpg'
import './EasterEgg.css'

const SECRET = 'threegoats'

const CONFETTI_COLORS = [
    '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff',
    '#ff922b', '#cc5de8', '#f06595', '#74c0fc',
    '#ff4d4d', '#ffe066', '#40c057', '#339af0',
]

function makeConfetti(count = 120) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2.2 + Math.random() * 2.8,
        size: 7 + Math.random() * 12,
        rotation: Math.random() * 360,
        shape: i % 4 === 0 ? 'circle' : i % 4 === 1 ? 'triangle' : 'rect',
        sway: (Math.random() - 0.5) * 280,
    }))
}

export default function EasterEgg() {
    const [phase, setPhase] = useState('idle') // idle | ready | countdown | reveal
    const [countdown, setCountdown] = useState(3)
    const [confetti, setConfetti] = useState([])
    const bufferRef = useRef('')

    // Listen for the secret code
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                setPhase('idle')
                bufferRef.current = ''
                return
            }
            if (e.key.length === 1) {
                bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SECRET.length)
                if (bufferRef.current === SECRET) {
                    bufferRef.current = ''
                    // Only trigger if currently idle (functional update avoids stale closure)
                    setPhase(prev => prev === 'idle' ? 'ready' : prev)
                }
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    // Phase transitions
    useEffect(() => {
        if (phase === 'ready') {
            const t = setTimeout(() => setPhase('countdown'), 2200)
            return () => clearTimeout(t)
        }
        if (phase === 'countdown') {
            setCountdown(3)
            const t1 = setTimeout(() => setCountdown(2), 1000)
            const t2 = setTimeout(() => setCountdown(1), 2000)
            const t3 = setTimeout(() => {
                setPhase('reveal')
                setConfetti(makeConfetti(130))
            }, 3000)
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
        }
    }, [phase])

    if (phase === 'idle') return null

    return (
        <div
            className="ee-overlay"
            onClick={() => phase === 'reveal' && setPhase('idle')}
        >
            {/* READY PHASE */}
            {phase === 'ready' && (
                <div className="ee-modal">
                    <div className="ee-goat-icon">🐐</div>
                    <div className="ee-ready-text">
                        Are you ready to see the
                        <span className="ee-highlight"> Three Goats of Somaiya</span>
                        <span className="ee-question">?</span>
                    </div>
                    <div className="ee-dots">
                        <span /><span /><span />
                    </div>
                </div>
            )}

            {/* COUNTDOWN PHASE */}
            {phase === 'countdown' && (
                <div className="ee-modal ee-countdown-modal">
                    <div className="ee-countdown" key={countdown}>
                        {countdown}
                    </div>
                </div>
            )}

            {/* REVEAL PHASE */}
            {phase === 'reveal' && (
                <>
                    {/* Confetti */}
                    <div className="ee-confetti-container">
                        {confetti.map(p => (
                            <div
                                key={p.id}
                                className={`ee-confetti ${p.shape}`}
                                style={{
                                    left: `${p.left}%`,
                                    backgroundColor: p.color,
                                    width: `${p.size}px`,
                                    height: p.shape === 'rect' ? `${p.size * 1.9}px` : `${p.size}px`,
                                    animationDelay: `${p.delay}s`,
                                    animationDuration: `${p.duration}s`,
                                    '--sway': `${p.sway}px`,
                                    transform: `rotate(${p.rotation}deg)`,
                                    borderColor: p.color,
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner party poppers */}
                    <div className="ee-popper ee-popper-tl">🎉</div>
                    <div className="ee-popper ee-popper-tr">🎊</div>
                    <div className="ee-popper ee-popper-bl">🎊</div>
                    <div className="ee-popper ee-popper-br">🎉</div>

                    {/* Side sparkles */}
                    <div className="ee-sparkle ee-sparkle-l">✨</div>
                    <div className="ee-sparkle ee-sparkle-r">✨</div>

                    {/* Main reveal card */}
                    <div className="ee-modal ee-reveal-modal">
                        <div className="ee-reveal-title">
                            🐐🐐🐐&nbsp; THE THREE GOATS OF SOMAIYA &nbsp;🐐🐐🐐
                        </div>
                        <div className="ee-img-wrapper">
                            <img
                                src={threegoatsImg}
                                alt="The Three Goats of Somaiya"
                                className="ee-goat-img"
                            />
                            <div className="ee-img-sparkles">
                                <span className="sp sp1">⭐</span>
                                <span className="sp sp2">💫</span>
                                <span className="sp sp3">⭐</span>
                                <span className="sp sp4">✨</span>
                                <span className="sp sp5">💫</span>
                                <span className="sp sp6">⭐</span>
                            </div>
                        </div>
                        <p className="ee-close-hint">✨ click anywhere to close ✨</p>
                    </div>
                </>
            )}
        </div>
    )
}
