import { Migration } from '@mikro-orm/migrations';

export class Migration20220210054445 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "password" text not null;');
  }

}
