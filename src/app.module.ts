import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { HttpExceptionsFilter } from './logger/exceptions/http.exception.filter';
import { LoggerInterceptor } from './logger/logger.interceptor';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    PrismaModule,
    TrackModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule {}
