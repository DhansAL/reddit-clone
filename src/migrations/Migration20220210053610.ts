import { Migration } from "@mikro-orm/migrations";

export class Migration20220210053610 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "password";');
  }
}
