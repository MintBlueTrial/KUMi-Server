import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/login/login.schema';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'userInfo',
                    schema: UserSchema,
                    collection: 'user'
                }
            ]
        )
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
