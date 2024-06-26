import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Note } from './note.entity';


@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(note: Note): Promise<Note> {
    return this.notesRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    return this.notesRepository.findOne({where: {id:id}});
  }

  async update(id: number, note: Note): Promise<Note> {
    await this.notesRepository.update(id, note);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async archive(id: number): Promise<Note> {
    const note = await this.findOne(id);
    note.archived = true;
    return await this.notesRepository.save(note);
  }

  async unarchive(id: number): Promise<Note> {
    const note = await this.findOne(id);
    note.archived = false;
    return await this.notesRepository.save(note);
  }

  async findActiveNotes(): Promise<Note[]> {
    try {
      const queryBuilder = this.notesRepository.createQueryBuilder('note')
        .where('note.archived = :archived', { archived: false })
        .leftJoinAndSelect('note.user', 'user');

      const query = queryBuilder.getQueryAndParameters();
      this.logger.log(`Executing SQL query: ${query[0]}, parameters: ${JSON.stringify(query[1])}`);

      return await queryBuilder.getMany();
    } catch (error) {
      this.logger.error(`Error in findActiveNotes: ${error.message}`);
      throw error;
    }
  }


  async findArchivedNotes(): Promise<Note[]> {
    return await this.notesRepository.find({ where: { archived: true }});
  }



}