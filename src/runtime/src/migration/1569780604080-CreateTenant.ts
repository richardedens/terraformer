import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";
import { Tenant } from "../entity/Tenant";

export class CreateTenant1569780604080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(1, {
                select: ["id", "username", "role"] // We dont want to send the password on response
            });
            const tenant = new Tenant();
            tenant.name = "Dummy Company";
            tenant.address = "Fakelane 1A";
            tenant.country = "Never never land";
            tenant.zipcode = "0000DN";
            tenant.user = user;
            const tenantRepository = getRepository(Tenant);
            await tenantRepository.save(tenant);
        } catch (error) {
            console.error(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
