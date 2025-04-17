
import { useState } from 'react';
import { Doctor, doctors } from '@/data/doctors';
import DoctorsList from '@/components/DoctorsList';
import BookingModal from '@/components/BookingModal';
import AppointmentsList from '@/components/AppointmentsList';
import useAppointmentStore from '@/store/appointmentStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Calendar } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'doctors' | 'appointments'>('doctors');
  const [bookingDoctorId, setBookingDoctorId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const { appointments, addAppointment, cancelAppointment } = useAppointmentStore();
  
  // Find the selected doctor for booking
  const selectedDoctor = bookingDoctorId 
    ? doctors.find(doctor => doctor.id === bookingDoctorId) || null
    : null;
  
  // Handle opening the booking modal
  const handleBookAppointment = (doctorId: string) => {
    setBookingDoctorId(doctorId);
    setIsBookingModalOpen(true);
  };
  
  // Handle confirmation of booking
  const handleConfirmBooking = (doctorId: string, date: string, timeSlot: string) => {
    const newAppointment = {
      id: `appt-${Date.now()}`,
      doctorId,
      date,
      timeSlot,
      status: 'confirmed' as const
    };
    
    addAppointment(newAppointment);
    setIsBookingModalOpen(false);
    setActiveTab('appointments');
  };
  
  // Handle cancel appointment
  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointment(appointmentId);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:shadow-md focus:rounded-md"
      >
        Skip to main content
      </a>
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">Doctor Appointment Booking</h1>
            <p className="mt-1 text-sm text-gray-600">Find and book appointments with top doctors</p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <Tabs 
          defaultValue="doctors" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'doctors' | 'appointments')}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger 
              value="doctors" 
              className="flex items-center justify-center gap-2"
              aria-label="View doctors directory"
            >
              <UserRound className="h-4 w-4" />
              <span>Find Doctors</span>
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center justify-center gap-2"
              aria-label="View my appointments"
            >
              <Calendar className="h-4 w-4" />
              <span>My Appointments</span>
              {appointments.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {appointments.filter(a => a.status === 'confirmed').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="mt-6">
            <DoctorsList doctors={doctors} onBookAppointment={handleBookAppointment} />
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <AppointmentsList 
              appointments={appointments} 
              doctors={doctors} 
              onCancelAppointment={handleCancelAppointment} 
            />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        doctor={selectedDoctor}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default Index;
