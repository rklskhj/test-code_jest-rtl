import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../Signup";

describe("Signup 컴포넌트", () => {
  it("초기 렌더링 시 로그인 버튼과 입력창이 표시되어야 함", () => {
    render(<Signup />);

    // 로그인 버튼 확인
    expect(screen.getByText("로그인")).toBeInTheDocument();

    // 입력창 확인
    expect(
      screen.getByPlaceholderText("유저네임을 입력해주세요.")
    ).toBeInTheDocument();
  });

  it("로그인 버튼 클릭 시 로그아웃 버튼으로 변경되어야 함", () => {
    render(<Signup />);

    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    expect(screen.getByText("로그아웃")).toBeInTheDocument();
  });

  it("사용자 이름 입력 시 상태가 업데이트되어야 함", () => {
    render(<Signup />);

    const input = screen.getByPlaceholderText("유저네임을 입력해주세요.");
    fireEvent.change(input, { target: { value: "testuser" } });

    expect(input).toHaveValue("testuser");
  });

  it("로그인 상태와 사용자 이름이 ConditionalMessage 컴포넌트에 전달되어야 함", () => {
    render(<Signup />);

    // 사용자 이름 입력
    const input = screen.getByPlaceholderText("유저네임을 입력해주세요.");
    fireEvent.change(input, { target: { value: "testuser" } });

    // 로그인 버튼 클릭
    const loginButton = screen.getByText("로그인");
    fireEvent.click(loginButton);

    // ConditionalMessage 컴포넌트에 전달된 props 확인
    // ConditionalMessage 컴포넌트의 구현에 따라 적절한 assertion 추가
    expect(screen.getByText("환영합니다, testuser님!")).toBeInTheDocument();
  });
});
