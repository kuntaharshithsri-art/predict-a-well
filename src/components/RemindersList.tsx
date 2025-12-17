import { Bell, Clock, Pill, Utensils, Dumbbell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Reminder {
  id: number;
  title: string;
  time: string;
  type: "medication" | "meal" | "exercise" | "checkup";
  completed: boolean;
}

const RemindersList = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Morning Medication", time: "8:00 AM", type: "medication", completed: true },
    { id: 2, title: "Breakfast", time: "9:00 AM", type: "meal", completed: true },
    { id: 3, title: "Blood Pressure Check", time: "10:00 AM", type: "checkup", completed: false },
    { id: 4, title: "Afternoon Walk", time: "4:00 PM", type: "exercise", completed: false },
    { id: 5, title: "Evening Medication", time: "8:00 PM", type: "medication", completed: false },
  ]);

  const typeIcons = {
    medication: Pill,
    meal: Utensils,
    exercise: Dumbbell,
    checkup: Bell,
  };

  const typeColors = {
    medication: "bg-info/10 text-info",
    meal: "bg-success/10 text-success",
    exercise: "bg-warning/10 text-warning",
    checkup: "bg-primary/10 text-primary",
  };

  const toggleReminder = (id: number) => {
    setReminders(prev => 
      prev.map(r => {
        if (r.id === id) {
          const newCompleted = !r.completed;
          toast.success(newCompleted ? "Marked as complete!" : "Marked as pending");
          return { ...r, completed: newCompleted };
        }
        return r;
      })
    );
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg">Today's Reminders</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {reminders.filter(r => r.completed).length}/{reminders.length} done
        </span>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => {
          const Icon = typeIcons[reminder.type];
          return (
            <div
              key={reminder.id}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer hover:bg-muted/50 ${
                reminder.completed ? "opacity-60" : ""
              }`}
              onClick={() => toggleReminder(reminder.id)}
            >
              <div className={`p-2 rounded-xl ${typeColors[reminder.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-foreground ${reminder.completed ? "line-through" : ""}`}>
                  {reminder.title}
                </h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{reminder.time}</span>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                reminder.completed 
                  ? "bg-success border-success" 
                  : "border-border hover:border-primary"
              }`}>
                {reminder.completed && <CheckCircle className="w-4 h-4 text-success-foreground" />}
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4">
        View All Reminders
      </Button>
    </div>
  );
};

export default RemindersList;
