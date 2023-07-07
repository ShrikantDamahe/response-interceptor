/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateLogDto } from './dto/response.dto';
import {ResponseInterceptor} from './response.interceptor'

@Controller('response')
@UseInterceptors(ResponseInterceptor)
export class ResponseController {
  constructor(private readonly logsService: ResponseService) {}

  @Post()
  create(@Body(ValidationPipe) createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  async findAll() {
    return this.logsService.findAll();
  }
}

