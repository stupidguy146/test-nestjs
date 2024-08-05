import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.runMigrations();
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async runMigrations() {
    try {
      const { stdout, stderr } = await execAsync('npx prisma migrate deploy --schema=src/infrastructure/persistence/prisma/schema.prisma');
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    } catch (error) {
      console.error('Error running migrations:', error);
    }
  }
}
