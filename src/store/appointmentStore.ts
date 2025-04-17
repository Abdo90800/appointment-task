
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment } from '@/data/doctors';

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;
}

// Load saved appointments from localStorage
const getSavedAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem('doctor-appointments');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse saved appointments:', error);
    return [];
  }
};

const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: getSavedAppointments(),
      
      addAppointment: (appointment) => 
        set((state) => ({
          appointments: [...state.appointments, appointment]
        })),
      
      cancelAppointment: (appointmentId) => 
        set((state) => ({
          appointments: state.appointments.map(appointment => 
            appointment.id === appointmentId 
              ? { ...appointment, status: 'cancelled' as const } 
              : appointment
          )
        })),
    }),
    {
      name: 'doctor-appointments',
    }
  )
);

export default useAppointmentStore;
