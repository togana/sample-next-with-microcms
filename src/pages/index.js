import Link from 'next/link';

export default function Top({ blog }) {
  return (
    <div>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };
  const data = await fetch('https://sample-next-blog.microcms.io/api/v1/blog', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      blog: data.contents,
    },
  };
};
