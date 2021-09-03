import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const response = errors.map((err: ValidationError) => {
        if (err.children.length)
          return `incorrect ${err.property} - ${err.children.map(
            (obj) => `#${obj.property}`,
          )}`;
        return `${err.property} - ${Object.values(err.constraints)}`;
      });
      throw new ValidationException(response);
    }
    return value;
  }
}
