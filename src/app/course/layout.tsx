'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function CourseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Si no está cargando y no hay usuario, redirigir al login
        if (!loading && !user) {
            router.push('/login');
        }

        // Si hay usuario pero no está activo, redirigir a compra
        if (!loading && user && !user.isActive) {
            router.push('/purchase');
        }
    }, [user, loading, router]);

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

    if (!user.isActive) {
        return null; // No mostrar nada mientras redirige a compra
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
                        <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            Bienvenido, {user.nombre}
                        </Link>
                        <button
                            onClick={logout}
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