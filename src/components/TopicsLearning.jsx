import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Keep this for skills
import { Info, Workflow, Container, CodeXml, Wrench, DatabaseZap} from "lucide-react"; // Import the icons
import skillCategories from "../data/topics.json";
import CategoryBadge from "./CategoryBadge"; // Import the custom badge

// Function to map icon names to Lucide components
const getCategoryIcon = (iconName) => {
  switch (iconName) {
    case "CodeXml":
      return <CodeXml className="w-4 h-4 mr-2" />;
    case "Container":
      return <Container className="w-4 h-4 mr-2" />;
    case "Workflow":
      return <Workflow className="w-4 h-4 mr-2" />;
    case "Wrench":
      return <Wrench className="w-4 h-4 mr-2" />;
    case "DatabaseZap":
      return <DatabaseZap className="w-4 h-4 mr-2" />;
    default:
      return null; // Return null if no icon matches
  }
};

const TopicsLearning = () => {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);
  const [infoHeight, setInfoHeight] = useState(0);

  useEffect(() => {
    if (infoRef.current) {
      setInfoHeight(infoRef.current.scrollHeight);
    }
  }, [showInfo]);

  return (
    <section id="topics-learning" className="mt-10">
      <div className="flex items-center mb-2">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mr-2">
          My Skills
        </h2>
        <button
          className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          <Info size={20} />
        </button>
      </div>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: showInfo ? `${infoHeight}px` : '0px' }}
      >
        <div 
          ref={infoRef}
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
        >
          <p className="text-sm">
            I am learning and expanding my skill sets. This list represents my current areas of expertise and ongoing learning as well!
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <Card key={index} className="w-full">
            <CardContent className="pt-6">
              <CategoryBadge className={`${category.color} ${category.text}`} icon={getCategoryIcon(category.icon)}>
                {category.name}
              </CategoryBadge>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopicsLearning;
