import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './config/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        type: configService.get<string>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities,
        logging: configService.get<string>('APP_MODE') !== 'prod',
        migrations: [
          path.join(__dirname, './config/database/migrations/*{.ts,.js}'),
        ],
        cli: {
          migrationsDir: __dirname + 'src/config/database/migrations',
        },
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
