// src/components/Counter.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("버튼 클릭 시 카운트가 증가해야 함", () => {
  render(<Counter />);

  const button = screen.getByText("증가");
  fireEvent.click(button);

  expect(screen.getByText("현재 카운트: 1")).toBeInTheDocument();
});
