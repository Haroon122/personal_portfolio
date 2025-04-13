
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
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
    <section id="about" className="py-20 bg-muted/30 dark:bg-muted/5">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-heading mb-2">
            About Me
          </motion.h2>
          
          <motion.div variants={itemVariants} className="divider" />
          
          <motion.p variants={itemVariants} className="text-foreground/80 mb-8">
            A passionate developer and designer creating innovative solutions for complex problems
          </motion.p>
          
          <motion.div variants={itemVariants} className="text-left space-y-4">
            <p>
              I am a dedicated App Developer with expertise in Python, Django, and Machine Learning. 
              With a keen eye for UI/UX design, I blend technical skills with creative vision to build 
              applications that are not only functional but also aesthetically pleasing and user-friendly.
            </p>
            
            <p>
              My journey in technology began with a fascination for solving real-world problems through 
              code and automation. This led me to explore various domains, from web development to 
              artificial intelligence, always seeking to expand my knowledge and refine my skills.
            </p>
            
            <p>
              I specialize in developing applications that leverage the power of machine learning to 
              automate tasks and provide intelligent solutions. My projects like the Face Recognition 
              Attendance System and Object Detection System showcase my ability to implement 
              cutting-edge technologies for practical applications.
            </p>
            
            <p>
              I'm constantly learning and adapting to new technologies, with a particular interest in 
              enhancing user experiences through intuitive design and seamless functionality. When I'm 
              not coding or designing, you might find me exploring new tech trends or collaborating 
              with like-minded professionals on innovative projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
