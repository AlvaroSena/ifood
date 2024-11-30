import { Entity } from "./Entity";

export type GroupProps = {
  name: string;
  description?: string;
  merchantId: string;
  isActive: boolean;
  createdAt: Date;
}

export class Group extends Entity<GroupProps> {
  private constructor(props: GroupProps, _id?: string) {
    super(props, _id);
  }

  static create(props: GroupProps, _id: string) {
    const group = new Group(props, _id);

    return group;
  }
}