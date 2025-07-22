import { render, screen, waitFor, act } from "@testing-library/react";
import UserProfile from "../UserProfile";
import { fetchUserInfo } from "../../api/auth";

// fetchUserInfo 함수를 모킹
jest.mock("../../api/auth");
const mockFetchUserInfo = fetchUserInfo as jest.MockedFunction<
  typeof fetchUserInfo
>;

// 목 사용자 데이터
const mockUserData = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  name: "테스트 사용자",
};

describe("UserProfile 컴포넌트", () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 모킹 함수 초기화
    jest.clearAllMocks();
  });

  test("토큰이 없을 때 로그인 필요 메시지를 보여줘야 함", () => {
    render(<UserProfile />);
    expect(screen.getByTestId("no-token")).toHaveTextContent(
      "로그인이 필요합니다."
    );
  });

  test("토큰이 있을 때 로딩 상태를 보여줘야 함", async () => {
    // API 호출이 지연되도록 설정
    mockFetchUserInfo.mockImplementation(() => new Promise(() => {}));

    render(<UserProfile token="valid-token" />);

    expect(screen.getByTestId("loading")).toHaveTextContent(
      "사용자 정보를 불러오는 중..."
    );
  });

  test("API 호출 성공 시 사용자 정보를 보여줘야 함", async () => {
    // 성공적인 API 응답 모킹
    mockFetchUserInfo.mockResolvedValue({
      success: true,
      data: mockUserData,
    });

    await act(async () => {
      render(<UserProfile token="valid-token" />);
    });

    // 로딩 완료 후 사용자 정보가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByTestId("user-profile")).toBeInTheDocument();
    });

    expect(screen.getByTestId("user-id")).toHaveTextContent("1");
    expect(screen.getByTestId("username")).toHaveTextContent("testuser");
    expect(screen.getByTestId("email")).toHaveTextContent("test@example.com");
    expect(screen.getByTestId("name")).toHaveTextContent("테스트 사용자");
  });

  test("API 호출 실패 시 에러 메시지를 보여줘야 함", async () => {
    // 실패한 API 응답 모킹
    mockFetchUserInfo.mockResolvedValue({
      success: false,
      message: "인증 토큰이 만료되었습니다.",
    });

    render(<UserProfile token="invalid-token" />);

    // 에러 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "오류: 인증 토큰이 만료되었습니다."
      );
    });
  });

  test("네트워크 오류 시 네트워크 오류 메시지를 보여줘야 함", async () => {
    // 네트워크 오류 모킹
    mockFetchUserInfo.mockRejectedValue(new Error("Network Error"));

    render(<UserProfile token="valid-token" />);

    // 네트워크 오류 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "오류: 네트워크 오류가 발생했습니다."
      );
    });
  });

  test("API 호출 시 올바른 토큰으로 함수가 호출되어야 함", async () => {
    mockFetchUserInfo.mockResolvedValue({
      success: true,
      data: mockUserData,
    });

    const testToken = "test-token-123";
    render(<UserProfile token={testToken} />);

    // fetchUserInfo가 올바른 토큰으로 호출되었는지 확인
    expect(mockFetchUserInfo).toHaveBeenCalledWith(testToken);
    expect(mockFetchUserInfo).toHaveBeenCalledTimes(1);
  });

  test("토큰이 변경될 때 새로운 API 호출이 발생해야 함", async () => {
    mockFetchUserInfo.mockResolvedValue({
      success: true,
      data: mockUserData,
    });

    const { rerender } = render(<UserProfile token="token1" />);

    expect(mockFetchUserInfo).toHaveBeenCalledWith("token1");

    // 토큰 변경
    rerender(<UserProfile token="token2" />);

    expect(mockFetchUserInfo).toHaveBeenCalledWith("token2");
    expect(mockFetchUserInfo).toHaveBeenCalledTimes(2);
  });

  test("API 응답에 데이터가 없을 때 사용자 정보 없음 메시지를 보여줘야 함", async () => {
    // 데이터가 없는 성공 응답 모킹
    mockFetchUserInfo.mockResolvedValue({
      success: true,
    });

    render(<UserProfile token="valid-token" />);

    await waitFor(() => {
      expect(screen.getByTestId("no-user")).toHaveTextContent(
        "사용자 정보가 없습니다."
      );
    });
  });
});
