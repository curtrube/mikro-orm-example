import { Migration } from '@mikro-orm/migrations';

export class Migration20241125220036 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`user\` add column \`social\` json null;`);
  }

}
