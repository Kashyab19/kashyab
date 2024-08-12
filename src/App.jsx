import "./App.css";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Analytics } from '@vercel/analytics/react';
import TopicsLearning from "./components/TopicsLearning";
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
  return (
    <div className="app-container p-6 max-w-4xl mx-auto">
      <Analytics />
      <SpeedInsights/>
      <div className="content">
        <div className="flex items-center mb-10">
          <Avatar className="mr-4 w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Kashyab Murali
          </h1>
        </div>

        <div className="mb-10">
          <About />
        </div>
        <div className="mb-10">
          <TopicsLearning/>
        </div>
        <div className="mb-10">
          <Projects />
        </div>
        <div className="mb-10">
          <Experience />
        </div>
        <div className="mb-10">
          <Achievements />
        </div>
        <div className="mb-10">
          <SocialLinks />
        </div>
        <Footer />
      </div>
    </div>
  );
}
