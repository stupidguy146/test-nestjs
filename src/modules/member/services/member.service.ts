import { Inject, Injectable } from '@nestjs/common';
import { MemberRepositoryPort } from '../database/member.repository.port';
import { MemberServicePort } from '../services/member.service.port';
import { MemberEntity } from '../domain/member.entity';
import { CreateMemberProps } from '../domain/member.types';
import { AggregateID } from 'src/libs/ddd';
import { MEMBER_REPOSITORY } from 'src/common/shared/common';
import { Member } from '@prisma/client';

@Injectable()
export class MemberService implements MemberServicePort {
  constructor(
    @Inject(MEMBER_REPOSITORY)
    private readonly _memberRepo: MemberRepositoryPort,
  ) {}

  async findByCode(code: string): Promise<MemberEntity | null> {
    const result = await this._memberRepo.findByCode(code);
    return result;
  }

  async findAll(): Promise<MemberEntity[]> {
    const result = await this._memberRepo.findAll();
    return result;
  }
  async update(id: string, member: Partial<Member>): Promise<Member> {
    const result = await this._memberRepo.update(id,member);
    return result;
  }
}
