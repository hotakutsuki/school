'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Person } from '@/types';
import { getAllLeads, getActiveUsers } from '@/utils/auth';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [leads, setLeads] = useState<Person[]>([]);
    const [activeUsers, setActiveUsers] = useState<Person[]>([]);

    useEffect(() => {
        // Cargar datos para el dashboard
        setLeads(getAllLeads());
        setActiveUsers(getActiveUsers());
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Acceso denegado</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold text-gray-900">Dashboard Secreto</h1>
                        </div>
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
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total de Leads</h3>
                        <p className="text-3xl font-bold text-indigo-600">{leads.length}</p>
                        <p className="text-sm text-gray-500">Personas registradas</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Usuarios Activos</h3>
                        <p className="text-3xl font-bold text-green-600">{activeUsers.length}</p>
                        <p className="text-sm text-gray-500">Con acceso al curso</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tasa de Conversión</h3>
                        <p className="text-3xl font-bold text-blue-600">
                            {leads.length > 0 ? Math.round((activeUsers.length / leads.length) * 100) : 0}%
                        </p>
                        <p className="text-sm text-gray-500">Leads a usuarios activos</p>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Leads Recientes</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Teléfono
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leads.slice(0, 10).map((lead, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {lead.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {lead.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {lead.telefono}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {lead.isActive ? 'Activo' : 'Lead'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {lead.fechaRegistro ? new Date(lead.fechaRegistro).toLocaleDateString() : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
} 