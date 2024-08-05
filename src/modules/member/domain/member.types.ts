// All properties that a User has
export interface MemberProps {
  id: number;
  props: CreateMemberProps;
}

// Properties that are needed for a user creation
export interface CreateMemberProps {
  name: string;
  email: string;
  password: string;    
  date_of_birth: bigint;
  phone_number: string;
  date_created: bigint;
  date_updated: bigint;  
  status: string;
}

// Properties used for updating a user address
export interface UpdateUserAddressProps {
  address: string;
}

export enum UserRoles {
  admin = 'admin',
  moderator = 'moderator',
  guest = 'guest',
}
