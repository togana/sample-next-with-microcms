import { useRouter } from 'next/router';
import NotFoundPage from '..//404';

export default function BlogBody({ preview, blog }) {
  const router = useRouter();

  // 読込中
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // 存在しない場合
  if (!blog?.id) return <NotFoundPage />;

  return (
    <main>
      { preview ? <h1>プレビュー</h1> : <></>}
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <p>{blog.category && `${blog.category.name}`}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = async context => {
  const id = context.params.id;
  const draftKey = context.previewData?.draftKey;
  const draftKeyParams = draftKey !== undefined ? `?draftKey=${draftKey}` : '';
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };
  const data = await fetch(
    `https://sample-next-blog.microcms.io/api/v1/blog/${id}${draftKeyParams}`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      preview: !!context?.preview,
      blog: data,
    },
    revalidate: 1
  };
};