/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { testModule, usePipes } from './app-test.module';

const url= '/payment-process';
const body = {
  "card_number":4110905021420178,
  "cvv":123,
  "expiration_month":"12",
  "expiration_year": "2028",
  "email":"cardqwq@gmail.com"
}
describe('TestController (e2e)', () => {
  let app: INestApplication;
  let token = '';
  beforeEach(async () => {
    const moduleFixture: TestingModule = await testModule.compile();
    app = moduleFixture.createNestApplication();
    usePipes(app);
    await app.init();
  });

  // POST payment-process/v2/token
  // LE ENVIAMOS UN OBJETO predeterminado para pruebas

  it('/payment-process/v2/token (POST)', () => {

    return request(app.getHttpServer())
      .post(url+'/v2/token')
      .send(body)
      .expect(201)
      .expect((res) => {

        expect(res.body).toHaveProperty('token');
        token = res.body.token;
      });
  }
  );

  // GET payment-process/v2/charge
  // x-comercio-id = 150809
  // token generado en el test anterior

  it('/payment-process/v2/charge (GET)', () => {


        return request(app.getHttpServer())
        .get(url+'/v2/charge')
        .set('x-comercio-id', '150809')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res2) => {
          console.log(res2.body);
          expect(res2.body).toHaveProperty('comercio');
        });

  });

});
