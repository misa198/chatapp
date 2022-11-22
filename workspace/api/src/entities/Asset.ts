import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'assets',
})
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'type',
  })
  type: string;

  @Column({
    name: 'uri',
  })
  uri: string;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;
}
