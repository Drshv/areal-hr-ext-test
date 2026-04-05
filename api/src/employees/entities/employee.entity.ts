import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middle_name: string;

  @Column({ type: 'date' })
  birth_date: string;

  @Column({ type: 'varchar', length: 4 })
  passport_series: string;

  @Column({ type: 'varchar', length: 6 })
  passport_number: string;

  @Column({ type: 'date' })
  passport_issue_date: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  passport_division_code: string;

  @Column({ type: 'text', nullable: true })
  passport_issued_by: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  registration_region: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  registration_locality: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  registration_street: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  registration_house: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  registration_building: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  registration_apartment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}