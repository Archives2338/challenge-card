/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'comercio'})
export class Comercio {
  @PrimaryGeneratedColumn('increment')
  idComercio: number;
  @Column('text')
  nombreComercio: string;
}
