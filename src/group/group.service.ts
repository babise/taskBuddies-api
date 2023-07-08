import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(createGroupDto: CreateGroupDto, user: UserEntity) {
    try {
      const group = new GroupEntity();
      group.createdBy = user;
      group.name = createGroupDto.name;
      group.entryCode = await this.generateUniqueEntryCode(); // Génère un code d'entrée unique
      group.users = [user];

      const savedGroup = await this.groupRepository.save(group);
      console.log('Group saved successfully:', savedGroup);
      return savedGroup;
    } catch (error) {
      console.error('Error saving group:', error);
      throw error;
    }
  }

  async generateUniqueEntryCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 8;
    const maxAttempts = 10; // Limite d'essais

    let entryCode = '';
    let codeExists = true;
    let attempts = 0;

    while (codeExists && attempts < maxAttempts) {
      entryCode = '';

      // Génère un code d'entrée
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        entryCode += characters.charAt(randomIndex);
      }

      // Vérifie si le code existe déjà
      const existingGroup = await this.groupRepository.findOne({
        where: { entryCode: entryCode },
      });
      codeExists = !!existingGroup;
      attempts++;
    }

    if (codeExists) {
      throw new Error("Impossible de générer un code d'entrée unique.");
    }

    return entryCode;
  }

  findAll() {
    const groups = this.groupRepository.find({ relations: ['createdBy'] });
    return groups;
  }

  findOne(id: number) {
    const group = this.groupRepository.findBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      const group = await this.groupRepository.findBy({ id });
      if (!group) {
        throw new Error(`Group with id ${id} not found.`);
      }
      const updatedGroup = Object.assign(group, updateGroupDto);
      await this.groupRepository.save(updatedGroup);
      return updatedGroup;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const group = await this.groupRepository.findBy({ id });
      if (!group) {
        throw new Error(`Group with id ${id} not found.`);
      }
      await this.groupRepository.remove(group);
      return `Group with id ${id} successfully removed.`;
    } catch (error) {
      console.error('Error removing group:', error);
      throw error;
    }
  }

  async joinGroup(entryCode: string, user: UserEntity) {
    try {
      // Rechercher le groupe avec le code d'entrée
      const group = await this.groupRepository.findOne({
        where: { entryCode },
        relations: ['users'],
      });

      if (!group) {
        throw new Error('Group not found with the provided entry code.');
      }

      // Vérifier si l'utilisateur fait déjà partie du groupe
      const isUserAlreadyInGroup = group.users.some((u) => u.id === user.id);
      if (isUserAlreadyInGroup) {
        throw new Error('User is already a member of the group.');
      }

      // Ajouter l'utilisateur à la liste des utilisateurs du groupe
      group.users.push(user);

      // Enregistrer le groupe mis à jour
      const updatedGroup = await this.groupRepository.save(group);

      return updatedGroup;
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  }
}
