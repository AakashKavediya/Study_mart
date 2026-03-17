import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function EventsPage() {
  const events = [
    { title: 'Campus Tech Career Fair', date: 'Oct 15', time: '10:00 AM - 4:00 PM', loc: 'Main Arena', img: 'https://picsum.photos/seed/event1/600/300' },
    { title: 'Welcome Week Concert', date: 'Sep 05', time: '8:00 PM - 11:30 PM', loc: 'Quad Stage', img: 'https://picsum.photos/seed/event2/600/300' },
    { title: 'Hackathon 2024 Kickoff', date: 'Nov 12', time: '9:00 AM - Sun 5:00 PM', loc: 'Engineering Hall', img: 'https://picsum.photos/seed/event3/600/300' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mb-20 md:mb-0">
      <div className="mb-8 flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campus Events</h1>
          <p className="text-muted-foreground">Discover what's happening around campus.</p>
        </div>
        <select className="bg-card text-foreground border border-border rounded-xl px-4 py-2 focus:ring-accent outline-none">
          <option>Upcoming</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt, i) => (
          <div key={i} className="bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/40 shadow-sm transition-all group flex flex-col">
            <div className="h-48 relative overflow-hidden bg-muted">
              <img src={evt.img} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md rounded-xl p-2 text-center border border-border shadow-sm">
                <p className="text-xs font-bold text-accent uppercase leading-none mb-1">{evt.date.split(' ')[0]}</p>
                <p className="text-lg font-bold text-foreground leading-none">{evt.date.split(' ')[1]}</p>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">{evt.title}</h3>
              
              <div className="space-y-3 mt-auto mb-6">
                <div className="flex items-center text-sm text-muted-foreground gap-3">
                  <div className="bg-muted p-1.5 rounded-md"><Clock className="h-4 w-4 text-foreground" /></div>
                  {evt.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-3">
                  <div className="bg-muted p-1.5 rounded-md"><MapPin className="h-4 w-4 text-foreground" /></div>
                  {evt.loc}
                </div>
              </div>
              
              <Button className="w-full h-12 rounded-xl text-base font-semibold border border-transparent hover:border-accent">
                RSVP / Get Tickets
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
