import { Blog } from '../../components/Blog';

export default function Index({ blog }) {
  return (
    <main>
      <Blog blog={blog} />
    </main>
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };
  const data = await fetch('https://sample-next-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/blog/${content.id}`);
  return {
    paths,
  fallback: false,
  };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };
  const data = await fetch(
    `https://sample-next-blog.microcms.io/api/v1/blog/${id}`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data,
    },
  };
};