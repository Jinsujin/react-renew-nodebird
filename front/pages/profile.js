import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NickNameEditForm";

const Profile = () => {
  const followerList = [
    { nickname: "진수" },
    { nickname: "너구리" },
    { nickname: "초코" }
  ];
  const followingList = [
    { nickname: "진수" },
    { nickname: "너구리" },
    { nickname: "초코" }
  ];

  return (
    <>
      <Head>
        <title>프로필 | CloneTwitter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
