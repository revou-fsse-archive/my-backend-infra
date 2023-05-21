import { Injectable, NotFoundException } from "@nestjs/common";
import { createApi as unsplashCreateApi } from "unsplash-js";

import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

import { PrismaService } from "src/prisma/prisma.service";
import { createArticleSlug } from "src/utils/slug";

const unsplash = unsplashCreateApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
        publishedAt: {
          lte: new Date(),
        },
      },
      include: {
        author: true,
      },
    });
  }

  findDrafts() {
    return this.prisma.article.findMany({
      where: { published: false },
      include: {
        author: true,
      },
    });
  }

  findIDs() {
    return this.prisma.article.findMany({
      select: { id: true },
    });
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if (!article) {
      throw new NotFoundException(`Article with id: ${id} does not exist`);
    }
    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    const result = await unsplash.photos.getRandom({
      query: createArticleDto.title,
      count: 1,
    });
    const randomImageUrl = result?.response[0]?.urls?.regular;

    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        imageUrl: randomImageUrl || "",
        slug: createArticleSlug(createArticleDto.title),
        publishedAt: createArticleDto.published ? new Date() : null,
      },
      include: {
        author: true,
      },
    });
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: {
        ...updateArticleDto,
        slug: createArticleSlug(updateArticleDto.title),
        publishedAt: updateArticleDto.published ? new Date() : null,
      },
      include: {
        author: true,
      },
    });
  }

  removeAll() {
    return this.prisma.article.deleteMany();
  }

  remove(id: string) {
    return this.prisma.article.delete({
      where: { id },
      include: {
        author: true,
      },
    });
  }
}
