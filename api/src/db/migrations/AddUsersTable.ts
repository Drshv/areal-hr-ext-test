import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1713648000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "last_name" varchar(100) NOT NULL,
        "first_name" varchar(100) NOT NULL,
        "middle_name" varchar(100),
        "login" varchar(100) NOT NULL,
        "password_hash" varchar(255) NOT NULL,
        "role_id" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "last_login_at" TIMESTAMP,
        CONSTRAINT "UQ_users_login" UNIQUE ("login"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}