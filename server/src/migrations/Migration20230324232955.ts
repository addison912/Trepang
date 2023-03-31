import { Migration } from '@mikro-orm/migrations';

export class Migration20230324232955 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "title" text not null, "date_created" timestamptz(0) not null, "date_updated" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" serial primary key, "email" text not null, "username" text not null, "password" text not null, "date_created" timestamptz(0) not null, "date_updated" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
