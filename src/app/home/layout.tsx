'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

// Variable global para el usuario
declare global {
    var currentUser: { nombre: string; email: string } | null;
}

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<{ nombre: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Verificar si el usuario está autenticado
        if (global.currentUser) {
            setUser(global.currentUser);
        } else {
            // Si no hay usuario, redirigir al login
            router.push('/login');
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        // Limpiar el usuario global
        global.currentUser = null;
        setUser(null);
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Cargando...</div>
            </div>
        );
    }

    if (!user) {
        return null; // No mostrar nada mientras redirige
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="flex justify-between items-center px-4 py-3 lg:px-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-semibold text-gray-900">Mi Curso</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                            Bienvenido, {user.nombre}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </header>

            {/* Contenido principal con sidebar */}
            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <div className="p-4 lg:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 