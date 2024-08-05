import { Injectable, Logger } from '@nestjs/common';
import { member } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { MemberRepositoryPort } from './member.repository.port';
import { MemberEntity } from '../domain/member.entity';
import { MemberMapper } from '../member.mapper';
import { SqlRepositoryBase } from '@src/libs/db/sql-repository.base';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MemberRepository
  extends SqlRepositoryBase<MemberEntity, member>
  implements MemberRepositoryPort
{
  protected tableName: string = 'member';

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly mapper: MemberMapper,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(
      prisma,
      mapper,
      eventEmitter,
      new Logger(MemberRepository.name),
    )
  }

  async findAll(): Promise<MemberEntity[]> {
    const result = await this.prisma.member.findMany();
    return result.map(this.mapper.toDomain);
  }

  async findByCode(memberCode: string): Promise<MemberEntity | null> {
    const result = await this.prisma.member.findUnique({ where: { memberCode } });

    return this.mapper.toDomain(result);
  }

  async update(id: string, member: Partial<member>): Promise<member> {
    return this.prisma.member.update({ where: { id }, data: member });
  }
}
