import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'messages',
})
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'conversation_id',
  })
  conversationId: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'content',
  })
  content: string;

  @Column({
    name: 'is_deleted',
  })
  isDeleted: boolean;

  @Column({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;
}
