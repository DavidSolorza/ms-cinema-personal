import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { TheaterResponseDto } from './dto/theater-response.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { TheatersService } from './theaters.service';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Post()
  create(@Body() dto: CreateTheaterDto): Promise<TheaterResponseDto> {
    return this.theatersService.create(dto);
  }

  @Get()
  findAll(): Promise<TheaterResponseDto[]> {
    return this.theatersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TheaterResponseDto> {
    return this.theatersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTheaterDto,
  ): Promise<TheaterResponseDto> {
    return this.theatersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.theatersService.remove(id);
  }

  @Get('reports/large/:minCapacity')
  largeReport(
    @Param('minCapacity', ParseIntPipe) minCapacity: number,
  ): Promise<TheaterResponseDto[]> {
    return this.theatersService.getLargeTheatersReport(minCapacity);
  }
}
