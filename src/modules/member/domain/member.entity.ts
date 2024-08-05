import { AggregateID, AggregateRoot } from "src/libs/ddd";
import { CreateMemberProps, MemberProps } from './member.types';

import { ulid } from 'ulid';
import { MemberCreatedDomainEvent } from "./events/member-created.domain-event";
import { randomUUID } from "crypto";

export class MemberEntity extends AggregateRoot<MemberProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateMemberProps): MemberEntity {
    const id = ulid();

    const props: MemberProps = {
      ...create,
    };
    const member = new MemberEntity({ id, props });

    member.addEvent(
      new MemberCreatedDomainEvent(
        {
          aggregateId = id,
          name =
        }
      ),
    );

    return member;
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
