import { Group } from "../entitites/group";

export interface GroupRepository {
  save(group: Group): Promise<Group>;
  findById(_id: string): Promise<Group | null>;
  findByEmail(email: string): Promise<Group | null>;
  findAll(): Promise<Group[]>;
}