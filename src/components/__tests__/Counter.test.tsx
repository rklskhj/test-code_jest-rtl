import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "@/components/Counter";

describe("Counter 컴포넌트", () => {
  it("초기 렌더링 시 카운트가 0이어야 함", () => {
    render(<Counter />);
    expect(screen.getByText("현재 카운트: 0")).toBeInTheDocument();
  });

  it("버튼 클릭 시 카운트가 증가해야 함", () => {
    render(<Counter />);

    const button = screen.getByText("증가");
    fireEvent.click(button);

    expect(screen.getByText("현재 카운트: 1")).toBeInTheDocument();
  });

  it("버튼을 여러 번 클릭하면 카운트가 계속 증가해야 함", () => {
    render(<Counter />);

    const button = screen.getByText("증가");

    fireEvent.click(button);
    expect(screen.getByText("현재 카운트: 1")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("현재 카운트: 2")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("현재 카운트: 3")).toBeInTheDocument();
  });
});
