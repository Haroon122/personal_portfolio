
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Face Recognition Attendance System",
      description: "An AI-powered system using facial recognition to automate student or employee attendance, improving accuracy and efficiency while reducing manual work.",
      image: "https://plurilock.com/wp-content/uploads/2024/02/dreamstime_m_137534981-1024x661.jpg",
      technologies: ["Python", "OpenCV", "Machine Learning","TkInter"],
      githubLink: "https://github.com/Haroon122/my-attendance-project-py",
    },
    {
      id: 2,
      title: "Object Detection System",
      description: "ML-based object detection system that identifies and tracks objects in real-time, useful for security, retail analytics, and autonomous vehicles.",
      image: "https://pub-78e8b992938d4febbc6f32ae504610f6.r2.dev/2024/11/resized-image-Promo-6-1536x769.jpeg",
      technologies: ["OpenCV", "Python", "Computer Vision", "yolo"],
      githubLink: "https://github.com/Haroon122/real_time_object_detection_system",
    },
    {
      id: 3,
      title: "Employee Management System",
      description: "A comprehensive system for managing employee records, attendance, and payroll, enhancing HR efficiency and data accuracy.",
      image: "https://i.ytimg.com/vi/rXclo2ydkQM/maxresdefault.jpg",
      technologies: ["Python", "Tkinter", "MySQL"],
      githubLink: "https://github.com/Haroon122/Employee-Management-System",
    },
    {
      id: 4,
      title: "TaleForge - A Storytelling Platform",
      description: "A web application that allows users to create, share, and read stories, fostering a community of writers and readers.",
      image: "https://statics.topai.tools/img/tools/thumbs/storybooks.webp",
      technologies: ["Python", "Django", "MySQL"],
      githubLink: "https://github.com/Haroon122/Django_Create_Story_assignment",
    },
    {
      id: 5,
      title: "Student Management System",
      description: "A comprehensive system for managing student records, attendance, and grades, enhancing educational administration and data accuracy.",
      image: "data:image/png;base64,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",
      technologies: ["Python", "Django", "MySQL"],
      githubLink: "https://github.com/Haroon122/Django_student_management",
    },
    {
      id: 6,
      title: "Train Food Delivery App",
      description: "A user-friendly app for ordering food on trains, ensuring timely delivery and a seamless dining experience for travelers.",
      image: "https://www.businessofapps.com/wp-content/uploads/2022/01/emizen_tech_food_deliver_img1.png",
      technologies: ["Android", "JAVA", "Firebase", "XML","Google Maps","Payment gateway"],
      githubLink: "https://github.com/Haroon122/Train_Bites",
    },
   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-20 bg-muted/30 dark:bg-muted/5">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            My Projects
          </h2>
          <div className="divider" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of the innovative projects I've worked on
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="rounded-xl overflow-hidden bg-card shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform:
                      hoveredProject === project.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-foreground/80 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Github size={18} />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
