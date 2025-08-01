import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @IsOptional()
  @IsString()
  store?: string;
}
