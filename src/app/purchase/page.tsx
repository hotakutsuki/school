'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { findLeadByEmail } from '@/utils/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function PurchasePage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirigir usuarios activos al curso
    useEffect(() => {
        if (!loading && user && user.isActive) {
            router.push('/course');
        }
    }, [user, loading, router]);

    // Mostrar loading mientras se verifica el estado del usuario
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
                <div className="text-white text-xl">Cargando...</div>
            </div>
        );
    }

    // Si el usuario está activo, no mostrar nada (será redirigido)
    if (user && user.isActive) {
        return null;
    }

    const handlePurchase = async () => {
        if (!email || !email.includes('@')) {
            setError('Por favor ingresa un email válido');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setIsProcessing(true);
        setError(null);
        try {
            // Simular proceso de pago (aquí iría tu integración con Stripe)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Buscar datos del lead si existe
            const lead = await findLeadByEmail(email);
            let nombre = '';
            let telefono = '';
            if (lead) {
                nombre = lead.nombre;
                telefono = lead.telefono;
            }

            // Crear usuario en Firebase Auth y en Firestore
            // Usar una función similar a activateUserAfterPurchase pero con contraseña proporcionada
            // Aquí reimplementamos la lógica para aceptar la contraseña del usuario
            const { auth, db } = await import('@/utils/firebase');
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            const { doc, setDoc } = await import('firebase/firestore');

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                nombre,
                telefono,
                email,
                fechaRegistro: new Date(),
                isActive: true,
                leadId: lead ? lead.id : null
            });

            // Si existe el lead, actualizarlo a activo
            if (lead) {
                const { updateDoc } = await import('firebase/firestore');
                await updateDoc(doc(db, 'leads', lead.id), {
                    isActive: true,
                    userId: user.uid,
                    fechaActivacion: new Date()
                });
            }

            alert('¡Compra exitosa! Ya puedes acceder al curso con tu email y contraseña.');
            window.location.href = '/course';
        } catch (err) {
            if (typeof err === 'object' && err && 'message' in err) {
                setError((err as { message: string }).message);
            } else {
                setError('Error al procesar la compra');
            }
        } finally {
            setIsProcessing(false);
        }
    };

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
                            <Link
                                href="/login"
                                className="text-white hover:text-indigo-200 transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
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

                {/* Email & Password Input */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-2xl mx-auto mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Tus Datos de Acceso
                        </h2>
                        <p className="text-indigo-200">
                            Ingresa el email y la contraseña con la que accederás al curso
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                minLength={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Crea una contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                minLength={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Repite la contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-2 text-xs text-yellow-200 opacity-80">
                            ¿Problemas para acceder? Escribe a <a href="mailto:support@curso.com" className="underline hover:text-white">support@curso.com</a>
                        </div>
                        {error && (
                            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/30">
                                <p className="text-red-300 text-center">{error}</p>
                            </div>
                        )}
                    </div>
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
                        disabled={isProcessing || !email || !password || !confirmPassword}
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