'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl">Debes iniciar sesión para ver tu perfil.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="text-xl font-semibold text-gray-900">
                            Mi Curso
                        </Link>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                Bienvenido, {user.nombre}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Tu Perfil</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Información Personal */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Información Personal</h2>
                            <div className="space-y-3 text-gray-700">
                                <p><strong>Nombre:</strong> {user.nombre}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Teléfono:</strong> {user.telefono || 'No especificado'}</p>
                                <p><strong>Fecha de registro:</strong> {user.fechaRegistro ? new Date(user.fechaRegistro).toLocaleDateString() : 'No especificada'}</p>
                            </div>
                        </div>

                        {/* Estado del Curso */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Estado del Curso</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium">Acceso:</span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {user.isActive ? '✅ Activo' : '⏳ Pendiente'}
                                    </span>
                                </div>

                                {!user.isActive && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-blue-800 mb-3">
                                            Parece que tu acceso al curso aún no está activo.
                                        </p>
                                        <Link
                                            href="/purchase"
                                            className="inline-block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                                        >
                                            Activar Curso Ahora
                                        </Link>
                                    </div>
                                )}
                                {user.isActive && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <p className="text-green-800 mb-3">
                                            ¡Tienes acceso completo a todo el contenido!
                                        </p>
                                        <Link
                                            href="/course"
                                            className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Ir al Curso
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 