'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Variable global para el usuario
declare global {
    var currentUser: { nombre: string; email: string } | null;
}

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirigir a la introducción del curso
        router.push('/home/introduccion');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl">Redirigiendo al curso...</div>
        </div>
    );
} 