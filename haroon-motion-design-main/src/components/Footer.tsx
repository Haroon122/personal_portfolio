
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold font-heading">
              <span className="text-primary">H</span>aroon
            </h3>
            <p className="text-foreground/70 text-sm mt-2">
              App Developer | Python & Django Expert | ML Enthusiast
            </p>
          </div>
          
          <div className="flex gap-6 mb-6 md:mb-0">
            <a
              href="https://github.com/Haroon122/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-haroon-hafeez-b9608230b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          
          <div className="text-center md:text-right text-foreground/70 text-sm">
            <p className="flex items-center justify-center md:justify-end gap-1">
              Crafted with <Heart size={14} className="text-red-500" /> by Muhammad Haroon
            </p>
            <p>© {currentYear} All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
