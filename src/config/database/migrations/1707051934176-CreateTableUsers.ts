import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableUsers1707051934176 implements MigrationInterface {
  public tablename = 'users';

  public users = new Table({
    name: this.tablename,
    columns: [
      {
        name: 'id',
        type: 'int',
        isGenerated: true,
        isPrimary: true,
      },
      {
        name: 'nickname',
        type: 'varchar',
      },
    ],
  });

  public nicknameIndex = new TableIndex({
    name: 'IDX_NICKNAME',
    columnNames: ['nickname'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.users);
    await queryRunner.createIndex(this.tablename, this.nicknameIndex);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.tablename, this.nicknameIndex);
    await queryRunner.dropTable(this.users);
  }
}
