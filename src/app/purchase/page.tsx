'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function PurchasePage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { user, activateUser } = useAuth();

    const handlePurchase = async () => {
        setIsProcessing(true);

        // Simular proceso de pago
        setTimeout(() => {
            // Activar el usuario
            activateUser();
            setIsProcessing(false);
        }, 2000);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Redirigiendo al login...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors">
                            Mi Curso
                        </Link>
                        <div className="flex space-x-4">
                            <span className="text-white">
                                Bienvenido, {user.nombre}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Accede al Curso Completo
                    </h1>
                    <p className="text-xl text-indigo-200">
                        Desbloquea todo el contenido y transforma tu carrera
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Curso Completo
                        </h2>
                        <div className="text-5xl font-bold text-green-400 mb-2">
                            $99
                        </div>
                        <p className="text-indigo-200">Pago único - Acceso de por vida</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Acceso completo a todos los capítulos
                        </div>
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Videos en alta calidad
                        </div>
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Material de estudio descargable
                        </div>
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Cuestionarios interactivos
                        </div>
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Certificado de finalización
                        </div>
                        <div className="flex items-center text-white">
                            <span className="text-green-400 mr-3">✓</span>
                            Soporte técnico
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button
                        onClick={handlePurchase}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg text-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Procesando pago...' : 'Comprar Ahora'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-indigo-200">
                            Pago seguro procesado por Stripe
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-yellow-300 mb-3">
                            🛡️ Garantía de 30 días
                        </h3>
                        <p className="text-yellow-200">
                            Si no estás satisfecho con el curso, te devolvemos tu dinero sin preguntas.
                        </p>
                    </div>
                </div>

                {/* Back to Login */}
                <div className="text-center mt-8">
                    <Link
                        href="/login"
                        className="text-indigo-200 hover:text-white transition-colors"
                    >
                        ← Volver al login
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