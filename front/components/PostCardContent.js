import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

/**
 * 해시태그
 * 해시태그 추출
 * #첫번째태그 #두번째태그
 */

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (postData.match(/(#[^\s#]+)/)) {
          // 해쉬태그인 경우
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent;
