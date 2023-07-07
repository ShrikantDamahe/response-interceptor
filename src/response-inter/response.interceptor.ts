/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable,map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MongoClient, Db } from 'mongodb';

export interface Response<T> {
    data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name);
  private readonly url: string = 'mongodb://127.0.0.1:27017';
  private readonly dbName: string = 'response';
  private client: MongoClient;
  private db: Db;

  //refrence from https://stackoverflow.com/questions/71342465/use-custom-interceptors-for-the-response
  //https://docs.nestjs.com/interceptors#binding-interceptors

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    // // const req = httpContext.getRequest();
    const res = httpContext.getResponse();
   
    const class_name = context.getClass().name;
    const timestamp = new Date().toISOString();


    return next.handle().pipe(map(data =>({
        data:data,
        message:data.message,
        statusCode: context.switchToHttp().getResponse().statusCode,
        class_name:`${class_name}`, timestamp:`${timestamp}`
        
    })) 
    );
  }

}
