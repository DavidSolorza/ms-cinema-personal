import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCinemaSchema1793280396192 implements MigrationInterface {
    name = 'InitCinemaSchema1793280396192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projectors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(120) NOT NULL, \`high\` int NOT NULL, \`width\` int NOT NULL, \`theater_id\` int NULL, UNIQUE INDEX \`REL_39723a507706f581bc5928ff8f\` (\`theater_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`seats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(20) NOT NULL, \`reclining\` tinyint NOT NULL, \`theater_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`screenings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`scheduled_at\` datetime NOT NULL, \`theater_id\` int NOT NULL, \`movie_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(180) NOT NULL, \`duration\` int NOT NULL, \`date\` date NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projectors\` ADD CONSTRAINT \`FK_39723a507706f581bc5928ff8f3\` FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`seats\` ADD CONSTRAINT \`FK_0e2547501640e2c3c68c2036277\` FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`screenings\` ADD CONSTRAINT \`FK_c2ba7ed0da823f76b931b3f92c6\` FOREIGN KEY (\`theater_id\`) REFERENCES \`theaters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`screenings\` ADD CONSTRAINT \`FK_540b3ebcebc8d837436ad0989bc\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`screenings\` DROP FOREIGN KEY \`FK_540b3ebcebc8d837436ad0989bc\``);
        await queryRunner.query(`ALTER TABLE \`screenings\` DROP FOREIGN KEY \`FK_c2ba7ed0da823f76b931b3f92c6\``);
        await queryRunner.query(`ALTER TABLE \`seats\` DROP FOREIGN KEY \`FK_0e2547501640e2c3c68c2036277\``);
        await queryRunner.query(`ALTER TABLE \`projectors\` DROP FOREIGN KEY \`FK_39723a507706f581bc5928ff8f3\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
        await queryRunner.query(`DROP TABLE \`screenings\``);
        await queryRunner.query(`DROP TABLE \`seats\``);
        await queryRunner.query(`DROP INDEX \`REL_39723a507706f581bc5928ff8f\` ON \`projectors\``);
        await queryRunner.query(`DROP TABLE \`projectors\``);
    }

}
