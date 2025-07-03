import { Person } from '@/types';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Interfaz para el tipo de lead
interface LeadData {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    fechaRegistro: Date;
    isActive: boolean;
    leadId?: string;
}

// Interfaz para el tipo de usuario
interface UserData {
    id: string;
    nombre: string;
    telefono: string;
    email: string;
    fechaRegistro: Date;
    isActive: boolean;
    leadId?: string;
    fechaActivacion?: Date;
}

// Función para convertir un lead en usuario activo
export function convertLeadToActiveUser(lead: Person): Person {
  return {
    ...lead,
    isActive: true,
    fechaRegistro: lead.fechaRegistro || new Date()
  };
}

// Función para generar una contraseña aleatoria
export function generatePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Función para buscar un lead por email
export async function findLeadByEmail(email: string): Promise<LeadData | null> {
    try {
        const leadsRef = collection(db, 'leads');
        const q = query(leadsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as LeadData;
        }
        return null;
    } catch (error) {
        console.error('Error buscando lead:', error);
        return null;
    }
}

// Función para actualizar un lead a usuario activo
export function updateLeadToActiveUser(email: string): Person | null {
  try {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    const leadIndex = leads.findIndex((lead: Person) => lead.email === email);
    
    if (leadIndex !== -1) {
      const updatedLead = convertLeadToActiveUser(leads[leadIndex]);
      leads[leadIndex] = updatedLead;
      localStorage.setItem('leads', JSON.stringify(leads));
      return updatedLead;
    }
    
    return null;
  } catch (error) {
    console.error('Error updating lead:', error);
    return null;
  }
}

// Función para obtener todos los leads
export function getAllLeads(): Person[] {
  try {
    return JSON.parse(localStorage.getItem('leads') || '[]');
  } catch (error) {
    console.error('Error getting leads:', error);
    return [];
  }
}

// Función para obtener usuarios activos
export function getActiveUsers(): Person[] {
  try {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    return leads.filter((lead: Person) => lead.isActive);
  } catch (error) {
    console.error('Error getting active users:', error);
    return [];
  }
}

// Función para activar un usuario después de la compra
export async function activateUserAfterPurchase(email: string) {
    try {
        // 1. Buscar el lead
        let lead = await findLeadByEmail(email);
        
        // 2. Si no existe el lead, crear uno básico
        if (!lead) {
            const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const newLead: LeadData = {
                id: leadId,
                nombre: email.split('@')[0], // Usar parte del email como nombre
                telefono: '',
                email: email,
                fechaRegistro: new Date(),
                isActive: false,
                leadId: leadId
            };
            
            // Guardar el nuevo lead
            await setDoc(doc(db, 'leads', leadId), newLead);
            lead = newLead;
        }

        // 3. Generar contraseña
        const password = generatePassword();

        // 4. Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 5. Actualizar el lead a usuario activo
        await updateDoc(doc(db, 'leads', lead.id), {
            isActive: true,
            userId: user.uid,
            fechaActivacion: new Date()
        });

        // 6. Crear documento en la colección users
        await setDoc(doc(db, 'users', user.uid), {
            nombre: lead.nombre,
            telefono: lead.telefono,
            email: lead.email,
            fechaRegistro: lead.fechaRegistro,
            fechaActivacion: new Date(),
            isActive: true,
            leadId: lead.id
        });

        return {
            user: user,
            password: password,
            userData: {
                nombre: lead.nombre,
                telefono: lead.telefono,
                email: lead.email,
                isActive: true
            }
        };
    } catch (error) {
        console.error('Error activando usuario:', error);
        throw error;
    }
}

// Función para obtener datos de usuario por UID
export async function getUserByUid(uid: string): Promise<UserData | null> {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() } as UserData;
        }
        return null;
    } catch (error) {
        console.error('Error obteniendo usuario:', error);
        return null;
    }
} 