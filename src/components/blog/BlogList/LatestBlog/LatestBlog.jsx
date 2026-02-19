import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LatestBlog = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogsWithImages = async () => {
      try {
        // Get current language
        const currentLang = i18n.language || 'en';
        const langParam = currentLang === 'ar' ? 'ar' : 'en';

        // Fetch posts with language parameter
        const res = await fetch(
          `https://blog.mazhool.net/wp-json/wp/v2/posts?_embed&lang=${langParam}`
        );
        const posts = await res.json();

        console.log("Fetched Posts:__________", posts);

        const blogsWithImages = posts.map((post) => {
          let imageUrl = "";

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
  }, [i18n.language]); // Re-fetch when language changes

  // useEffect(() => {
  //   const fetchBlogsWithImages = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://ksa4sale.net/blogs/"
  //       );
  //       const posts = await res.json();

  //       console.log("Fetched Posts:", posts);

  //       const blogsWithImages = posts.map((post) => {
  //         let imageUrl = "";

  //         // Check if _embedded and featured media exist
  //         if (
  //           post._embedded &&
  //           post._embedded["wp:featuredmedia"] &&
  //           post._embedded["wp:featuredmedia"][0] &&
  //           post._embedded["wp:featuredmedia"][0].source_url
  //         ) {
  //           imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
  //         }

  //         return {
  //           id: post.id,
  //           title: post.title.rendered,
  //           image: imageUrl,
  //           link: post.link,
  //         };
  //       });

  //       setBlogs(blogsWithImages);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };

  //   fetchBlogsWithImages();
  // }, []);

  return (
    <div className="latestblog-wrapper latestBlog_Card ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2
            style={{
              fontSize: "22px",
              marginBottom: "0px",
            }}
          >
            {t("home.latestBlog")}
          </h2>
          <button
            className="blue_btn"
            onClick={() => window.open("https://blog.mazhool.net/", "_blank")}
          >
            {t("home.exploreBlogs")}
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
