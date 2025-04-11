import React, { useEffect, useState } from "react";

const LatestBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogsWithImages = async () => {
      try {
        const res = await fetch(
          "https://wordpress-1429909-5338534.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=5&_embed"
        );
        const posts = await res.json();

        console.log("Fetched Posts:", posts);

        const blogsWithImages = posts.map((post) => {
          let imageUrl = "";

          // Check if _embedded and featured media exist
          if (
            post._embedded &&
            post._embedded["wp:featuredmedia"] &&
            post._embedded["wp:featuredmedia"][0] &&
            post._embedded["wp:featuredmedia"][0].source_url
          ) {
            imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
          }

          return {
            id: post.id,
            title: post.title.rendered,
            image: imageUrl,
            link: post.link,
          };
        });

        setBlogs(blogsWithImages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogsWithImages();
  }, []);

  return (
    <div className="latestblog-wrapper latestBlog_Card ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Latest Blog</h2>
          <button
            className="featuresection_btn featuresection_btn1 mt-4"
            onClick={() =>
              window.open(
                "https://wordpress-1429909-5338534.cloudwaysapps.com/",
                "_blank"
              )
            }
          >
            Explore Blogs
          </button>
        </div>

        <div className="row latest_blog_inner">
          {/* Left Side - First Blog */}
          {blogs[0] && (
            <div className="col-md-6 latest_blog_box">
              <a
                href={blogs[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <div className="image_box1 rounded-3 ">
                  {blogs[0].image && (
                    <img
                      height={480}
                      src={blogs[0].image}
                      alt={blogs[0].title}
                      className="w-100 rounded-top-3 blog_image1"
                    />
                  )}
                  <h6 className="text-center mt-2">{blogs[0].title}</h6>
                </div>
              </a>
            </div>
          )}

          {/* Right Side - 4 Blogs in Two Columns */}
          <div className="col-md-3 latest_blog_box">
            {[blogs[1], blogs[2]].map(
              (blog) =>
                blog && (
                  <a
                    key={blog.id}
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <div className="image_box2 rounded-3 mb-4 overflow-hidden">
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-100 h-100 object-cover"
                        />
                      )}
                      <h6 className="text-center mt-2">{blog.title}</h6>
                    </div>
                  </a>
                )
            )}
          </div>

          <div className="col-md-3 latest_blog_box">
            {[blogs[3], blogs[4]].map(
              (blog) =>
                blog && (
                  <a
                    key={blog.id}
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    <div className="image_box2 rounded-3 mb-4 overflow-hidden">
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-100 h-100 object-cover"
                        />
                      )}
                      <h6 className="text-center mt-2">{blog.title}</h6>
                    </div>
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlog;
