import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NickNameEditForm";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector(state => state.user);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>프로필 | CloneTwitter</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me.Followings} />
        <FollowList header="팔로워 목록" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
