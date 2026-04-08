import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidUtils {
  // Generate a new UUID as a buffer (for INSERT queries)
  static generateBinary(): Buffer {
    const uuid = uuidv4().replace(/-/g, '');
    return Buffer.from(uuid, 'hex');
  }

  // Convert UUID string to a buffer (for WHERE queries)
  static toUuidBinary(uuidString: string): Buffer {
    const hex = uuidString.replace(/-/g, '');
    return Buffer.from(hex, 'hex');
  }

  // Convert DB output buffer/binary to UUID string
  static toUuidString(binary: Buffer | string): string {
    const hex = Buffer.isBuffer(binary)
      ? binary.toString('hex')
      : Buffer.from(binary, 'binary').toString('hex');

    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20),
    ].join('-');
  }
}
