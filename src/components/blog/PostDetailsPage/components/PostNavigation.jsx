import React from "react";
import { Link } from "react-router-dom";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";

const PostNavigation = ({ postId, posts }) => {
  const { t } = useTranslation("postdetails");
  const currentIndex = posts.findIndex((p) => p._id === postId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < posts.length - 1;
  const currentLanguage = i18n.language;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-12 border-t border-b border-gray-200 py-4 sm:py-6 gap-4 sm:gap-0">
      {/* Previous Post - Mobile first */}
      {hasPrevious && (
        <Link
          to={`/blog/${posts[currentIndex - 1]._id}`}
          className="flex items-center gap-3 text-gray-700 w-full sm:w-auto"
        >
          <div className="hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 bg-gray-200 rounded-full p-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <img
            src={posts[currentIndex - 1].image || "/default-post.jpg"}
            alt="Previous Post"
            className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md border"
          />
          <div className="flex-1 sm:flex-none">
            <p className="font-medium line-clamp-1 sm:max-w-[150px] text-sm sm:text-base">
              {posts[currentIndex - 1].title?.[currentLanguage] ||
                posts[currentIndex - 1].title?.ar ||
                t("previous_post")}
            </p>
            <span className="text-xs text-gray-500 hidden sm:block">
              {t("previous")}
            </span>
          </div>
          <div className="sm:hidden text-xs text-gray-500">
            {t("previous")}
          </div>
        </Link>
      )}

      {/* Next Post - Mobile first */}
      {hasNext && (
        <Link
          to={`/blog/${posts[currentIndex + 1]._id}`}
          className="flex items-center gap-3 text-gray-700 w-full sm:w-auto justify-end sm:justify-start"
        >
          <div className="sm:hidden text-xs text-gray-500">
            {t("next")}
          </div>
          <div className="flex-1 sm:flex-none text-right sm:text-left">
            <p className="font-medium line-clamp-1 sm:max-w-[150px] text-sm sm:text-base">
              {posts[currentIndex + 1].title?.[currentLanguage] ||
                posts[currentIndex + 1].title?.ar ||
                t("next_post")}
            </p>
            <span className="text-xs text-gray-500 hidden sm:block">
              {t("next")}
            </span>
          </div>
          <img
            src={posts[currentIndex + 1].image || "/default-post.jpg"}
            alt="Next Post"
            className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-md border"
          />
          <div className="hidden sm:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 bg-gray-200 rounded-full p-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PostNavigation;