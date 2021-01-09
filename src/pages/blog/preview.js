import { useRouter } from 'next/router';
import { Blog } from '../../components/Blog';
import NotFoundPage from '../404';

export default function BlogPreview({ blog }) {
  const router = useRouter();

  // 読込中
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // 存在しない場合
  if (!blog?.id) return <NotFoundPage />;

  return (
    <>
      <h1>プレビュー</h1>
      <main>
        <Blog blog={blog} />
      </main>
    </>
  );
}

export const getStaticProps = async context => {
  const id = context.previewData?.id;
  const draftKey = context.previewData?.draftKey;
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };
  const data = await fetch(
    `https://sample-next-blog.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
    revalidate: 1
  };
};