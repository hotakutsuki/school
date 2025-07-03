'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getUserByUid } from '@/utils/auth';

// Interfaz para el usuario
interface UserData {
    uid: string;
    email: string | null;
    nombre: string;
    telefono: string;
    isActive: boolean;
    fechaRegistro: Date;
    leadId?: string;
}

interface AuthContextType {
    user: UserData | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
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
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Escuchar cambios en el estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
            if (firebaseUser) {
                // Obtener datos del usuario desde Firestore
                const userData = await getUserByUid(firebaseUser.uid);
                if (userData) {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        nombre: userData.nombre || '',
                        telefono: userData.telefono || '',
                        isActive: userData.isActive || false,
                        fechaRegistro: userData.fechaRegistro || new Date(),
                        leadId: userData.leadId
                    });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Obtener datos del usuario desde Firestore
            const userData = await getUserByUid(firebaseUser.uid);

            if (userData) {
                const fullUser: UserData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    nombre: userData.nombre || '',
                    telefono: userData.telefono || '',
                    isActive: userData.isActive || false,
                    fechaRegistro: userData.fechaRegistro || new Date(),
                    leadId: userData.leadId
                };

                setUser(fullUser);

                // Redirigir según el estado del usuario
                if (userData.isActive) {
                    router.push('/course');
                } else {
                    router.push('/purchase');
                }
            } else {
                throw new Error('Datos de usuario no encontrados');
            }
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error('Error en logout:', error);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 