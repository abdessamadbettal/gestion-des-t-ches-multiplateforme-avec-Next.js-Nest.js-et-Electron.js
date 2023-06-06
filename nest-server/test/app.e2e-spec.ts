import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from 'supertest';
import { PrismaService } from "../src/prisma/prisma.service";
import { EditUserDto } from "src/user/dto";
import { CreateAppartementDto, EditAppartementDto } from "src/appartement/dto";

describe('Test of all function and cases of application', () => {
  let app: INestApplication
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  })
  afterAll(async () => {
    await app.close();
  })
  it.todo('should pass the verification of application')

  let token: string;

  describe('Auth', () => {
    let form = {
      email: 'abdo@gmail.com',
      password: '123456',
      name: 'abdo'
    }

    describe('Signup', () => {
      it('should throw if email empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            ...form,
            email: ''
          }).expect(400)
      })
      it('should throw if password empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            ...form,
            password: ''
          }).expect(400)
      })
      it('should throw if body empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send({
            ...form,
            password: '',
            email: ''
          }).expect(400)
      })
      it('should signup', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(form)
          .expect(201)
        expect(response.body).toEqual({
          access_token: expect.any(String)
        })
      })
    })
    describe('Signin', () => {
      it('should throw if email empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            ...form,
            email: ''
          }).expect(400)
      })
      it('should throw if password empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            ...form,
            password: ''
          }).expect(400)
      })
      it('should throw if body empty', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin').send({
            ...form,
            email: '',
            password: ''
          }).expect(400)
      })
      it('should throw if email not found', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            ...form,
            email: 'emailunfound@gmail.com'
          }).expect(403)
      })
      it('should throw if password not correct', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            ...form,
            password: '1234567'
          }).expect(403)
      })
      it('should signin', async () => {
        const response = await request(app.getHttpServer())
          .post('/auth/signin')
          .send(form)
          .expect(200)
        expect(response.body).toEqual({
          access_token: expect.any(String)
        })
        token = await response.body.access_token
      })
    })
  })

  describe('User', () => {
    describe('GetMe', () => {
      it('should throw if token not found', async () => {
        const response = await request(app.getHttpServer())
          .get('/users/me')
          .expect(401)
      })
      it('should throw if token not valid', async () => {
        const response = await request(app.getHttpServer())
          .get('/users/me')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })
    })
    describe('EditUser', () => { 
      const dto:EditUserDto = {
        name: 'abdessamde',
        email: 'abdessamado@gmail.com'
      }
      it('should throw if token not found', async () => {
        const response = await request(app.getHttpServer())
          .patch('/users/me')
          .send(dto)
          .expect(401)
      })
      it('should throw if token not valid', async () => {
        const response = await request(app.getHttpServer())
          .patch('/users/me')
          .send(dto)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
          // resultat doit etre le meme que dto
          expect(response.body).toEqual({
            name: dto.name,
            email: dto.email ,
            id: expect.any(Number) ,
            role: expect.any(String) ,
            createdAt: expect.any(String) ,
            updatedAt: expect.any(String) 

          })

      })
    })
  })
  describe('Appartement', () => { 
    describe('GetAppartement', () => {
      it('should throw if token not found', async () => {
        const response = await request(app.getHttpServer())
          .get('/appartements')
          .expect(401)
      })
      it('should throw if token not valid', async () => {
        const response = await request(app.getHttpServer()) 
          .get('/appartements')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })
     })
    describe('CreateAppartement', () => {
      const dto:CreateAppartementDto = {
        name: 'appartement 1',
        address: 'appartement 1 rue 3',
        price: 1000,
        etage: 1,
        room: 1,
        bloc: "D",
        city: "youssoufia" ,
        userId: 3
      }
      it('should throw not create appartement if token not valid', async () => {
        const response = await request(app.getHttpServer())
          .post('/appartements')
          .send(dto)
          .expect(401)
      })
      it('should throw create appartement if token valid', async () => {
        const response = await request(app.getHttpServer())
          .post('/appartements')
          .send(dto)
          .set('Authorization', 'Bearer ' + token)
          .expect(201)
      })
     })
    describe('EditAppartement', () => {
      const dto:EditAppartementDto = {
        name: 'appartement 1',
        address: 'appartement 1 rue 3',
        price: 1000,
        etage: 1,
        room: 1,
        bloc: "D",
        city: "casablanca" ,
        userId: 3
      }
      it('should throw not edit appartement if token not valid', async () => {
        const response = await request(app.getHttpServer())
          .patch('/appartements/1')
          .send(dto)
          .expect(401)
      })
      it('should throw edit appartement if token valid', async () => {
        const response = await request(app.getHttpServer())
          .patch('/appartements/1')
          .send(dto)
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })

     })
    describe('DeleteAppartement', () => {
      it('should throw not delete appartement if token not valid', async () => {
        const response = await request(app.getHttpServer())
          .delete('/appartements/1')
          .expect(401)
      })
      it('should throw delete appartement if token valid', async () => {
        const response = await request(app.getHttpServer())
          .delete('/appartements/1')
          .set('Authorization', 'Bearer ' + token)
          .expect(200)
      })

        
      
    })
  })



}
)