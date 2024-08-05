import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { AggregateRoot, PaginatedQueryParams, Paginated } from '@libs/ddd';
import { Mapper } from '@libs/ddd';
import { RepositoryPort } from '@libs/ddd';
import { ConflictException } from '@libs/exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerPort } from '../ports/logger.port';
import { ObjectLiteral } from '../types';
import { PrismaService } from '@src/infrastructure/persistence/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  protected abstract tableName: string;

  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
    protected readonly logger: LoggerPort,
  ) {}

  findAll(): Promise<Aggregate[]> {
    throw new Error('Method not implemented.');
  }
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Aggregate>> {
    throw new Error('Method not implemented.');
  }
  delete(entity: Aggregate): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async findOneById(id: string): Promise<Aggregate> | null {
    const result = await this.prisma[this.tableName].findUnique({ where: { id } });
    return result ? this.mapper.toDomain(result) : null;
  }

  // async findAll(): Promise<Aggregate[]> {
  //   const query = sql.type(this.schema)`SELECT * FROM ${sql.identifier([
  //     this.tableName,
  //   ])}`;

  //   const result = await this.pool.query(query);

  //   return result.rows.map(this.mapper.toDomain);
  // }

  // async findAllPaginated(
  //   params: PaginatedQueryParams,
  // ): Promise<Paginated<Aggregate>> {
  //   const query = sql.type(this.schema)`
  //   SELECT * FROM ${sql.identifier([this.tableName])}
  //   LIMIT ${params.limit}
  //   OFFSET ${params.offset}
  //   `;

  //   const result = await this.pool.query(query);

  //   const entities = result.rows.map(this.mapper.toDomain);
  //   return new Paginated({
  //     data: entities,
  //     count: result.rowCount,
  //     limit: params.limit,
  //     page: params.page,
  //   });
  // }

  // async delete(entity: Aggregate): Promise<boolean> {
  //   entity.validate();
  //   const query = sql`DELETE FROM ${sql.identifier([
  //     this.tableName,
  //   ])} WHERE id = ${entity.id}`;

  //   this.logger.debug(
  //     `[${RequestContextService.getRequestId()}] deleting entities ${
  //       entity.id
  //     } from ${this.tableName}`,
  //   );

  //   const result = await this.pool.query(query);

  //   await entity.publishEvents(this.logger, this.eventEmitter);

  //   return result.rowCount > 0;
  // }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];

    const records = entities.map(this.mapper.toPersistence);

    try {
      await this.prisma[this.tableName].createMany({
        data: records,
      })

      this.logger.debug(
        `[${RequestContextService.getRequestId()}] writing ${
          entities.length
        } entities to "${this.tableName}" table: ${entities.map((e) => e.id)}`,
      );

      this.publishEvents(entities);
      
      return;
    } catch (error) {
      if (error.code === 'P2002') {
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] ${
            error
          }`,
        );
        throw new ConflictException('Record already exists', error);
      }
      throw error;
    }
  }

  protected async publishEvents(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];

    await Promise.all(
      entities.map((entity) =>
        entity.publishEvents(this.logger, this.eventEmitter),
      ),
    );
  }

  // /**
  //  * start a global transaction to save
  //  * results of all event handlers in one operation
  //  */
  // public async transaction<T>(handler: () => Promise<T>): Promise<T> {
  //   return this.pool.transaction(async (connection) => {
  //     this.logger.debug(
  //       `[${RequestContextService.getRequestId()}] transaction started`,
  //     );
  //     if (!RequestContextService.getTransactionConnection()) {
  //       RequestContextService.setTransactionConnection(connection);
  //     }

  //     try {
  //       const result = await handler();
  //       this.logger.debug(
  //         `[${RequestContextService.getRequestId()}] transaction committed`,
  //       );
  //       return result;
  //     } catch (e) {
  //       this.logger.debug(
  //         `[${RequestContextService.getRequestId()}] transaction aborted`,
  //       );
  //       throw e;
  //     } finally {
  //       RequestContextService.cleanTransactionConnection();
  //     }
  //   });
  // }

  // /**
  //  * Get database pool.
  //  * If global request transaction is started,
  //  * returns a transaction pool.
  //  */
  // protected get pool(): DatabasePool | DatabaseTransactionConnection {
  //   return (
  //     RequestContextService.getContext().transactionConnection ?? this._pool
  //   );
  // }
}
