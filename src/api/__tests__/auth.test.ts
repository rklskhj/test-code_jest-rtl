import { fetchUserInfo, login } from "../auth";

// fetch API 전역 모킹
const mockFetch = jest.fn();
global.fetch = mockFetch;

// 목 사용자 데이터
const mockUserData = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  name: "테스트 사용자",
};

describe("auth API 함수들", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchUserInfo", () => {
    test("성공적인 API 호출 시 사용자 정보를 반환해야 함", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ user: mockUserData }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchUserInfo("valid-token");

      // fetch가 올바른 파라미터로 호출되었는지 확인
      expect(mockFetch).toHaveBeenCalledWith("/api/user/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
          "Content-Type": "application/json",
        },
      });

      // 반환 값 확인
      expect(result).toEqual({
        success: true,
        data: mockUserData,
      });
    });

    test("HTTP 오류 상태일 때 에러를 처리해야 함", async () => {
      const mockResponse = {
        ok: false,
        status: 401,
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await fetchUserInfo("invalid-token");

      expect(result).toEqual({
        success: false,
        message: "HTTP error! status: 401",
      });
    });

    test("네트워크 오류 시 에러를 처리해야 함", async () => {
      mockFetch.mockRejectedValue(new Error("Network Error"));

      const result = await fetchUserInfo("valid-token");

      expect(result).toEqual({
        success: false,
        message: "Network Error",
      });
    });

    test("알 수 없는 오류 시 기본 에러 메시지를 반환해야 함", async () => {
      mockFetch.mockRejectedValue("Unexpected error");

      const result = await fetchUserInfo("valid-token");

      expect(result).toEqual({
        success: false,
        message: "알 수 없는 오류가 발생했습니다.",
      });
    });

    test("빈 토큰으로 호출할 때도 API를 호출해야 함", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ user: mockUserData }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await fetchUserInfo("");

      expect(mockFetch).toHaveBeenCalledWith("/api/user/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer ",
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("login", () => {
    test("성공적인 로그인 시 사용자 정보와 토큰을 반환해야 함", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          user: mockUserData,
          token: "auth-token-123",
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await login("testuser", "password123");

      // fetch가 올바른 파라미터로 호출되었는지 확인
      expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "testuser",
          password: "password123",
        }),
      });

      // 반환 값 확인
      expect(result).toEqual({
        success: true,
        data: mockUserData,
        token: "auth-token-123",
      });
    });

    test("로그인 실패 시 적절한 에러 메시지를 반환해야 함", async () => {
      const mockResponse = {
        ok: false,
        status: 401,
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await login("wronguser", "wrongpassword");

      expect(result).toEqual({
        success: false,
        message: "HTTP error! status: 401",
      });
    });

    test("네트워크 오류 시 기본 로그인 실패 메시지를 반환해야 함", async () => {
      mockFetch.mockRejectedValue(new Error("Network Error"));

      const result = await login("testuser", "password123");

      expect(result).toEqual({
        success: false,
        message: "Network Error",
      });
    });

    test("알 수 없는 오류 시 기본 로그인 실패 메시지를 반환해야 함", async () => {
      mockFetch.mockRejectedValue("Unexpected error");

      const result = await login("testuser", "password123");

      expect(result).toEqual({
        success: false,
        message: "로그인에 실패했습니다.",
      });
    });

    test("빈 사용자명과 비밀번호로도 API를 호출해야 함", async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          user: mockUserData,
          token: "token",
        }),
      };
      mockFetch.mockResolvedValue(mockResponse);

      await login("", "");

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "",
          password: "",
        }),
      });
    });
  });
});
