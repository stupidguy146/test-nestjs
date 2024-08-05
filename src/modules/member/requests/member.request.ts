import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMemberRequest {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsString()
  readonly name: string;
}
