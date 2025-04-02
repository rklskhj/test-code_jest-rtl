import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "../TodoList";

// API 모킹
global.fetch = jest.fn();

describe("TodoList", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("로딩 상태를 보여줘야 함", () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {})
    );
    render(<TodoList />);
    expect(screen.getByText("로딩 중...")).toBeInTheDocument();
  });

  test("할 일 목록을 성공적으로 불러와야 함", async () => {
    const mockTodos = [
      { id: 1, title: "장보기", completed: false },
      { id: 2, title: "운동하기", completed: true },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText("장보기")).toBeInTheDocument();
      expect(screen.getByText("운동하기")).toBeInTheDocument();
    });
  });

  test("에러가 발생했을 때 에러 메시지를 보여줘야 함", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<TodoList />);

    await waitFor(() => {
      expect(
        screen.getByText("할 일 목록을 불러오는데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });
});
