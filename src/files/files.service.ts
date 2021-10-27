import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { EHttpExceptionMessage } from '@shared/exceptions/http.exception';
import { FileDto } from 'chat/chat/dto/file.dto';

@Injectable()
export class FilesService {
  public async createFile(
    file: FileDto,
    pathName: string,
  ): Promise<{ name: string; size: number }> {
    try {
      const fileName = uuid.v4() + '$' + file.originalName;
      const filePath = path.resolve(__dirname, '..', 'static', pathName);
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return { name: fileName, size: file.size };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        EHttpExceptionMessage.InvalidData,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
