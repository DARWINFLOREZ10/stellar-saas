import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
    const adminEmail = 'admin@example.com';
    const adminPass = await bcrypt.hash('Admin123!', 10);
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: { email: adminEmail, password: adminPass, name: 'Admin', role: 'ADMIN' },
    });
    const org = await prisma.organization.create({ data: { name: 'Demo Org' } });
    await prisma.membership.create({ data: { userId: admin.id, organizationId: org.id, role: 'ADMIN' } });
    console.log('Seed complete');
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
