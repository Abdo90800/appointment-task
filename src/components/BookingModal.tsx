import { useState, useEffect } from 'react';
import { Doctor, TimeSlot, generateTimeSlots } from '@/data/doctors';
import { Calendar, Clock, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onConfirmBooking: (doctorId: string, date: string, timeSlot: string) => void;
}

const BookingModal = ({ isOpen, onClose, doctor, onConfirmBooking }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  
  const today = new Date();
  
  // Generate available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  
  // Get day of week for a date
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  // When selected date changes, generate new time slots
  useEffect(() => {
    if (doctor && selectedDate) {
      const dayOfWeek = getDayOfWeek(selectedDate);
      
      // Check if doctor is available on this day
      if (doctor.availableDays.includes(dayOfWeek)) {
        const slots = generateTimeSlots(doctor.id, dayOfWeek);
        setAvailableTimeSlots(slots);
      } else {
        setAvailableTimeSlots([]);
      }
      
      setSelectedTimeSlot('');
    }
  }, [doctor, selectedDate]);
  
  // Handle booking confirmation
  const handleConfirm = () => {
    if (doctor && selectedDate && selectedTimeSlot) {
      onConfirmBooking(doctor.id, selectedDate, selectedTimeSlot);
      toast.success('Appointment booked successfully!', {
        description: `Your appointment with Dr. ${doctor.name} has been confirmed.`,
      });
      onClose();
    }
  };
  
  if (!doctor) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 id="booking-modal-title" className="text-xl font-semibold text-gray-900">
              Book an Appointment
            </h2>
            <Button
              onClick={onClose}
              size="icon"
              variant="ghost"
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close booking modal"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-700">
              <span className="font-medium">{doctor.name}</span> • {doctor.specialty}
            </p>
            <p className="text-gray-600 text-sm mt-1">{doctor.location}</p>
          </div>
        </div>
        
        {/* Date Selection */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 flex items-center mb-3">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" aria-hidden="true" />
              Select Date
            </h3>
            <div 
              className="grid grid-cols-3 sm:grid-cols-4 gap-2" 
              role="radiogroup"
              aria-label="Available appointment dates"
            >
              {availableDates.map((date) => {
                const dayOfWeek = getDayOfWeek(date);
                const isAvailable = doctor.availableDays.includes(dayOfWeek);
                return (
                  <button
                    key={date}
                    onClick={() => isAvailable && setSelectedDate(date)}
                    className={`p-3 text-center rounded-md border transition-colors ${
                      selectedDate === date
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : isAvailable
                        ? 'border-gray-300 hover:border-blue-400 bg-white'
                        : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isAvailable}
                    role="radio"
                    aria-checked={selectedDate === date}
                  >
                    <div className="text-xs font-medium">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="font-medium">
                      {new Date(date).getDate()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Time Slots */}
        <div className="p-6 border-b">
          <h3 className="font-medium text-gray-900 flex items-center mb-3">
            <Clock className="h-5 w-5 mr-2 text-blue-600" aria-hidden="true" />
            Select Time
          </h3>
          
          {selectedDate ? (
            availableTimeSlots.length > 0 ? (
              <div 
                className="grid grid-cols-3 gap-2"
                role="radiogroup"
                aria-label="Available appointment times"
              >
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.isAvailable && setSelectedTimeSlot(slot.time)}
                    className={`p-2 text-center rounded-md border transition-colors ${
                      selectedTimeSlot === slot.time
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : slot.isAvailable
                        ? 'border-gray-300 hover:border-blue-400 bg-white'
                        : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!slot.isAvailable}
                    role="radio"
                    aria-checked={selectedTimeSlot === slot.time}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 py-2">No available time slots for this date.</p>
            )
          ) : (
            <p className="text-gray-600 py-2">Please select a date first.</p>
          )}
        </div>
        
        {/* Confirmation */}
        <div className="p-6">
          <div className="mb-4">
            {selectedDate && selectedTimeSlot && (
              <div 
                className="bg-blue-50 border border-blue-100 rounded-md p-3"
                role="alert"
              >
                <p className="text-sm text-blue-800">
                  You're about to book an appointment with <strong>{doctor.name}</strong> on{' '}
                  <strong>{formatDate(selectedDate)}</strong> at <strong>{selectedTimeSlot}</strong>.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              aria-label="Cancel booking"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTimeSlot}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              aria-label="Confirm appointment booking"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
