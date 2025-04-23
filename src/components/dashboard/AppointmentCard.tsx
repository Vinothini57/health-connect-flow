
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  isUpcoming: boolean;
}

export default function AppointmentCard({
  doctorName,
  specialty,
  date,
  time,
  isUpcoming,
}: AppointmentCardProps) {
  return (
    <Card className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-health-gray-light pt-4 pb-2">
        <CardTitle className="flex justify-between items-center text-base font-medium">
          <span className="text-gray-700">
            {isUpcoming ? "Upcoming Appointment" : "Past Appointment"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <div className="font-medium">{doctorName}</div>
            <div className="text-sm text-gray-500">{specialty}</div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {date}
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {time}
            </div>
          </div>
          {isUpcoming && (
            <div className="pt-2">
              <Button className="w-full bg-health-blue text-white hover:bg-health-blue-dark">
                <Video className="h-4 w-4 mr-2" />
                Join Video Call
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
