
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Search, ArrowUpDown, Award } from 'lucide-react';

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<keyof LeaderboardEntry>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter leaderboard data based on search query
  const filteredData = leaderboardData.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort leaderboard data based on sort key and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    } else {
      return a[sortKey] < b[sortKey] ? 1 : -1;
    }
  });

  // Handle sort column click
  const handleSort = (key: keyof LeaderboardEntry) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-2 animate-fade-in">Engineering Leaderboard</h1>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Track your progress and compete with fellow engineers
        </p>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {tierStats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search engineers..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
              <Button variant="default" size="sm">All Time</Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Rank</th>
                      <th className="text-left p-4 font-medium">Engineer</th>
                      <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('tier')}>
                        <div className="flex items-center gap-1">
                          Tier
                          {sortKey === 'tier' && <ArrowUpDown className="h-3 w-3" />}
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('challenges')}>
                        <div className="flex items-center gap-1">
                          Challenges
                          {sortKey === 'challenges' && <ArrowUpDown className="h-3 w-3" />}
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('modules')}>
                        <div className="flex items-center gap-1">
                          Modules
                          {sortKey === 'modules' && <ArrowUpDown className="h-3 w-3" />}
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('points')}>
                        <div className="flex items-center gap-1">
                          Points
                          {sortKey === 'points' && <ArrowUpDown className="h-3 w-3" />}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((entry, index) => (
                      <tr key={index} className={`border-b hover:bg-secondary/30 transition-colors ${index < 3 ? 'bg-secondary/20' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center">
                            {index === 0 && <Trophy className="h-5 w-5 text-yellow-500 mr-2" />}
                            {index === 1 && <Trophy className="h-5 w-5 text-gray-400 mr-2" />}
                            {index === 2 && <Trophy className="h-5 w-5 text-amber-700 mr-2" />}
                            {index > 2 && <span className="w-7 text-center">{index + 1}</span>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                              {entry.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{entry.name}</div>
                              <div className="text-sm text-muted-foreground">{entry.team}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-normal">
                            {entry.tier}
                          </Badge>
                        </td>
                        <td className="p-4">{entry.challenges} completed</td>
                        <td className="p-4">{entry.modules} completed</td>
                        <td className="p-4 font-semibold">{entry.points} pts</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl font-bold mb-6">Your Achievements</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <Card key={index} className={`${!achievement.unlocked ? 'opacity-60' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-xl ${achievement.unlocked ? 'bg-accel-purple/10 text-accel-purple' : 'bg-muted text-muted-foreground'}`}>
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                          Unlocked
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {achievement.progress}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LeaderboardEntry {
  name: string;
  tier: string;
  team: string;
  challenges: number;
  modules: number;
  points: number;
}

const tierStats = [
  {
    label: 'Your Rank',
    value: '5th',
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    bgColor: 'bg-yellow-50'
  },
  {
    label: 'Your Tier',
    value: 'Green Beret',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-500"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>,
    bgColor: 'bg-purple-50'
  },
  {
    label: 'Challenges Completed',
    value: '7',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    bgColor: 'bg-blue-50'
  },
  {
    label: 'Total Points',
    value: '1,230',
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-500"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    bgColor: 'bg-green-50'
  }
];

const leaderboardData: LeaderboardEntry[] = [
  {
    name: 'Alex Johnson',
    tier: 'Lieutenant',
    team: 'Frontend Team',
    challenges: 12,
    modules: 24,
    points: 1850
  },
  {
    name: 'Sarah Williams',
    tier: 'Green Beret',
    team: 'Backend Team',
    challenges: 10,
    modules: 22,
    points: 1620
  },
  {
    name: 'David Chen',
    tier: 'Lieutenant',
    team: 'Data Team',
    challenges: 9,
    modules: 23,
    points: 1580
  },
  {
    name: 'Maria Rodriguez',
    tier: 'Green Beret',
    team: 'Full Stack Team',
    challenges: 8,
    modules: 20,
    points: 1420
  },
  {
    name: 'James Wilson',
    tier: 'Green Beret',
    team: 'Frontend Team',
    challenges: 7,
    modules: 19,
    points: 1230
  },
  {
    name: 'Emily Taylor',
    tier: 'Green Beret',
    team: 'Backend Team',
    challenges: 6,
    modules: 18,
    points: 1150
  },
  {
    name: 'Michael Brown',
    tier: 'Green Beret',
    team: 'DevOps Team',
    challenges: 5,
    modules: 17,
    points: 980
  },
  {
    name: 'Sophia Garcia',
    tier: 'Green Beret',
    team: 'Data Team',
    challenges: 5,
    modules: 16,
    points: 920
  },
  {
    name: 'Daniel Lee',
    tier: 'Green Beret',
    team: 'Full Stack Team',
    challenges: 4,
    modules: 15,
    points: 780
  },
  {
    name: 'Olivia Martinez',
    tier: 'Green Beret',
    team: 'Frontend Team',
    challenges: 3,
    modules: 14,
    points: 650
  }
];

const achievements = [
  {
    title: 'First Blood',
    description: 'Complete your first coding challenge',
    unlocked: true
  },
  {
    title: 'Knowledge Seeker',
    description: 'Complete 10 learning modules',
    unlocked: true
  },
  {
    title: 'Bug Hunter',
    description: 'Find and fix 5 bugs during War Room sessions',
    unlocked: false,
    progress: '3/5 completed'
  },
  {
    title: 'Code Reviewer',
    description: 'Review 10 pull requests from other engineers',
    unlocked: false,
    progress: '7/10 completed'
  },
  {
    title: 'Feature Master',
    description: 'Successfully deploy 2 complete features to production',
    unlocked: false,
    progress: '1/2 completed'
  },
  {
    title: 'Documentation Hero',
    description: 'Create detailed documentation for 3 modules',
    unlocked: true
  }
];

export default Leaderboard;
