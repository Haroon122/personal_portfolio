import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FileText, Download, Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/config";

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('is_active', 'true');

    try {
      const response = await fetch(`${API_URL}/resumes/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Resume uploaded successfully.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload resume');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      // Check if the error is due to the backend server not being available
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        toast({
          title: "Backend Server Not Available",
          description: "The backend server is not running. Please start the backend server by running 'python manage.py runserver' in the backend directory.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to upload resume. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleResumeDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`${API_URL}/resumes/download/`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No resume found');
      }
    } catch (error) {
      console.error('Download error:', error);
      
      // Check if the error is due to the backend server not being available
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        toast({
          title: "Backend Server Not Available",
          description: "The backend server is not running. Please start the backend server by running 'python manage.py runserver' in the backend directory.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to download resume. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

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
    <section id="resume" className="py-20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            My Resume
          </h2>
          <div className="divider" />
          <p className="text-foreground/80 max-w-2xl mx-auto">
            View or download my resume to learn more about my professional experience and skills
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto bg-card p-6 md:p-10 rounded-xl shadow-lg"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Muhammad Haroon</h3>
              <p className="text-foreground/70 mb-4">App Developer | Python & Django Expert | ML Enthusiast | UI Designer</p>
              <p className="text-foreground/80">
                Download my resume to get a detailed overview of my experience, education, and projects. 
                Or upload a new version if you're viewing your own portfolio.
              </p>
            </div>
            <div className="w-40 h-40 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              <FileText size={48} className="text-foreground/40" />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={handleResumeDownload}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
            </button>
            
            <label className="flex items-center justify-center gap-2 btn-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={isUploading}
              />
              <Upload size={18} />
              <span>{isUploading ? 'Uploading...' : 'Upload New Resume'}</span>
            </label>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
