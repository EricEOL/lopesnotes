import Prismic from '@prismicio/client';
import { getPrismicClient } from "../../services/prismic";

export default async (req, res) => {
  const prismic = await getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at('document.type', 'postblog'),
    { lang: '*' }
  );

  const notesDesc = response.results.sort((a, b) => new Date(b.last_publication_date) - new Date(a.last_publication_date));

  const notes = notesDesc.map(post => {
    return {
      id: post.uid,
      title: post.data.title[0].text,
      image: post.data.image.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  });
  res.status(200).json(notes);
}
