import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasicShowTable1599769451878
  implements MigrationInterface {
  name = 'BasicShowTable1599769451878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "show" ("id" SERIAL NOT NULL, "idx" character varying NOT NULL, "dateOfShow" TIMESTAMP NOT NULL, "performers" character varying NOT NULL, "text" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "show" ADD CONSTRAINT "FK_cb636bafa4984033fe0f002c11c" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "show" DROP CONSTRAINT "FK_cb636bafa4984033fe0f002c11c"`
    );
    await queryRunner.query(`DROP TABLE "show"`);
  }
}
