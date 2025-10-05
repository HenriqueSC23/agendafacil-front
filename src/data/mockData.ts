export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalAppointments: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const servicesData: Service[] = [
  {
    id: '1',
    name: 'Corte Masculino',
    description: 'Corte de cabelo tradicional ou moderno',
    duration: 30,
    price: 45.00,
    active: true,
  },
  {
    id: '2',
    name: 'Barba',
    description: 'Corte e modelagem de barba',
    duration: 20,
    price: 30.00,
    active: true,
  },
  {
    id: '3',
    name: 'Corte + Barba',
    description: 'Combo completo',
    duration: 45,
    price: 65.00,
    active: true,
  },
  {
    id: '4',
    name: 'Hidratação Capilar',
    description: 'Tratamento profundo para cabelos',
    duration: 60,
    price: 80.00,
    active: false,
  },
];

export const clientsData: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    totalAppointments: 12,
  },
  {
    id: '2',
    name: 'Maria Santos',
    phone: '(11) 97654-3210',
    email: 'maria.santos@email.com',
    totalAppointments: 8,
  },
  {
    id: '3',
    name: 'Pedro Costa',
    phone: '(11) 96543-2109',
    email: 'pedro.costa@email.com',
    totalAppointments: 15,
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    phone: '(11) 95432-1098',
    email: 'ana.oliveira@email.com',
    totalAppointments: 5,
  },
];

export const appointmentsData: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'João Silva',
    serviceId: '1',
    serviceName: 'Corte Masculino',
    date: '2025-10-08',
    time: '09:00',
    status: 'confirmed',
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Maria Santos',
    serviceId: '3',
    serviceName: 'Corte + Barba',
    date: '2025-10-08',
    time: '10:00',
    status: 'confirmed',
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Pedro Costa',
    serviceId: '2',
    serviceName: 'Barba',
    date: '2025-10-09',
    time: '14:00',
    status: 'pending',
  },
  {
    id: '4',
    clientId: '4',
    clientName: 'Ana Oliveira',
    serviceId: '1',
    serviceName: 'Corte Masculino',
    date: '2025-10-10',
    time: '11:00',
    status: 'confirmed',
  },
];

export const statsData = {
  weeklyAppointments: 24,
  totalClients: 156,
  monthlyRevenue: 4850.00,
  occupancyRate: 78,
};

export const chartData = [
  { day: 'Seg', appointments: 5 },
  { day: 'Ter', appointments: 8 },
  { day: 'Qua', appointments: 6 },
  { day: 'Qui', appointments: 9 },
  { day: 'Sex', appointments: 12 },
  { day: 'Sáb', appointments: 15 },
  { day: 'Dom', appointments: 3 },
];

export const monthlyRevenueData = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Fev', revenue: 3800 },
  { month: 'Mar', revenue: 4100 },
  { month: 'Abr', revenue: 3900 },
  { month: 'Mai', revenue: 4500 },
  { month: 'Jun', revenue: 4850 },
];
