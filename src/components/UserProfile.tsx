import { useState, useEffect } from "react";
import { fetchUserInfo, UserInfo } from "../api/auth";

interface UserProfileProps {
  token?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ token }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setUserInfo(null);
      setError(null);
      return;
    }

    const loadUserInfo = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchUserInfo(token);

        if (response.success) {
          if (response.data) {
            setUserInfo(response.data);
          } else {
            setUserInfo(null);
            setError(null);
          }
        } else {
          setError(response.message || "사용자 정보를 가져올 수 없습니다.");
        }
      } catch {
        setError("네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [token]);

  if (!token) {
    return <div data-testid="no-token">로그인이 필요합니다.</div>;
  }

  if (loading) {
    return <div data-testid="loading">사용자 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div data-testid="error">오류: {error}</div>;
  }

  if (!userInfo) {
    return <div data-testid="no-user">사용자 정보가 없습니다.</div>;
  }

  return (
    <div data-testid="user-profile">
      <h2>사용자 프로필</h2>
      <div>
        <p>
          <strong>ID:</strong> <span data-testid="user-id">{userInfo.id}</span>
        </p>
        <p>
          <strong>사용자명:</strong>{" "}
          <span data-testid="username">{userInfo.username}</span>
        </p>
        <p>
          <strong>이메일:</strong>{" "}
          <span data-testid="email">{userInfo.email}</span>
        </p>
        <p>
          <strong>이름:</strong> <span data-testid="name">{userInfo.name}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
