import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schemas/profile.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Profile',
        schema: ProfileSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
