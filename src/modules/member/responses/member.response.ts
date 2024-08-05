import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from 'src/libs/api/response.base';

export class MemberResponse extends ResponseBase {
  @ApiProperty({
    example: 'joh-doe@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: "Member's name",
  })
  name: string;
}
