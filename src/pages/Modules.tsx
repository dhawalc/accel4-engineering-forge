
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Clock, BookOpen, Video, Code } from 'lucide-react';

const Modules = () => {
  // Group modules by week
  const modulesByWeek = {};
  moduleData.forEach(module => {
    if (!modulesByWeek[module.week]) {
      modulesByWeek[module.week] = [];
    }
    modulesByWeek[module.week].push(module);
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <div className="container py-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">Learning Modules</h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Master essential engineering skills through structured modules
            </p>
          </div>
          
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button variant="outline">All Modules</Button>
            <Button variant="outline">In Progress</Button>
            <Button variant="outline">Completed</Button>
          </div>
        </div>
        
        {Object.keys(modulesByWeek).sort().map(week => (
          <div key={week} className="mb-12">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold animate-fade-in">
                {weekLabels[week]}
              </h2>
              <span className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                {modulesByWeek[week].filter(m => m.completed).length} / {modulesByWeek[week].length} completed
              </span>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modulesByWeek[week].map((module, index) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  delayIndex={index}
                />
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

const ModuleCard = ({ module, delayIndex }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'reading':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'interactive':
        return <Code className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`card-hover animate-fade-in ${module.completed ? 'border-green-200' : ''}`} style={{ animationDelay: `${0.1 * delayIndex}s` }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant={module.completed ? "outline" : "secondary"} className={module.completed ? "border-green-500 text-green-600 bg-green-50" : ""}>
            {module.completed ? "Completed" : "In Progress"}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{module.duration}</span>
          </div>
        </div>
        <CardTitle className="mt-2">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span>Progress</span>
            <span className="font-medium">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {module.types.map((type, index) => (
              <Badge key={index} variant="outline" className="flex gap-1 items-center">
                {getTypeIcon(type)}
                <span className="capitalize">{type}</span>
              </Badge>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to={`/modules/${module.id}`}>
              {module.completed ? "Review" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const weekLabels = {
  '0': 'Week 0: Orientation & Setup',
  '1': 'Week 1: Full Stack Setup & Execution',
  '2': 'Week 2: Data-Driven Development',
  '3': 'Week 3: Testing & Code Quality',
  '4': 'Week 4: Soft Skills & Battle Simulation'
};

const moduleData = [
  {
    id: '1',
    title: 'Engineering Fundamentals',
    description: 'Core principles and best practices for software engineering',
    week: '0',
    progress: 100,
    duration: '1.5 hrs',
    completed: true,
    types: ['reading', 'video']
  },
  {
    id: '2',
    title: 'Product Thinking',
    description: 'How to think beyond code and focus on business impact',
    week: '0',
    progress: 100,
    duration: '2 hrs',
    completed: true,
    types: ['reading', 'interactive']
  },
  {
    id: '3',
    title: 'Bootcamp Commandments',
    description: 'Key principles to follow throughout your journey',
    week: '0',
    progress: 100,
    duration: '1 hr',
    completed: true,
    types: ['reading']
  },
  {
    id: '4',
    title: 'Local Development Environment',
    description: 'Set up your development stack with React, Node, Docker and more',
    week: '1',
    progress: 100,
    duration: '3 hrs',
    completed: true,
    types: ['interactive', 'video']
  },
  {
    id: '5',
    title: 'Building Your First API',
    description: 'Create and deploy your first RESTful API with Node.js',
    week: '1',
    progress: 100,
    duration: '4 hrs',
    completed: true,
    types: ['interactive', 'video']
  },
  {
    id: '6',
    title: 'Deployment Fundamentals',
    description: 'Learn how to deploy applications to dev environments',
    week: '1',
    progress: 85,
    duration: '2 hrs',
    completed: false,
    types: ['interactive']
  },
  {
    id: '7',
    title: 'Data-Driven React Components',
    description: 'Build interactive data visualizations with React',
    week: '2',
    progress: 75,
    duration: '3 hrs',
    completed: false,
    types: ['interactive', 'video']
  },
  {
    id: '8',
    title: 'Backend Data Processing',
    description: 'Advanced techniques for data ingestion and transformation',
    week: '2',
    progress: 50,
    duration: '4 hrs',
    completed: false,
    types: ['interactive', 'reading']
  },
  {
    id: '9',
    title: 'Feature Ownership',
    description: 'How to own a feature from concept to deployment',
    week: '2',
    progress: 20,
    duration: '2 hrs',
    completed: false,
    types: ['reading', 'video']
  },
  {
    id: '10',
    title: 'Writing Effective Tests',
    description: 'Unit, integration, and end-to-end testing strategies',
    week: '3',
    progress: 0,
    duration: '3 hrs',
    completed: false,
    types: ['interactive']
  },
  {
    id: '11',
    title: 'Code Review Best Practices',
    description: 'How to give and receive constructive feedback',
    week: '3',
    progress: 0,
    duration: '2 hrs',
    completed: false,
    types: ['reading', 'interactive']
  },
  {
    id: '12',
    title: 'Advanced Debugging',
    description: 'Techniques for troubleshooting complex issues',
    week: '3',
    progress: 0,
    duration: '3 hrs',
    completed: false,
    types: ['interactive', 'video']
  }
];

export default Modules;
