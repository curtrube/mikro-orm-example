import { FastifyInstance } from 'fastify';
import { initORM } from '../../db.js';

export async function registerArticleRoutes(app: FastifyInstance) {
  const db = await initORM();

  app.get('/', async (request) => {
    const { limit, offset } = request.query as { limit?: number; offset?: number };
    const [items, total] = await db.article.findAndCount(
      {},
      {
        limit,
        offset,
      }
    );

    return { items, total };
  });
}
