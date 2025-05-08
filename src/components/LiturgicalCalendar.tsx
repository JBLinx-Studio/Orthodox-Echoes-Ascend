
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

// Sample feast days and celebrations
const FEAST_DAYS = [
  { date: "January 6", name: "Theophany (Epiphany)" },
  { date: "January 7", name: "Synaxis of St. John the Baptist" },
  { date: "February 2", name: "Presentation of Christ" },
  { date: "March 25", name: "Annunciation" },
  { date: "April 23", name: "St. George the Great Martyr" },
  { date: "May 21", name: "Sts. Constantine and Helen" },
  { date: "June 29", name: "Sts. Peter and Paul" },
  { date: "August 6", name: "Transfiguration" },
  { date: "August 15", name: "Dormition of the Theotokos" },
  { date: "September 8", name: "Nativity of the Theotokos" },
  { date: "September 14", name: "Exaltation of the Holy Cross" },
  { date: "November 21", name: "Entry of the Theotokos" },
  { date: "December 25", name: "Nativity of Christ" }
];

export function LiturgicalCalendar() {
  const [upcomingFeasts, setUpcomingFeasts] = useState<Array<{date: string, name: string}>>([]);
  
  useEffect(() => {
    // Determine current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
    const currentDay = currentDate.getDate();
    
    // Find upcoming feasts (next 3)
    const upcoming = FEAST_DAYS.filter(feast => {
      const [month, day] = feast.date.split(" ");
      const feastMonth = getMonthNumber(month);
      const feastDay = parseInt(day);
      
      // If feast is in current month and day is later, or feast is in a future month
      return (feastMonth === currentMonth && feastDay >= currentDay) || feastMonth > currentMonth;
    }).sort((a, b) => {
      const [monthA, dayA] = a.date.split(" ");
      const [monthB, dayB] = b.date.split(" ");
      
      const feastMonthA = getMonthNumber(monthA);
      const feastDayA = parseInt(dayA);
      const feastMonthB = getMonthNumber(monthB);
      const feastDayB = parseInt(dayB);
      
      // Sort by month first, then by day
      if (feastMonthA !== feastMonthB) {
        return feastMonthA - feastMonthB;
      }
      return feastDayA - feastDayB;
    }).slice(0, 3);
    
    setUpcomingFeasts(upcoming);
  }, []);
  
  // Helper function to convert month name to number
  const getMonthNumber = (monthName: string) => {
    const months: {[key: string]: number} = {
      "January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6,
      "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12
    };
    return months[monthName];
  };
  
  return (
    <Card className="bg-[#1A1F2C]/70 backdrop-blur-md border-gold/20 overflow-hidden">
      <CardHeader className="pb-3 pt-6 bg-gradient-to-r from-byzantine/10 via-gold/5 to-byzantine/10">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gold" />
          <CardTitle className="text-xl font-display text-gold/90">Liturgical Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <h3 className="font-display text-lg text-white mb-3">Upcoming Celebrations</h3>
        <div className="space-y-3">
          {upcomingFeasts.map((feast, index) => (
            <div 
              key={index} 
              className="p-3 border border-gold/10 rounded-md bg-gold/5 holy-light flex flex-col gap-1 hover:border-gold/30 transition-colors duration-300"
            >
              <span className="text-gold/80 font-medium">{feast.date}</span>
              <span className="text-white">{feast.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/calendar" className="text-gold/70 hover:text-gold text-sm inline-flex items-center border-b border-gold/20 hover:border-gold/60 transition-colors duration-300">
            View Full Calendar <Calendar className="w-3 h-3 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
