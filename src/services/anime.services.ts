import { AnimeRepository } from "@/repositories/anime.repository";
import { Prisma } from "@prisma/client";
import { generateUniqueSlug } from "@/lib/slug"

export class AnimeService {
  private repository = new AnimeRepository();

  async getLatestAnime() {
    return this.repository.findAll();
  }

  async getAnimePopular(){
    return this.repository.getPopular();
  }

  async getAnimeDetail(id: number) {
    const anime = await this.repository.findById(id);

    if (!anime) {
      throw new Error("Anime tidak ditemukan");
    }

    return anime;
  }

  async searchAnime(keyword: string) {
    return this.repository.search(keyword);
  }

   async getById(id: number) {
    return this.repository.findById(id);
  }

  async getAll(){
    return this.repository.getAll();
  }

  async findByName(keyword: string) {
    return this.repository.findByName(keyword);
  }

  async createAnime(data: Prisma.AnimeCreateInput) {
    const slug = await generateUniqueSlug(data.titleEn, "anime");
    return this.repository.create({...data, slug});
  }

  async updateAnime(id: number, data: Prisma.AnimeUpdateInput) {
    const slug = await generateUniqueSlug(data.titleEn, "anime", id)
    return this.repository.update(id, {...data, slug});
  }

  async deleteAnime(id: number) {
    return this.repository.delete(id);
  }
}