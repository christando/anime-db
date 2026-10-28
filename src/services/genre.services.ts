import { GenreRepository } from "@/repositories/genre.repository";
import { Prisma } from "@prisma/client";

export class GenreService{
    private repository = new GenreRepository();

    async createGenre(data: Prisma.GenreCreateInput){
        return this.repository.create(data);
    }
    async getAll(){
        return this.repository.getAll();
    }

    async genreById(id:number){
        return this.repository.getGenreById(id);
    }

    async updateGenre(id:number, data: Prisma.GenreUpdateInput){
        return this.repository.update(id, data);
    }

    async deleteGenre(id:number){
        return this.repository.delete(id);
    }
}