import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async create(createTagDto: CreateTagDto, user: UserEntity) {
    try {
      const tag = new TagEntity();
      tag.title = createTagDto.title;
      tag.icon = createTagDto.icon;
      tag.createdBy = user;

      const savedTag = await this.tagRepository.save(tag);
      return savedTag;
    } catch (error) {
      console.error('Error detail:', error);
      throw new Error('Error creating tag');
    }
  }

  async findAll() {
    try {
      const tags = await this.tagRepository.find({
        relations: ['createdBy'],
      });
      return tags;
    } catch (error) {
      throw new Error('Error finding tags');
    }
  }

  async findOne(id: number) {
    try {
      const tag = await this.tagRepository.findBy({ id });
      return tag;
    } catch (error) {
      throw new Error('Error finding tag');
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      const tag = await this.tagRepository.update(id, updateTagDto);
      return tag;
    } catch (error) {
      throw new Error('Error updating tag');
    }
  }

  async remove(id: number) {
    try {
      const tag = await this.tagRepository.softRemove({ id });
      return tag;
    } catch (error) {
      throw new Error('Error deleting tag');
    }
  }
}
