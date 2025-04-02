import { render, screen } from "@testing-library/react";
import ConditionalMessage from "../ConditionalMessage";

describe("ConditionalMessage", () => {
  test("비로그인 상태일 때 로그인 메시지를 보여줘야 함", () => {
    render(<ConditionalMessage isLoggedIn={false} />);
    expect(screen.getByText("로그인이 필요합니다.")).toBeInTheDocument();
  });

  test("로그인 상태지만 유저네임이 없을 때 에러 메시지를 보여줘야 함", () => {
    render(<ConditionalMessage isLoggedIn={true} />);
    expect(screen.getByText("사용자 이름이 없습니다.")).toBeInTheDocument();
  });

  test("로그인 상태이고 유저네임이 있을 때 환영 메시지를 보여줘야 함", () => {
    render(<ConditionalMessage isLoggedIn={true} username="김철수" />);
    expect(screen.getByText("환영합니다, 김철수님!")).toBeInTheDocument();
  });
});
