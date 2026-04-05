import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('operation_history')
export class OperationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  operation_datetime: Date;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar', length: 50 })
  object_type: string;

  @Column({ type: 'uuid' })
  object_id: string;

  @Column({ type: 'varchar', length: 100 })
  field_name: string;

  @Column({ type: 'text', nullable: true })
  old_value: string;

  @Column({ type: 'text', nullable: true })
  new_value: string;

  @CreateDateColumn()
  created_at: Date;
}