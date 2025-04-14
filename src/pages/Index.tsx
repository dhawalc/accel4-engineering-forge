
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Code, 
  Github,
  CheckCircle2,
  Trophy 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { BootcampPhases } from '@/components/BootcampPhases';
import { WeeklyProgress } from '@/components/WeeklyProgress';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <section className="py-10 px-4 md:px-6 hero-gradient">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white animate-fade-in">
            Welcome to Accel4 Engineering Forge
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Transform from fresh graduate to industry champion through our intensive engineering bootcamp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" asChild>
              <Link to="/modules">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20" asChild>
              <Link to="/challenges">Take Challenge</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6 container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center animate-fade-in">Your Learning Journey</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatusCard 
            title="Current Phase"
            value="Phase 1: Week 2"
            description="Data-Driven Development & Ownership Skills"
            icon={<Calendar className="h-6 w-6 text-accel-purple" />}
            progress={50}
          />
          <StatusCard 
            title="Modules Completed"
            value="12 / 24"
            description="Keep going! You're making great progress."
            icon={<BookOpen className="h-6 w-6 text-accel-purple" />}
            progress={50}
          />
          <StatusCard 
            title="Tier Rank"
            value="Green Beret"
            description="Complete 2 features to level up to Lieutenant"
            icon={<Trophy className="h-6 w-6 text-accel-purple" />}
            progress={25}
          />
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-6 bg-secondary/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center animate-fade-in">Bootcamp Structure</h2>
          <p className="text-center text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your 8-week journey to engineering excellence
          </p>
          
          <BootcampPhases />
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-6 container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <div className="md:w-1/2 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">This Week's Focus</h2>
            <p className="text-muted-foreground mb-6">
              Week 2: Data-Driven Development & Ownership Skills
            </p>
            
            <ul className="space-y-4">
              {weekTasks.map((task, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-1">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <Button className="mt-6" asChild>
              <Link to="/modules">Continue Learning</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Weekly Progress</h2>
            <WeeklyProgress />
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-6 bg-secondary/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center animate-fade-in">Upcoming Events</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {events.map((event, index) => (
              <Card key={index} className="card-hover">
                <CardHeader>
                  <div className="text-sm font-medium text-accel-purple mb-2">{event.date}</div>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Add to Calendar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-6 container">
        <div className="bg-accent rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready for a Challenge?</h2>
            <p className="text-muted-foreground">
              Test your skills with our engineering challenges and climb the leaderboard.
            </p>
          </div>
          <Button size="lg" className="whitespace-nowrap animate-fade-in" style={{ animationDelay: "0.1s" }} asChild>
            <Link to="/challenges">
              Take a Challenge
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      <footer className="bg-accel-dark text-white py-12 px-4 md:px-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accel-purple" />
              <span className="font-bold text-lg">Accel4 Forge</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Code className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-white/60">
            © 2025 Accel4 Engineering. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatusCard = ({ title, value, description, icon, progress }) => {
  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Progress value={progress} className="mt-4" />
      </CardContent>
    </Card>
  );
};

const GraduationCap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const weekTasks = [
  {
    title: "Set up React component: 'Delay Predictor' grid",
    description: "Create a data grid component with mock data",
    completed: true
  },
  {
    title: "Build Node backend for CSV ingestion",
    description: "Implement CSV parsing and schema validation",
    completed: true
  },
  {
    title: "Add error handling and logging",
    description: "Configure error boundaries and implement logging",
    completed: false
  },
  {
    title: "Present your feature in demo format",
    description: "Prepare a 5-minute demo explaining your implementation",
    completed: false
  }
];

const events = [
  {
    date: "Monday, 8:00 PM",
    title: "Monday Night War Room",
    description: "Join us for collaborative bug fixing and team bonding with chill music."
  },
  {
    date: "Wednesday, 3:00 PM",
    title: "Midweek Standup",
    description: "Share your progress, discuss blockers, and align on priorities."
  },
  {
    date: "Friday, 4:00 PM",
    title: "Demo & Debrief",
    description: "Show your completed features and receive feedback from peers."
  }
];

export default Index;
