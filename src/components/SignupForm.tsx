import { useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("유효한 이메일을 입력해주세요.");
      window.alert(error);
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      window.alert(error);
      return;
    }

    // 성공 로직...

    window.alert("가입 성공");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          aria-label="이메일 입력"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          aria-label="비밀번호 입력"
        />
      </div>
      {error && (
        <div role="alert" aria-live="polite">
          {error}
        </div>
      )}
      <button type="submit">가입하기</button>
    </form>
  );
}
