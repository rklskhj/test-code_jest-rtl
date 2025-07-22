// 사용자 정보 타입 정의
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  name: string;
}

// API 응답 타입 정의
export interface LoginResponse {
  success: boolean;
  data?: UserInfo;
  message?: string;
}

/**
 * 로그인 후 회원 정보를 가져오는 API 함수
 * @param token - 인증 토큰
 * @returns Promise<LoginResponse>
 */
export const fetchUserInfo = async (token: string): Promise<LoginResponse> => {
  try {
    const response = await fetch("/api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.user,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * 로그인 API 함수
 * @param username - 사용자명
 * @param password - 비밀번호
 * @returns Promise<LoginResponse & { token?: string }>
 */
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse & { token?: string }> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: data.user,
      token: data.token,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "로그인에 실패했습니다.";

    return {
      success: false,
      message: errorMessage,
    };
  }
};
