import Prismic from '@prismicio/client';

export function getPrismicClient(req) {
  const prismic = Prismic.client(
      process.env.PRISMIC_ENDPOINT,
      {
          req
      }
  )

  return prismic;
}