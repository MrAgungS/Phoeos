import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { UploadsService } from './uploads.service';

@Controller('/api/s3/uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
}
