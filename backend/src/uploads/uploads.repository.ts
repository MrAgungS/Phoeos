import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database/database.service';

@Injectable()
export class UploadsRepository {
  constructor(private readonly databaseService: DatabaseService) {}
}
