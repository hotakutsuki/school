// Person type - handles both leads and active users
export interface Person {
  nombre: string;
  email: string;
  telefono: string;
  isActive: boolean;
  fechaRegistro?: Date;
}

// Course types
export interface CourseChapter {
  id: string;
  title: string;
  items: CourseItem[];
}

export interface CourseItem {
  id: string;
  title: string;
  href: string;
  type: 'video' | 'text' | 'quiz';
}

// Quiz types
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Payment types
export interface PaymentInfo {
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  nombre: string;
  telefono: string;
  email: string;
}

// Utility types
export type Lead = Omit<Person, 'isActive'> & { isActive: false };
export type ActiveUser = Person & { isActive: true }; 