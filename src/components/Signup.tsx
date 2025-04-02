"use client";

import ConditionalMessage from "./ConditionalMessage";
import { useState } from "react";

export default function Signup() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div>
      <ConditionalMessage isLoggedIn={isLoggedIn} username={username} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
      <div>
        <input
          type="text"
          value={username}
          placeholder="유저네임을 입력해주세요."
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
}
