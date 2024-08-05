import { Module, Provider } from '@nestjs/common';
import { MemberService } from './services/member.service';
import { MemberController } from './controllers/http/member-http.controller';
import { MemberRepository } from './database/member.repository';
import { MEMBER_REPOSITORY, MEMBER_SERVICE } from 'src/common/shared/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma.module';
import { MemberMapper } from './member.mapper';

const repositories: Provider[] = [
  {
    provide: MEMBER_REPOSITORY,
    useClass: MemberRepository,
  },
];

const services: Provider[] = [
  {
    provide: MEMBER_SERVICE,
    useClass: MemberService,
  },
];

const mappers: Provider[] = [
  MemberMapper,
];

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [
    ...services,
    ...repositories,
    ...mappers,
  ],
  exports: [],
})

export class MemberModule {}
