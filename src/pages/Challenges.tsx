
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Users, ArrowRight, Star } from 'lucide-react';

const Challenges = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">Engineering Challenges</h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Test your skills with real-world engineering problems
            </p>
          </div>
          
          <Button className="animate-fade-in" style={{ animationDelay: "0.2s" }}>Your Submissions</Button>
        </div>
        
        <Tabs defaultValue="active" className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {challengeData
                .filter(challenge => challenge.status === 'active')
                .map((challenge, index) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    delayIndex={index}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {challengeData
                .filter(challenge => challenge.status === 'upcoming')
                .map((challenge, index) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    delayIndex={index}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {challengeData
                .filter(challenge => challenge.status === 'completed')
                .map((challenge, index) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    delayIndex={index}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold animate-fade-in">Leaderboard</h2>
            <Button variant="outline" asChild className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Link to="/leaderboard">View Full Leaderboard</Link>
            </Button>
          </div>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4 font-medium">Rank</th>
                      <th className="text-left pb-4 font-medium">Engineer</th>
                      <th className="text-left pb-4 font-medium">Tier</th>
                      <th className="text-left pb-4 font-medium">Challenges</th>
                      <th className="text-left pb-4 font-medium">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry, index) => (
                      <tr key={index} className={`border-b ${index === 1 ? 'bg-secondary/30' : ''}`}>
                        <td className="py-4">
                          <div className="flex items-center">
                            {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-2" />}
                            {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mr-2" />}
                            {index === 2 && <Trophy className="h-5 w-5 text-amber-700 mr-2" />}
                            {index > 2 && <span className="w-7 text-center">{index + 1}</span>}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                              {entry.name.charAt(0)}
                            </div>
                            <span className="font-medium">{entry.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="font-normal">
                            {entry.tier}
                          </Badge>
                        </td>
                        <td className="py-4">{entry.challenges} completed</td>
                        <td className="py-4 font-semibold">{entry.points} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ChallengeCard = ({ challenge, delayIndex }) => {
  return (
    <Card className={`card-hover animate-fade-in ${challenge.status === 'completed' ? 'border-green-200' : ''}`} style={{ animationDelay: `${0.1 * delayIndex}s` }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant={getBadgeVariant(challenge.status)}>
            {challenge.status === 'active' ? 'Active' : 
             challenge.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{challenge.deadline}</span>
          </div>
        </div>
        <CardTitle className="mt-2">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            <span>{challenge.points} points</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{challenge.participants} participants</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{challenge.difficulty}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={challenge.status !== 'active'}>
          {challenge.status === 'active' ? 'Take Challenge' : 
           challenge.status === 'upcoming' ? 'Coming Soon' : 'View Results'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const getBadgeVariant = (status) => {
  switch (status) {
    case 'active':
      return 'default';
    case 'upcoming':
      return 'secondary';
    case 'completed':
      return 'outline';
    default:
      return 'default';
  }
};

const challengeData = [
  {
    id: '1',
    title: 'React Performance Optimization',
    description: 'Optimize a React application to improve rendering performance',
    status: 'active',
    deadline: '3 days left',
    skills: ['React', 'Performance', 'JavaScript'],
    difficulty: 'Intermediate',
    points: 100,
    participants: 24
  },
  {
    id: '2',
    title: 'CSV Data Processing Pipeline',
    description: 'Build a robust data ingestion system for complex CSV files',
    status: 'active',
    deadline: '5 days left',
    skills: ['Node.js', 'Data Processing', 'Error Handling'],
    difficulty: 'Advanced',
    points: 150,
    participants: 18
  },
  {
    id: '3',
    title: 'API Authentication System',
    description: 'Implement a secure authentication system for RESTful APIs',
    status: 'active',
    deadline: '7 days left',
    skills: ['Security', 'API Design', 'JWT'],
    difficulty: 'Advanced',
    points: 200,
    participants: 15
  },
  {
    id: '4',
    title: 'Real-time Dashboard',
    description: 'Create a responsive dashboard with real-time data updates',
    status: 'upcoming',
    deadline: 'Starts in 2 days',
    skills: ['WebSockets', 'React', 'Data Visualization'],
    difficulty: 'Intermediate',
    points: 120,
    participants: 0
  },
  {
    id: '5',
    title: 'Testing Challenge: Find the Bugs',
    description: 'Identify and fix bugs in a complex application using TDD',
    status: 'upcoming',
    deadline: 'Starts in 5 days',
    skills: ['Testing', 'Debugging', 'TDD'],
    difficulty: 'Intermediate',
    points: 100,
    participants: 0
  },
  {
    id: '6',
    title: 'Database Schema Design',
    description: 'Design an efficient database schema for a supply chain system',
    status: 'completed',
    deadline: 'Ended 3 days ago',
    skills: ['Database', 'Schema Design', 'SQL'],
    difficulty: 'Beginner',
    points: 80,
    participants: 32
  }
];

const leaderboardData = [
  {
    name: 'Alex Johnson',
    tier: 'Lieutenant',
    challenges: 12,
    points: 1850
  },
  {
    name: 'Sarah Williams',
    tier: 'Green Beret',
    challenges: 10,
    points: 1620
  },
  {
    name: 'David Chen',
    tier: 'Lieutenant',
    challenges: 9,
    points: 1580
  },
  {
    name: 'Maria Rodriguez',
    tier: 'Green Beret',
    challenges: 8,
    points: 1420
  },
  {
    name: 'James Wilson',
    tier: 'Green Beret',
    challenges: 7,
    points: 1230
  }
];

export default Challenges;
