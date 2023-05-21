import { Article } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

import { UserEntity } from "src/users/entities/user.entity";

export class ArticleEntity implements Article {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  slug: string | null;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ required: false, nullable: true })
  publishedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  constructor({ author, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }
}

export class ArticleIDEntity {
  @ApiProperty()
  id: string;
}

export class ArticleCountEntity {
  @ApiProperty()
  count: number;
}
