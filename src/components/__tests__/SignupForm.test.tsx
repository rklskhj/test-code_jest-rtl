import { render, screen, fireEvent } from "@testing-library/react";
import SignupForm from "../SignupForm";

global.window.alert = jest.fn();

describe("SignupForm", () => {
  test("이메일이 유효하지 않을 때 에러 메시지를 보여줘야 함", () => {
    render(<SignupForm />);

    const emailInput = screen.getByLabelText("이메일 입력");
    const submitButton = screen.getByText("가입하기");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("유효한 이메일을 입력해주세요.");
  });

  test("비밀번호가 너무 짧을 때 에러 메시지를 보여줘야 함", () => {
    render(<SignupForm />);

    const emailInput = screen.getByLabelText("이메일 입력");
    const passwordInput = screen.getByLabelText("비밀번호 입력");
    const submitButton = screen.getByText("가입하기");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent("비밀번호는 6자 이상이어야 합니다.");
  });

  test("유효한 이메일과 비밀번호를 입력했을 때 에러 메시지가 없어야 함", () => {
    render(<SignupForm />);

    const emailInput = screen.getByLabelText("이메일 입력");
    const passwordInput = screen.getByLabelText("비밀번호 입력");
    const submitButton = screen.getByText("가입하기");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
