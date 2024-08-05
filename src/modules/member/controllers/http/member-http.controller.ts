import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberServicePort } from 'src/modules/member/services/member.service.port'
import { MemberResponse } from '../../responses/member.response';
import { CreateMemberRequest } from '../../requests/member.request';
import { MemberMapper } from '../../member.mapper';
import { IdResponse } from 'src/libs/api/id.response.dto';
import { ApiCommonResponses } from 'src/common/utils/swagger-response-helper';

@ApiTags('Member')
@ApiCommonResponses('Member')
@Controller('members')
export class MemberController {
  constructor(
    private readonly _memberService: MemberServicePort,
    private readonly memberMapper: MemberMapper,
  ) {}

  @ApiResponse({ type: MemberResponse })
  @Get(':code')
  async getMemberByCode(@Param('code') code: string): Promise<MemberResponse> {
    const result = await this._memberService.findByCode(code);

    return this.memberMapper.toResponse(result);
  }
}
