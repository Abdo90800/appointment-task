
import { useState, useEffect } from 'react';
import { Doctor, Appointment } from '@/data/doctors';
import { Calendar, Clock, MapPin, X, UserPlus } from 'lucide-react';
import EmptyState from './EmptyState';
import { AppointmentCardSkeleton } from './LoadingSkeleton';

interface AppointmentsListProps {
  appointments: Appointment[];
  doctors: Doctor[];
  onCancelAppointment: (appointmentId: string) => void;
}

const AppointmentsList = ({ appointments, doctors, onCancelAppointment }: AppointmentsListProps) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const now = new Date();
    
    const upcoming = appointments.filter(appointment => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.timeSlot}`);
      return appointmentDate > now && appointment.status !== 'cancelled';
    });
    
    const past = appointments.filter(appointment => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.timeSlot}`);
      return appointmentDate <= now || appointment.status === 'cancelled';
    });
    
    setUpcomingAppointments(upcoming);
    setPastAppointments(past);
  }, [appointments]);
  
  // Helper function to find doctor details
  const getDoctorInfo = (doctorId: string) => {
    return doctors.find(d => d.id === doctorId);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b">
        <div className="flex" role="tablist" aria-label="Appointment tabs">
          <button
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            aria-controls="upcoming-appointments-panel"
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 
              ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'past'}
            aria-controls="past-appointments-panel"
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 
              ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('past')}
          >
            Past ({pastAppointments.length})
          </button>
        </div>
      </div>
      
      <div 
        id="upcoming-appointments-panel"
        role="tabpanel"
        aria-labelledby="upcoming-tab"
        hidden={activeTab !== 'upcoming'}
        className="p-4"
      >
        {upcomingAppointments.length > 0 ? (
          <ul className="divide-y divide-gray-200" aria-label="Upcoming appointments">
            {upcomingAppointments.map((appointment) => {
              const doctor = getDoctorInfo(appointment.doctorId);
              if (!doctor) return null;
              
              return (
                <li key={appointment.id} className="py-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <img 
                        src={doctor.imageUrl} 
                        alt={`Photo of ${doctor.name}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">
                        <h3 className="text-md font-medium text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-blue-600">{doctor.specialty}</p>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{appointment.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <button
                        onClick={() => onCancelAppointment(appointment.id)}
                        className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center justify-center"
                        aria-label={`Cancel appointment with ${doctor.name}`}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title="No upcoming appointments"
            description="You don't have any scheduled appointments. Book a consultation with one of our doctors."
            icon={<UserPlus className="h-12 w-12 text-blue-200" />}
            actionLabel="Find doctors"
            onAction={() => document.querySelector('[value="doctors"]')?.dispatchEvent(new MouseEvent('click'))}
          />
        )}
      </div>
      
      <div 
        id="past-appointments-panel"
        role="tabpanel"
        aria-labelledby="past-tab"
        hidden={activeTab !== 'past'}
        className="p-4"
      >
        {isLoading ? (
          // Show loading skeletons
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 2 }).map((_, index) => (
              <AppointmentCardSkeleton key={index} />
            ))}
          </div>
        ) : pastAppointments.length > 0 ? (
          <ul className="divide-y divide-gray-200" aria-label="Past appointments">
            {pastAppointments.map((appointment) => {
              const doctor = getDoctorInfo(appointment.doctorId);
              if (!doctor) return null;
              
              return (
                <li key={appointment.id} className="py-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <img 
                        src={doctor.imageUrl} 
                        alt={`Photo of ${doctor.name}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">
                        <h3 className="text-md font-medium text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-blue-600">{doctor.specialty}</p>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{appointment.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title="No past appointments"
            description="Your appointment history will appear here after your first visit."
            icon={<Calendar className="h-12 w-12 text-blue-200" />}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
