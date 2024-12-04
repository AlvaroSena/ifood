import { PrismaClient } from "@prisma/client";
import { GroupProps } from "../../../domain/entitites/group";
import { GroupRepository } from "../../../domain/repositories/group-repository";

export class PrismaGroupRepository implements GroupRepository {
  constructor(private prisma: PrismaClient) {}

  async save(group: GroupProps): Promise<GroupProps> {
    return await this.prisma.group.create({
      data: group,
    })
  }

  async findById(_id: string): Promise<GroupProps | null> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: _id,
      }
    });

    return group;
  }

  async findAll(): Promise<GroupProps[]> {
    const groups = await this.prisma.group.findMany();
    
    return groups;
  }
}