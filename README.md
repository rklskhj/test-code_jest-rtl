# 🌏 React 컴포넌트 테스트 학습 프로젝트

Jest와 React Testing Library를 사용하여 React 컴포넌트 테스트를 학습하고 경험하는 프로젝트입니다.

## 🎯 프로젝트 목표

- Jest와 React Testing Library의 기본 개념과 사용법 학습
- 다양한 React 컴포넌트에 대한 테스트 코드 작성 경험
- 테스트 자동화 및 CI/CD 파이프라인 구축 경험

## 🛠️ Tech Stack

| Area         | Tech Stack                                                                                                                                                                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white) |
| **Testing**  | ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![React Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=react&logoColor=white)                                                                                                  |

## 📦 Project Structure

```
📦 src
├── 📂 components          # React 컴포넌트
│   ├── 📂 __tests__      # 컴포넌트 테스트 파일
│   ├── Counter.tsx        # 카운터 컴포넌트
│   ├── TodoList.tsx       # 할 일 목록 컴포넌트
│   ├── SignupForm.tsx     # 회원가입 폼 컴포넌트
│   ├── Signup.tsx         # 회원가입 페이지 컴포넌트
│   └── ConditionalMessage.tsx # 조건부 메시지 컴포넌트
└── 📂 app                 # Next.js 앱 라우터
```

## 🚀 Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 테스트 감시 모드로 실행 (파일 변경 시 자동 재실행)
npm run test:watch

# 테스트 커버리지 리포트 생성
npm run test:coverage
```

## 🧪 테스트

이 프로젝트는 Jest와 React Testing Library를 사용하여 테스트를 수행합니다.

### 테스트 구조

프로젝트에는 다음과 같은 테스트들이 포함되어 있습니다:

1. **Counter 컴포넌트 테스트**

   - 초기 렌더링 시 카운트가 0인지 확인
   - 버튼 클릭 시 카운트가 증가하는지 확인
   - 버튼을 여러 번 클릭하면 카운트가 계속 증가하는지 확인

2. **TodoList 컴포넌트 테스트**

   - 로딩 상태를 보여주는지 확인
   - 할 일 목록을 성공적으로 불러오는지 확인
   - 에러가 발생했을 때 에러 메시지를 보여주는지 확인

3. **SignupForm 컴포넌트 테스트**

   - 이메일이 유효하지 않을 때 에러 메시지를 보여주는지 확인
   - 비밀번호가 너무 짧을 때 에러 메시지를 보여주는지 확인
   - 유효한 이메일과 비밀번호를 입력했을 때 에러 메시지가 없는지 확인

4. **Signup 컴포넌트 테스트**

   - 회원가입 폼이 렌더링되는지 확인
   - 회원가입 성공 시 알림 메시지를 보여주는지 확인

5. **ConditionalMessage 컴포넌트 테스트**
   - 조건에 따라 다른 메시지를 보여주는지 확인

### CI/CD 테스트 자동화

GitHub Actions를 통해 자동 테스트를 설정하는 방법:

1. `.github/workflows/test.yml` 파일 생성:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage reports
        uses: codecov/codecov-action@v2
```

2. GitHub 저장소 설정:

   - Settings > Secrets and variables > Actions에서 필요한 시크릿 설정
   - Codecov 연동을 위한 토큰 설정 (선택사항)

3. main 브랜치에 푸시하거나 PR을 생성하면 자동으로 테스트가 실행됩니다.

## 📚 학습 내용

- Jest와 React Testing Library의 기본 개념과 사용법
- 컴포넌트 렌더링 및 사용자 이벤트 테스트 방법
- 비동기 작업 및 API 호출 테스트 방법
- 모킹(Mocking)을 활용한 외부 의존성 테스트 방법
- GitHub Actions를 활용한 CI/CD 파이프라인 구축 방법
