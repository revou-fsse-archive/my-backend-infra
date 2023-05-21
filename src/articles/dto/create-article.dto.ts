import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ default: "Example title" })
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false, default: "Example description" })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: "Example body for longer content..." })
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean;
}
