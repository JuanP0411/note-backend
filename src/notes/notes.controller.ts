import { Controller, Get, Post, Body, Param, Put, Delete, Patch, BadRequestException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() note: Note) {
    return this.notesService.create(note);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get('active')
  findActiveNotes() {
    return this.notesService.findActiveNotes();
  }

  
  @Get('archived')
  findArchivedNotes() {
    return this.notesService.findArchivedNotes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.notesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: Note) {

    return this.notesService.update(+id, note);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }


  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.notesService.archive(+id);
  }

  @Patch(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.notesService.unarchive(+id);
  }


}