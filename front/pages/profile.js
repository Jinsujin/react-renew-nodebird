import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import Head from "next/head";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NickNameEditForm";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  const { me } = useSelector(state => state.user);

  // 로그아웃 했을때
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  // 사용자 데이터가 없음때 === 로그인 안했을때
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
