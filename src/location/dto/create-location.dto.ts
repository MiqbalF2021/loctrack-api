import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

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
}