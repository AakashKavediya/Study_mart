import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LostFoundPage() {
  const items = [
    { type: 'Lost', item: 'AirPods Pro Case', loc: 'Library 3rd Floor', time: '2 hours ago', bg: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { type: 'Found', item: 'Black Hydroflask', loc: 'Student Union Hub', time: 'Yesterday', bg: 'bg-green-500/10 text-green-500 border-green-500/20' },
    { type: 'Lost', item: 'Texas Instruments Calculator', loc: 'Math Building 104', time: '3 days ago', bg: 'bg-red-500/10 text-red-500 border-red-500/20' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl mb-16 md:mb-0">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lost & Found</h1>
          <p className="text-muted-foreground">Help the community reunite with their belongings.</p>
        </div>
        <Button className="shrink-0 w-full md:w-auto shadow-lg shadow-accent/20">Report Item</Button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center sm:hover:border-accent/40 transition-colors cursor-pointer group shadow-sm">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${item.bg}`}>
                  {item.type}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{item.time}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{item.item}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {item.loc}
              </div>
            </div>
            
            <div className="w-full sm:w-auto mt-2 sm:mt-0 flex gap-2">
              <Button variant="outline" size="sm" className="w-full sm:w-auto bg-background">I found it</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
