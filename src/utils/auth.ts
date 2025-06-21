import { Person } from '@/types';

// Función para convertir un lead en usuario activo
export function convertLeadToActiveUser(lead: Person): Person {
  return {
    ...lead,
    isActive: true,
    fechaRegistro: lead.fechaRegistro || new Date()
  };
}

// Función para buscar un lead por email
export function findLeadByEmail(email: string): Person | null {
  try {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    return leads.find((lead: Person) => lead.email === email) || null;
  } catch (error) {
    console.error('Error finding lead:', error);
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