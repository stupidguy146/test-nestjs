import { DomainEvent, DomainEventProps } from 'src/libs/ddd';

export class MemberCreatedDomainEvent extends DomainEvent {
  readonly name: string;
  readonly email: string;
  readonly password: string;    
  readonly date_of_birth: bigint;
  readonly phone_number: string;
  readonly date_created: bigint;
  readonly date_updated: bigint;  
  readonly status: string;

  constructor(props: DomainEventProps<MemberCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.date_of_birth = props.date_of_birth;
    this.phone_number = props.phone_number;
    this.date_created = props.date_created;
    this.date_updated = props.date_updated;
    this.status = props.status;
  }
}
