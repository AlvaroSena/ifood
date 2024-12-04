import { GroupProps } from "../entitites/group";

export interface GroupRepository {
  save(group: GroupProps): Promise<GroupProps>;
  findById(_id: string): Promise<GroupProps | null>;
  findAll(): Promise<GroupProps[]>;
}