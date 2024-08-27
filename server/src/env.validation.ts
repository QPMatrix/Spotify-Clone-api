import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum ENV {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}
class EnvVariables {
  @IsEnum(ENV)
  NODE_ENV: ENV;
  @IsNumber()
  PORT: number;
  @IsString()
  JWT_SECRET: string;
  @IsString()
  DB_HOST: string;
  @IsNumber()
  DB_PORT: number;
  @IsString()
  DB_USER: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_DATABASE: string;
}
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
