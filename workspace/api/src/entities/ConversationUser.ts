import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'conversation_user',
})
export class ConversationUser {
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
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
  })
  updatedAt: Date;
}
