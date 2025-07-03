'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors"
                        >
                            Mi Curso
                        </Link>
                        <div className="flex space-x-4">
                            {user ? (
                                <>
                                    <span className="text-white">
                                        Bienvenido, {user.nombre}
                                    </span>
                                    <Link
                                        href="/profile"
                                        className="text-white hover:text-indigo-200 transition-colors"
                                    >
                                        Mi Perfil
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="text-white hover:text-indigo-200 transition-colors"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signup"
                                        className="text-white hover:text-indigo-200 transition-colors"
                                    >
                                        Registrarse
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="text-white hover:text-indigo-200 transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Aprende y Transforma tu Carrera
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-200 mb-8 max-w-3xl mx-auto">
                        Descubre nuestro curso completo con contenido interactivo, videos de alta calidad y evaluaciones que te ayudarán a dominar las habilidades más demandadas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        {user ? (
                            <div className="space-x-4">
                                {user.isActive ? (
                                    <Link
                                        href="/course"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                                    >
                                        Ir al Curso
                                    </Link>
                                ) : (
                                    <Link
                                        href="/purchase"
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                                    >
                                        Activar Curso
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link
                                    href="/signup"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                                >
                                    Comenzar Ahora
                                </Link>
                                <Link
                                    href="/seminar"
                                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                                >
                                    Seminario Gratuito
                                </Link>
                                <Link
                                    href="/purchase"
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                                >
                                    Comprar Curso
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Contenido Completo</h3>
                        <p className="text-indigo-200">
                            Accede a módulos estructurados con teoría, práctica y evaluaciones.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-4">🎥</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Videos HD</h3>
                        <p className="text-indigo-200">
                            Aprende con videos de alta calidad y explicaciones paso a paso.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-4">🏆</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Certificación</h3>
                        <p className="text-indigo-200">
                            Obtén tu certificado al completar el curso exitosamente.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Listo para Transformar tu Carrera?
                    </h2>
                    <p className="text-xl text-indigo-200 mb-8">
                        Únete a miles de estudiantes que ya han cambiado su futuro
                    </p>
                    <Link
                        href="/signup"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
                    >
                        Inscríbete Ahora
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black/20 border-t border-white/20 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-indigo-200">
                        <p>&copy; 2024 Mi Curso. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
