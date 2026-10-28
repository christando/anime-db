import slugify from "slugify";
import { prisma } from "./prisma";

export async function generateUniqueSlug(
  title: string,
  model: "anime" | "genre" | "studio",
  excludeId?: number
): Promise<string> {
  // Generate slug awal
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let existing = null;

    switch (model) {
      case "anime":
        existing = await prisma.anime.findFirst({
          where: {
            slug,
            ...(excludeId && {
              NOT: {
                id: excludeId,
              },
            }),
          },
        });
        break;

      case "genre":
        existing = await prisma.genre.findFirst({
          where: {
            slug,
            ...(excludeId && {
              NOT: {
                id: excludeId,
              },
            }),
          },
        });
        break;

      case "studio":
        existing = await prisma.studio.findFirst({
          where: {
            slug,
            ...(excludeId && {
              NOT: {
                id: excludeId,
              },
            }),
          },
        });
        break;
      
    }

    if (!existing) break;

    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}

export async function generateEpisodeSlug(
  animeTitle: string,
  episodeNumber: number,
  excludeId?: number
) {
  const baseSlug = slugify(
    `${animeTitle} ep ${episodeNumber}`,
    {
      lower: true,
      strict: true,
      trim: true,
    }
  );

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.episode.findFirst({
      where: {
        slug,
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });

    if (!existing) return slug;

    slug = `${baseSlug}-${counter++}`;
  }
}