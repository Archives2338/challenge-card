/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentProcessController } from './controllers/payment-process/payment-process.controller';
import { PaymentProcessService } from './services/payment-process/payment-process.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comercio } from './entities/comercio.entity';
@Module({
  controllers: [PaymentProcessController],
  providers: [PaymentProcessService,JwtStrategy],
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory:()=>{
        return{
          secret:process.env.JWT_SECRET,
          signOptions:{
            expiresIn:'15m'
          }
        }
      }
      }),
    TypeOrmModule.forFeature([Comercio]),
  ],
  exports:[TypeOrmModule,JwtStrategy,PassportModule,JwtModule]
})
export class PaymentProcessModule {}
