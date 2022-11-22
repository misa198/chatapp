import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'conversations',
})
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name?: string;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;
}
