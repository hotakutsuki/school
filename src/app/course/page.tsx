'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirigir a la introducción del curso
        router.push('/course/introduccion');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl">Redirigiendo al curso...</div>
        </div>
    );
} 