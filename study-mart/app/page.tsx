import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-accent/20 via-background to-background relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />

      <main className="container max-w-5xl mx-auto px-6 h-[75vh] flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
          Your Campus <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Marketplace</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Buy, sell, and connect. The premium marketplace exclusively designed for students. Explore items, discover campus events, and manage it all in one beautifully crafted platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-lg px-10 h-14 rounded-full shadow-xl shadow-accent/20 group hover:scale-105 transition-all">
              Get Started
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 h-14 rounded-full border-border/50 bg-card/50 backdrop-blur-md hover:bg-card hover:border-border transition-all">
              Sign In
            </Button>
          </Link>
        </div>
      </main>

      {/* Feature highlight abstract grid */}
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
