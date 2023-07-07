/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';
import { CreateLogDto } from './dto/response.dto';

@Injectable()
export class ResponseService {
  private readonly uri: string = 'mongodb://127.0.0.1:27017'; 
  private readonly dbName: string = 'login';
  private client: MongoClient;
  private db: Db;
  private logsCollection: Collection<any>;

  constructor() {
    this.client = new MongoClient(this.uri);
    this.connectToMongoDB();
  }

  async create(createLogDto: CreateLogDto): Promise<any> {
    const result: InsertOneResult<any> = await this.logsCollection.insertOne(createLogDto);
    return result.insertedId || null;
  }

  async findAll(): Promise<any[]> {
    const logs = await this.logsCollection.find().toArray();
    return logs;
  }

  private async connectToMongoDB(): Promise<void> {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.logsCollection = this.db.collection('add');

    // if (!this.logsCollection) {
    //   throw new Error('Failed to initialize logs collection');
    // }
  }
}
