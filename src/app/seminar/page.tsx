import Link from 'next/link';

export default function SeminarPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors">
                            Mi Curso
                        </Link>
                        <div className="flex space-x-4">
                            <Link
                                href="/login"
                                className="text-white hover:text-indigo-200 transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-white text-indigo-900 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <div className="mb-8">
                        <div className="text-6xl mb-4">🎓</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            ¡Seminario Gratuito Confirmado!
                        </h1>
                        <p className="text-xl text-green-200 mb-8">
                            Gracias por registrarte. Te hemos enviado un email con todos los detalles.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Detalles del Seminario
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <div>
                                <h3 className="text-lg font-medium text-green-300 mb-2">📅 Fecha y Hora</h3>
                                <p className="text-indigo-200">Próximamente - Te notificaremos</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-green-300 mb-2">🌐 Plataforma</h3>
                                <p className="text-indigo-200">Zoom / Google Meet</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-green-300 mb-2">⏱️ Duración</h3>
                                <p className="text-indigo-200">90 minutos</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-green-300 mb-2">👥 Cupos</h3>
                                <p className="text-indigo-200">Limitados - ¡Reserva tu lugar!</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30 mb-8">
                        <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                            🎁 Bonus Especial
                        </h3>
                        <p className="text-yellow-200">
                            Los asistentes al seminario recibirán un descuento exclusivo del 50% en el curso completo.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Volver al Inicio
                        </Link>
                        <div className="text-indigo-200">
                            <p>¿Tienes preguntas? Contáctanos en info@micurso.com</p>
                        </div>
                    </div>
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