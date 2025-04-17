
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  location: string;
  availabilityText: string;
  availableDays: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

// List of medical specialties
export const specialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Gastroenterology',
  'Neurology',
  'Obstetrics & Gynecology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Urology'
];

// Mock doctors data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    imageUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 4.8,
    location: 'Cairo Medical Center',
    availabilityText: 'Available today',
    availableDays: ['Monday', 'Wednesday', 'Friday']
  },
  {
    id: '2',
    name: 'Dr. Ahmed Hassan',
    specialty: 'Dermatology',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.7,
    location: 'Alexandria Clinic',
    availabilityText: 'Next available: Tomorrow',
    availableDays: ['Tuesday', 'Thursday', 'Saturday']
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    specialty: 'Family Medicine',
    imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.9,
    location: 'Cairo Family Health',
    availabilityText: 'Available today',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday']
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    imageUrl: 'https://randomuser.me/api/portraits/women/67.jpg',
    rating: 4.9,
    location: 'Children\'s Care Clinic',
    availabilityText: 'Next available: Thursday',
    availableDays: ['Thursday', 'Friday', 'Saturday']
  },
  {
    id: '5',
    name: 'Dr. Fatima Al-Zahrawi',
    specialty: 'Obstetrics & Gynecology',
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 4.7,
    location: 'Women\'s Health Center',
    availabilityText: 'Available today',
    availableDays: ['Monday', 'Wednesday', 'Thursday']
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 4.6,
    location: 'Sports Medicine Clinic',
    availabilityText: 'Next available: Friday',
    availableDays: ['Tuesday', 'Friday', 'Saturday']
  },
  {
    id: '7',
    name: 'Dr. Layla Ibrahim',
    specialty: 'Neurology',
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4.8,
    location: 'Neurological Institute',
    availabilityText: 'Available today',
    availableDays: ['Monday', 'Thursday', 'Friday']
  },
  {
    id: '8',
    name: 'Dr. Robert Kim',
    specialty: 'Psychiatry',
    imageUrl: 'https://randomuser.me/api/portraits/men/57.jpg',
    rating: 4.5,
    location: 'Mental Health Center',
    availabilityText: 'Next available: Wednesday',
    availableDays: ['Wednesday', 'Thursday', 'Friday']
  }
];

// Generate time slots for a given doctor on a specific day
export const generateTimeSlots = (doctorId: string, day: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  // Generate random availability pattern
  const doctorIndex = parseInt(doctorId) % 8;
  const availabilityPattern = [
    [true, true, false, true, false, true, true, false],
    [true, false, true, true, false, false, true, true],
    [false, true, true, false, true, false, true, false],
    [true, false, false, true, true, false, true, true]
  ][doctorIndex % 4];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour}:${minute === 0 ? '00' : minute}`;
      const id = `${doctorId}-${day}-${timeString}`;
      const slotIndex = (hour - startHour) * 2 + (minute === 30 ? 1 : 0);
      const isAvailable = availabilityPattern[slotIndex % availabilityPattern.length];
      
      slots.push({
        id,
        time: `${hour > 12 ? hour - 12 : hour}:${minute === 0 ? '00' : minute} ${hour >= 12 ? 'PM' : 'AM'}`,
        isAvailable
      });
    }
  }
  
  return slots;
};
