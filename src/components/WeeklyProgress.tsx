
import React from 'react';
import { Card, CardContent } from './ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const WeeklyProgress = () => {
  const data = [
    { day: 'Mon', tasks: 3, peerReviews: 1, challenges: 0 },
    { day: 'Tue', tasks: 4, peerReviews: 2, challenges: 1 },
    { day: 'Wed', tasks: 2, peerReviews: 3, challenges: 0 },
    { day: 'Thu', tasks: 5, peerReviews: 2, challenges: 2 },
    { day: 'Fri', tasks: 4, peerReviews: 4, challenges: 1 },
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #f0f0f0"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="tasks"
                name="Tasks Completed"
                stroke="#8B5CF6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="peerReviews"
                name="Peer Reviews"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="challenges"
                name="Challenges"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
