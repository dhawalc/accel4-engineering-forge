
import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

export const BootcampPhases = () => {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-border -translate-x-1/2 z-0"></div>
      
      <div className="space-y-12">
        {phases.map((phase, index) => (
          <div key={index} className={cn(
            "flex flex-col md:flex-row gap-4 md:gap-8 items-start animate-fade-in",
            { "md:flex-row-reverse": index % 2 !== 0 }
          )} style={{ animationDelay: `${0.1 * index}s` }}>
            <div className={cn(
              "md:w-1/2 pt-2 relative",
              { "md:text-right": index % 2 !== 0 }
            )}>
              <div className="hidden md:flex absolute top-2 items-center justify-center w-10 h-10 rounded-full bg-accel-purple text-white font-bold z-10" 
                style={{ 
                  left: index % 2 !== 0 ? '-20px' : 'auto',
                  right: index % 2 === 0 ? '-20px' : 'auto',
                  transform: 'translateX(-50%)'
                }}>
                {index + 1}
              </div>
              
              <span className="inline-block md:hidden px-2 py-1 mb-2 text-xs font-medium rounded-full bg-secondary">
                Phase {index + 1}
              </span>
              <h3 className="text-lg md:text-xl font-bold">{phase.title}</h3>
              <p className="text-muted-foreground">{phase.description}</p>
            </div>
            
            <Card className={cn(
              "md:w-1/2 card-hover",
              { "border-accel-purple": index === 1 }
            )}>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {phase.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="min-w-4 h-4 mt-1 rounded-full bg-accel-purple/20"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const phases = [
  {
    title: "Phase 1: Core Engineering Bootcamp",
    description: "Master foundational skills and build your first features",
    content: [
      "Week 0: Orientation & Expectation Setting",
      "Week 1: Full Stack Setup & Rapid Execution",
      "Week 2: Data-Driven Development & Ownership",
      "Week 3: Testing, Code Reviews & Debugging",
      "Week 4: Soft Skills & Battle Simulation"
    ]
  },
  {
    title: "Phase 2: Tiered Growth Structure",
    description: "Level up through increasing responsibility & ownership",
    content: [
      "Green Beret: Complete bootcamp, take on features/bugs",
      "Lieutenant: Lead junior devs, own a stream",
      "Captain: Set timelines, review code, team leadership",
      "Major: Architecture responsibility, mentorship"
    ]
  },
  {
    title: "Phase 3: Project Mastery",
    description: "Apply your skills to build real-world products",
    content: [
      "Complete an end-to-end feature implementation",
      "Lead development of a product module",
      "Collaborate with cross-functional teams",
      "Present your work to stakeholders"
    ]
  }
];
