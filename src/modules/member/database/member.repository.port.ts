import { Member } from '@prisma/client';
import { RepositoryPort } from 'src/libs/ddd';
import { MemberEntity } from '../domain/member.entity';

export interface MemberRepositoryPort extends RepositoryPort<MemberEntity> {
  findAll(): Promise<MemberEntity[]>;
  findByCode(code: string): Promise<MemberEntity | null>;
  update(id: string, member: Partial<Member>): Promise<Member>;
}
