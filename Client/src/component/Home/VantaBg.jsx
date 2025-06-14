import React, { useEffect, useRef } from 'react';

export default function MouseAttractText() {
    const textRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const text = textRef.current;
            if (!text) return;

            const textRect = text.getBoundingClientRect();
            const textX = textRect.left + textRect.width / 2;
            const textY = textRect.top + textRect.height / 2;

            const dx = e.clientX - textX;
            const dy = e.clientY - textY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxMove = 40;
            const moveX = (dx / distance) * Math.min(distance, maxMove);
            const moveY = (dy / distance) * Math.min(distance, maxMove);

            text.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            style={{
                height: '10vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#111',
            }}
        >
            <h1
                ref={textRef}
                style={{
                    background: 'black',
                    borderRadius: '40px',
                    fontSize: '48px',
                    color: '#00ffc3',
                    transition: 'transform 0.1s ease',
                    padding: '10px 20px'
                }}
            >
                <img
                    style={{ width: '70px', height: '50px' }}
                    src="/travistralogo.png"
                    alt="Travistra Logo"
                />

                Travistra
            </h1>
        </div>
    );
}
