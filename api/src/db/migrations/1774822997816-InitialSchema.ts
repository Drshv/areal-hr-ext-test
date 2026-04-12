import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1774822997816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE "organizations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "comment" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_organizations" PRIMARY KEY ("id")
      );

      CREATE TABLE "departments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "parent_id" uuid,
        "name" character varying(255) NOT NULL,
        "comment" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_departments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_departments_organizations" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION,
        CONSTRAINT "FK_departments_parent" FOREIGN KEY ("parent_id") REFERENCES "departments"("id") ON DELETE NO ACTION
      );

      CREATE TABLE "positions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "organization_id" uuid NOT NULL,
        "name" character varying(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_positions" PRIMARY KEY ("id"),
        CONSTRAINT "FK_positions_organizations" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE NO ACTION
      );

      CREATE TABLE "employees" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "last_name" character varying(100) NOT NULL,
        "first_name" character varying(100) NOT NULL,
        "middle_name" character varying(100),
        "birth_date" date NOT NULL,
        "passport_series" character varying(4) NOT NULL,
        "passport_number" character varying(6) NOT NULL,
        "passport_issue_date" date NOT NULL,
        "passport_division_code" character varying(7),
        "passport_issued_by" text,
        "registration_region" character varying(100),
        "registration_locality" character varying(100),
        "registration_street" character varying(100),
        "registration_house" character varying(20),
        "registration_building" character varying(20),
        "registration_apartment" character varying(20),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_employees" PRIMARY KEY ("id")
      );

      CREATE TABLE "files" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "file_path" character varying(512) NOT NULL,
        "employee_id" uuid NOT NULL,
        "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_files" PRIMARY KEY ("id"),
        CONSTRAINT "FK_files_employees" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION
      );

      CREATE TABLE "hr_operations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "employee_id" uuid NOT NULL,
        "operation_type" character varying(50) NOT NULL,
        "operation_date" TIMESTAMP NOT NULL,
        "department_id" uuid,
        "position_id" uuid,
        "salary" decimal(10,2),
        "dismiss_reason" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_hr_operations" PRIMARY KEY ("id"),
        CONSTRAINT "FK_hr_employees" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION,
        CONSTRAINT "FK_hr_departments" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE NO ACTION,
        CONSTRAINT "FK_hr_positions" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE NO ACTION
      );

      CREATE TABLE "operation_history" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "operation_datetime" TIMESTAMP NOT NULL,
        "user_id" uuid NOT NULL,
        "object_type" character varying(50) NOT NULL,
        "object_id" uuid NOT NULL,
        "field_name" character varying(100) NOT NULL,
        "old_value" text,
        "new_value" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "PK_operation_history" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "operation_history";
      DROP TABLE IF EXISTS "hr_operations";
      DROP TABLE IF EXISTS "files";
      DROP TABLE IF EXISTS "employees";
      DROP TABLE IF EXISTS "positions";
      DROP TABLE IF EXISTS "departments";
      DROP TABLE IF EXISTS "organizations";
    `);
  }
}