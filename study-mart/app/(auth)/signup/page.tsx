'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { BookOpen } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.auth);
  
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be a signup endpoint.
    // We mock signing up by logging in right after.
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md bg-card/80 backdrop-blur-2xl border border-border/50 p-8 rounded-3xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-accent/10 p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-sm text-muted-foreground text-center">
            Join the premium campus marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-background"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Campus Email</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-background"
              placeholder="john@campus.edu"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-background"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold mt-4"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Creating...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
