import { Calendar, Clock, MapPin, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Dec 20, 2024",
    time: "10:00 AM",
    type: "video",
    location: "Virtual Consultation",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "General Physician",
    date: "Dec 22, 2024",
    time: "2:30 PM",
    type: "in-person",
    location: "City Medical Center",
  },
];

const UpcomingAppointments = () => {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.35s" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning/10 rounded-xl">
            <Calendar className="w-6 h-6 text-warning" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">Upcoming Appointments</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div 
            key={apt.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className={`p-3 rounded-xl ${apt.type === 'video' ? 'bg-info/10' : 'bg-success/10'}`}>
              {apt.type === 'video' ? (
                <Video className={`w-5 h-5 ${apt.type === 'video' ? 'text-info' : 'text-success'}`} />
              ) : (
                <User className="w-5 h-5 text-success" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground">{apt.doctor}</h4>
              <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{apt.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{apt.location}</span>
              </div>
            </div>
            <Button 
              variant={apt.type === 'video' ? 'info' : 'outline'} 
              size="sm"
              className="shrink-0"
            >
              {apt.type === 'video' ? 'Join' : 'Details'}
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4">
        <Calendar className="w-4 h-4 mr-2" />
        Schedule New Appointment
      </Button>
    </div>
  );
};

export default UpcomingAppointments;
