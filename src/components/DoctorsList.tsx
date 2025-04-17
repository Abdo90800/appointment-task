import { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import { Doctor, specialties } from '@/data/doctors';
import { Filter, Search, X } from 'lucide-react';
import { DoctorCardSkeleton } from './LoadingSkeleton';
import EmptyState from './EmptyState';

interface DoctorsListProps {
  doctors: Doctor[];
  onBookAppointment: (doctorId: string) => void;
}

const DoctorsList = ({ doctors, onBookAppointment }: DoctorsListProps) => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      let filtered = [...doctors];
      
      if (selectedSpecialty !== 'All Specialties') {
        filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
      }
      
      if (availabilityFilter === 'today') {
        filtered = filtered.filter(doctor => doctor.availabilityText.includes('today'));
      }
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(doctor => 
          doctor.name.toLowerCase().includes(query) || 
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query)
        );
      }
      
      setFilteredDoctors(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [doctors, selectedSpecialty, availabilityFilter, searchQuery]);

  return (
    <div>
      <div className="mb-6 relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search doctors by name, specialty or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search doctors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center text-gray-700">
            <Filter className="h-5 w-5 mr-2" aria-hidden="true" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <div className="flex-1">
            <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <select
              id="specialty-filter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter doctors by specialty"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="availability-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              id="availability-filter"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filter doctors by availability"
            >
              <option value="all">All Availability</option>
              <option value="today">Available Today</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4 text-gray-600">
        <p aria-live="polite">Showing {filteredDoctors.length} doctors</p>
      </div>
      
      <div className="space-y-4" aria-label="Doctors list" role="list">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={onBookAppointment}
            />
          ))
        ) : (
          <EmptyState
            type="search"
            title="No doctors found"
            description="Try adjusting your filters or search criteria"
            actionLabel="Clear filters"
            onAction={() => {
              setSelectedSpecialty('All Specialties');
              setAvailabilityFilter('all');
              setSearchQuery('');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
