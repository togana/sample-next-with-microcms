export const Blog = (blog) => (
  <>
    <h1>{blog.title}</h1>
    <p>{blog.publishedAt}</p>
    <p>{blog.category && `${blog.category.name}`}</p>
    <div
      dangerouslySetInnerHTML={{
        __html: `${blog.body}`,
      }}
    />
  </>
);
