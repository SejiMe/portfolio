import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      img_path: image().optional(),
      img_alt: z.string(),
    }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date().optional(),
        year: z.coerce.number().optional(),
        img_path: image().optional(),
        img_alt: z.string(),
        technologies: z.array(z.string()),
        project_link: z.string().optional(),
        project_github_link: z.string().optional(),
      }),
});

export const collections = {
  posts,
  projects,
};