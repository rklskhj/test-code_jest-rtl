interface Props {
  isLoggedIn: boolean;
  username?: string;
}

export default function ConditionalMessage({ isLoggedIn, username }: Props) {
  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!username) {
    return <div>사용자 이름이 없습니다.</div>;
  }

  return <div>환영합니다, {username}님!</div>;
}
