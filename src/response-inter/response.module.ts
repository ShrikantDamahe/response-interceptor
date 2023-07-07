/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService, ResponseInterceptor],
})
export class ResponseModule {}
