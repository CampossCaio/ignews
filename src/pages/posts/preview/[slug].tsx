import { GetStaticPaths, GetStaticProps } from "next"
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import { RichText } from "prismic-dom";
import { useRouter } from 'next/router';

import { getPrismicClient } from '../../../services/prismic';

import styles from '../post.module.scss';
import Link from "next/link";
import { useEffect } from "react";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updated_at: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {

  const [session] = useSession();

  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  },[session]);
  

    return(
       <>
       <Head>
         <title>{post.title} | Ignews</title>
       </Head>
        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updated_at}</time>


            {/* dangerouslySetInnerHTML insere html para página */ }
            <div 
              className={`${styles.postContent} ${styles.previewContent}`}
              dangerouslySetInnerHTML={{ __html: post.content}} 
            />

            <div className={styles.continueReading}>
              Wanna continue reading?
              <Link href="/">
                  <a href="">Subscribe now 🤗</a>
              </Link>
            </div>
          </article>
        </main>
       </>
    )
}

// Principais formas de lidar com páginas estáticas com o next 
// 1 - Gerar as páginas estaticas durante a build.
// 2 - Gerar a página estática no primeiro acesso.
// 3 - Metade de cada uma.

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        /**
         *  Array com os slugs das páginas que eu quero que seja geradas estáticamente, 
         *  os contéudos que não estiverem nesse array serão gerados estaticamente no momento
         *  em que forem acessados pala primeira vez
         */
        paths: [], 
        fallback: 'blocking',// Caso o usuário acesse um conteúdo que ainda não seja estático, ele será requisitado via servidor
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('pos', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updated_at: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day:  '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }
  
  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutos
  }

}


