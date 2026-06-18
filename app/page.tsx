import Hero from './components/sections/hero';
import About from './components/sections/about';
import SkillsRadar from './components/sections/skills-radar';
import Projects from './components/sections/projects';
import Timeline from './components/sections/timeline';
import GitHubStats from './components/sections/github-stats';
import LeetCodeStats from './components/sections/leetcode-stats';
import WhyHireMe from './components/sections/why-hire-me';
import Contact from './components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SkillsRadar />
      <Projects />
      <Timeline />
      <GitHubStats />
      <LeetCodeStats />
      <WhyHireMe />
      <Contact />
    </>
  );
}
