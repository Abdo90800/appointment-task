
import { useState } from 'react';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Doctor } from '@/data/doctors';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctorId: string) => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
         role="article"
         aria-label={`Doctor profile for ${doctor.name}`}>
      <div className="p-6 flex flex-col sm:flex-row gap-4">
        {/* Doctor Image */}
        <div className="flex-shrink-0 self-center sm:self-start">
          <img 
            src={doctor.imageUrl} 
            alt={`Photo of ${doctor.name}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
          />
        </div>
        
        {/* Doctor Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
            <span className="ml-1 text-sm text-gray-700 font-medium">{doctor.rating}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="ml-1 text-sm">{doctor.location}</span>
          </div>
          
          {/* Availability */}
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="ml-1 text-sm">{doctor.availabilityText}</span>
          </div>
        </div>
        
        {/* Book Button */}
        <div className="flex-shrink-0 self-center mt-2 sm:mt-0">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-sm transition-colors focus-ring"
            onClick={() => onBookAppointment(doctor.id)}
            aria-label={`Book appointment with ${doctor.name}`}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
