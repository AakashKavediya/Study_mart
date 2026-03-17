import { Grid, Bookmark, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    bio: string;
    avatarUrl: string;
    followers: number;
    following: number;
    listings: number;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-card border-b border-border pb-8">
      <div className="container max-w-4xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Avatar Area */}
          <div className="shrink-0 relative group cursor-pointer">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-background shadow-xl ring-2 ring-accent/20 transition-all duration-300 group-hover:ring-accent">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Area */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
              <div className="flex gap-2">
                <Button variant="default" className="rounded-full shadow-accent/20 shadow-lg px-6 font-semibold">
                  Edit Profile
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-6 mb-4 text-sm">
              <div className="flex flex-col items-center md:flex-row gap-1">
                <span className="font-bold text-foreground text-lg md:text-base">{user.listings}</span>
                <span className="text-muted-foreground">Listings</span>
              </div>
              <div className="flex flex-col items-center md:flex-row gap-1">
                <span className="font-bold text-foreground text-lg md:text-base">{user.followers}</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
              <div className="flex flex-col items-center md:flex-row gap-1">
                <span className="font-bold text-foreground text-lg md:text-base">{user.following}</span>
                <span className="text-muted-foreground">Following</span>
              </div>
            </div>

            <div>
              <h1 className="font-semibold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto md:mx-0 whitespace-pre-line mt-1">
                {user.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs - Instagram Style */}
        <div className="flex justify-center border-t border-border mt-10 w-full">
          <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-accent text-accent font-medium text-sm transition-colors uppercase tracking-wider">
            <Grid className="h-4 w-4" />
            <span>Listings</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-transparent text-muted-foreground hover:text-foreground font-medium text-sm transition-colors uppercase tracking-wider">
            <Bookmark className="h-4 w-4" />
            <span>Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
}
