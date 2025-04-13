
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Skill = {
  name: string;
  level: number;
  category: "Development" | "Design" | "Tools" | "Machine Learning";
  icon: string;
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const skills: Skill[] = [
    { name: "App Development", level: 90, category: "Development", icon: "📱" },
    { name: "Python", level: 95, category: "Development", icon: "🐍" },
    { name: "Django", level: 90, category: "Development", icon: "🌐" },
    { name: "Machine Learning", level: 85, category: "Machine Learning", icon: "🤖" },
    { name: "UI/UX Design", level: 80, category: "Design", icon: "🎨" },
    { name: "Microsoft Office", level: 85, category: "Tools", icon: "📊" },
    { name: "HTML/CSS", level: 85, category: "Development", icon: "💻" },
    { name: "JavaScript", level: 75, category: "Development", icon: "🌟" },
    { name: "Database Management", level: 80, category: "Development", icon: "🗃️" },
    { name: "Git/Version Control", level: 75, category: "Tools", icon: "🔄" },
    { name: "Computer Vision", level: 80, category: "Machine Learning", icon: "👁️" },
    { name: "Data Analysis", level: 85, category: "Machine Learning", icon: "📈" },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            My Skills
          </h2>
          <div className="divider" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of the technologies and tools I've worked with throughout my career
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="glass-card p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{skill.icon}</span>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                <motion.div 
                  className="bg-primary h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-foreground/70">
                <span>{skill.category}</span>
                <span>{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
