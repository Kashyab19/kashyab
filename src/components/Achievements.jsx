import React from "react";
import achievements from "../data/achievements.json";
import { Award, Medal, Shell } from 'lucide-react';

const Achievements = () => {
  return (
    <section id="achievements" className="mt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Achievements
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white text-gray-800 rounded-md shadow-md"
          >
            {/* Conditional rendering of the icons */}
            {item.icon === 'award' && <Award className="text-black-500 w-6 h-6 mr-4" />}
            {item.icon === 'medal' && <Medal className="text-black-500 w-6 h-6 mr-4" />}
            {item.icon === 'shell' && <Shell className="text-black-500 w-6 h-6 mr-4" />}
            <span>
            <div className="text-md font-medium">{item.description}</div>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
