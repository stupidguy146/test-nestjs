import { Mapper } from 'src/libs/ddd';
import { MemberEntity } from 'src/modules/member/domain/member.entity';
import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { MemberResponse } from './responses/member.response';
/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class MemberMapper
  implements Mapper<
    MemberEntity,
    Member,
    MemberResponse
  >
{
  toPersistence(entity: MemberEntity): any {
    const props = entity.getProps();
    return {
      id: entity.id,
      memberCode: props.memberCode,
      name: props.name,
      email: props.email,
      age: props.age,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  toDomain(record: Member): MemberEntity {
    return new MemberEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        name: record.name,
        email: record.email,
        memberCode: record.memberCode,
        age: record.age,
      }
    })
  }

  toResponse(entity: MemberEntity): MemberResponse {
    // const props = entity.getProps();
    // const response = new UserResponseDto(entity);
    // response.email = props.email;
    // response.country = props.address.country;
    // response.postalCode = props.address.postalCode;
    // response.street = props.address.street;
    // return response;
    
    const props = entity.getProps();
    const response = new MemberResponse(entity);
    response.name = props.name;

    return response;
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
