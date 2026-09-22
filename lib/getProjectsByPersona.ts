import { projects, Project, PersonaTag } from "@/content/projects";
import { personas, PersonaConfig } from "@/content/personas";

/**
 * Returns projects filtered for a given persona key or tag.
 * For "personal", returns all projects.
 * For "dev", returns projects tagged with "dev" or "devops".
 * For "ai", returns projects tagged with "ai".
 */
export function getProjectsByPersona(personaKey: "personal" | "dev" | "ai" | PersonaTag): Project[] {
  if (personaKey === "personal") {
    return projects;
  }

  const personaConfig = personas[personaKey as "dev" | "ai"];
  if (personaConfig) {
    const filterTags = personaConfig.projectFilter;
    return projects.filter((project) =>
      project.tags.some((tag) => filterTags.includes(tag))
    );
  }

  // Fallback direct tag filter
  return projects.filter((project) => project.tags.includes(personaKey as PersonaTag));
}

/**
 * Returns a single project by its slug.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Returns all project slugs for static generation.
 */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/**
 * Returns featured projects for a given persona.
 */
export function getFeaturedProjects(personaKey: "personal" | "dev" | "ai"): Project[] {
  const personaProjects = getProjectsByPersona(personaKey);
  return personaProjects.filter((p) => p.featured);
}

/**
 * Returns previous and next projects relative to current slug.
 */
export function getAdjacentProjects(currentSlug: string): { prev?: Project; next?: Project } {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
