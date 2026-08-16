import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import ProjectInitializer from "@/components/interactions/ProjectInitializer";
import styles from "./page.module.css";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Client component to sync the project ID to the global store */}
      <ProjectInitializer projectId={project.id} />
      
      <div className={`container ${styles.caseStudy}`}>
        <header className={styles.hero}>
          <div className={styles.meta}>
            <span className="text-caption">{project.category}</span>
            <span className="text-caption">{project.year}</span>
          </div>
          
          <h1 
            className={`text-display ${styles.title}`}
            style={{ color: project.color }}
          >
            {project.title}
          </h1>
          
          <p className={styles.role}>Role: {project.role}</p>

          <div className={styles.links}>
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkButton}
              >
                Visit Site
              </a>
            )}
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkButton}
              >
                Source Code
              </a>
            )}
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Challenge</h2>
          <p className={styles.bodyText}>{project.challenge}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Solution</h2>
          <p className={styles.bodyText}>{project.solution}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Outcomes</h2>
          <p className={styles.bodyText}>{project.outcome}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies</h2>
          <div className={styles.techGrid}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
