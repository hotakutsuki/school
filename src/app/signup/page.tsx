'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Person, SignupForm } from '@/types';

export default function SignUp() {
    const [formData, setFormData] = useState<SignupForm>({
        nombre: '',
        telefono: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Crear un lead (persona con isActive: false)
        const newLead: Person = {
            ...formData,
            isActive: false,
            fechaRegistro: new Date()
        };

        // Simular envío de datos (en una app real, aquí se enviarían a un backend)
        console.log('Lead creado:', newLead);

        // Guardar en localStorage para simular persistencia
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        existingLeads.push(newLead);
        localStorage.setItem('leads', JSON.stringify(existingLeads));

        // Simular delay de procesamiento
        setTimeout(() => {
            setIsSubmitting(false);
            // Redirigir al seminario
            router.push('/seminar');
        }, 1500);
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
            <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            ¡Únete al Seminario Gratuito!
                        </h1>
                        <p className="text-indigo-200">
                            Regístrate para recibir acceso exclusivo a nuestro seminario gratuito
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-white mb-2">
                                Nombre completo
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Tu nombre completo"
                                value={formData.nombre}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-white mb-2">
                                Teléfono
                            </label>
                            <input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Tu número de teléfono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? 'Registrando...' : 'Registrarme al Seminario'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-indigo-200">
                            Al registrarte, aceptas recibir información sobre el curso
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-indigo-200 hover:text-white transition-colors">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <div className="flex items-center">
                            <span className="text-green-400 text-xl mr-3">🎓</span>
                            <div>
                                <h3 className="text-white font-medium">Seminario 100% Gratuito</h3>
                                <p className="text-indigo-200 text-sm">90 minutos de contenido de valor</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <div className="flex items-center">
                            <span className="text-green-400 text-xl mr-3">🎁</span>
                            <div>
                                <h3 className="text-white font-medium">Descuento Exclusivo</h3>
                                <p className="text-indigo-200 text-sm">50% de descuento en el curso completo</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <div className="flex items-center">
                            <span className="text-green-400 text-xl mr-3">📧</span>
                            <div>
                                <h3 className="text-white font-medium">Notificaciones</h3>
                                <p className="text-indigo-200 text-sm">Te avisaremos cuando esté listo</p>
                            </div>
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