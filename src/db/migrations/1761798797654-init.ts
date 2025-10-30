import type { MigrationInterface, QueryRunner } from "typeorm";

export class Init1761798797654 implements MigrationInterface {
    name = 'Init1761798797654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`qty\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
