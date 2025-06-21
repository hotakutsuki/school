'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Person } from '@/types';
import { findLeadByEmail, updateLeadToActiveUser } from '@/utils/auth';

interface AuthContextType {
    user: Person | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    activateUser: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Person | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Verificar si hay un usuario guardado al cargar
    useEffect(() => {
        // Verificar sesión persistente
        const savedUser = localStorage.getItem('user');
        const sessionToken = localStorage.getItem('sessionToken');

        if (savedUser && sessionToken) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('sessionToken');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simular login exitoso (placeholder)
        // En una aplicación real, aquí harías la validación con el backend
        if (email && password) {
            // Primero buscar si existe como lead
            const existingLead = findLeadByEmail(email);

            let newUser: Person;

            if (existingLead) {
                // Si existe como lead, usar sus datos pero mantener isActive como estaba
                newUser = {
                    ...existingLead,
                    // Mantener el estado de isActive que ya tenía
                };
            } else {
                // Si no existe, crear un nuevo usuario con isActive: false
                newUser = {
                    nombre: email.split('@')[0], // Usar la parte del email como nombre
                    email: email,
                    telefono: '', // En un login real, esto vendría de la base de datos
                    isActive: false, // Por defecto inactivo hasta que compre
                    fechaRegistro: new Date()
                };

                // Guardar el nuevo usuario en la lista de leads
                const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
                existingLeads.push(newUser);
                localStorage.setItem('leads', JSON.stringify(existingLeads));
            }

            // Crear sesión persistente
            const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('sessionToken', sessionToken);

            console.log('Usuario logueado:', newUser);

            // Verificar si el usuario está activo
            if (newUser.isActive) {
                // Redirigir al curso
                router.push('/course');
            } else {
                // Redirigir a la página de compra
                router.push('/purchase');
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('sessionToken');
        router.push('/login');
    };

    const activateUser = () => {
        if (user) {
            // Activar el usuario
            const activatedUser = updateLeadToActiveUser(user.email);
            if (activatedUser) {
                setUser(activatedUser);
                localStorage.setItem('user', JSON.stringify(activatedUser));
                console.log('Usuario activado:', activatedUser);
                // Redirigir al curso
                router.push('/course');
            }
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        activateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 