
import slugify from "slugify";
import { prisma } from "./prisma";

export async function generateUniqueSlug(
  title: string,
  model: "anime" | "genre" | "studio",
  excludeId?: number
): Promise<string> {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let existing: { id: number } | null = null;

    switch (model) {
      case "anime":
        existing = await prisma.anime.findFirst({
          where: {
            slug,
            ...(excludeId !== undefined && {
              NOT: { id: excludeId },
            }),
          },
          select: { id: true },
        });
        break;

      case "genre":
        existing = await prisma.genre.findFirst({
          where: {
            slug,
            ...(excludeId !== undefined && {
              NOT: { id: excludeId },
            }),
          },
          select: { id: true },
        });
        break;

      case "studio": {
        // Model Studio belum memiliki field slug.
        // Periksa nama studio berdasarkan nama kandidat slug.
        const candidateName = title;

        existing = await prisma.studio.findFirst({
          where: {
            name: candidateName,
            ...(excludeId !== undefined && {
              NOT: { id: excludeId },
            }),
          },
          select: { id: true },
        });

        // Nama studio sudah unik di database.
        // Slug studio sebaiknya ditambahkan ke schema jika
        // ingin menyimpan dan menjamin keunikannya secara benar.
        if (!existing) {
          return slug;
        }

        break;
      }
    }

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter++}`;
  }
}

export async function generateEpisodeSlug(
  animeTitle: string,
  episodeNumber: number,
  excludeId?: number
): Promise<string> {
  const baseSlug = slugify(`${animeTitle} ep ${episodeNumber}`, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.episode.findFirst({
      where: {
        slug,
        ...(excludeId !== undefined && {
          NOT: { id: excludeId },
        }),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter++}`;
  }
}
