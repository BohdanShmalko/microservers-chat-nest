import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESchemasName } from '@schemas/shemas-name.enum';
import { MessagesModel } from '@schemas/messages.schema';
import { MembersModel } from '@schemas/members.schema';
import { FilesModel } from '@schemas/files.schema';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(ESchemasName.Files)
    filesRepo: Model<FilesModel>,
  ) {}
}
