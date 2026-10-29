import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCinemaSchema1793131308598 implements MigrationInterface {
    name = 'InitCinemaSchema1793131308598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`theaters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(120) NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`theaters\``);
    }

}
