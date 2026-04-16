import z, { ZodType } from 'zod';
import {
  CompressionStatus,
  UploadsStatus,
} from './interfaces/uploads.interface';

export class UploadsValidation {
  static readonly INITIATE: ZodType = z.object({
    upload_id: z.string().min(1),
    file_id: z.string().min(1),
    presigned_url: z.string().min(1),
    expires_at: z.string().min(1),
  });

  static readonly CONFIRM: ZodType = z.object({
    version_id: z.string().min(1),
    compression_status: z.string().min(1),
  });

  static readonly GET: ZodType = z.object({
    upload_id: z.string().min(1),
    upload_status: z.enum(UploadsStatus),
    version_id: z.string().min(1),
    compression_status: z.enum(CompressionStatus),
    created_at: z.string().min(1),
    updated_at: z.string().min(1),
  });
}
