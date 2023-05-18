import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  ArticleCountEntity,
  ArticleEntity,
  ArticleIDEntity,
} from "./entities/article.entity";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("articles")
@ApiTags("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get("drafts")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    const articles = await this.articlesService.findDrafts();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get("ids")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleIDEntity, isArray: true })
  async findIDs() {
    const articles = await this.articlesService.findIDs();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(":id")
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param("id") id: string) {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.articlesService.create(createArticleDto);
    return new ArticleEntity(article);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    const article = await this.articlesService.update(id, updateArticleDto);
    return new ArticleEntity(article);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async patch(
    @Param("id") id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ) {
    const article = await this.articlesService.update(id, updateArticleDto);
    return new ArticleEntity(article);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleCountEntity })
  removeAll() {
    return this.articlesService.removeAll();
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param("id") id: string) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
