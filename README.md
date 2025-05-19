# git-describe-ai

AI를 이용해 `git diff` 기반 커밋 메세지를 자동으로 생성해주는 CLI 도구입니다.  
Conventional Commits 형식의 커밋 메세지를 영어 또는 한국어로 생성할 수 있으며,  
필요시 간단한 설명도 함께 포함됩니다.

---

## 기능

- Git 변경사항 기반 커밋 메세지 자동 생성
- 영어 / 한국어 옵션 지원 (`--lang en` or `--lang ko`)
- description 항목 추가 (`--des`)
- 커밋 메세지와 description의 근거인 변경된 diff 내용 확인 (`--diff`)
- Ollama 기반 LLM 사용 (로컬에서 작동)

---

## 설치

```bash
npm install -g git-describe-ai
```

---

## 사용법

**1. 커밋할 파일을 stage 하기**

```bash
git add .
```

**2. 커밋 메세지 생성**

```bash
git-describe-ai --lang ko
git-describe-ai --lang en
git-describe-ai --lang en --des
git-describe-ai --lang en --des --diff
```

| 옵션      | 설명                                               |
|-----------|----------------------------------------------------|
| `--lang`  | 출력 언어 설정 (`en`, `ko`)                        |
| `--des`   | 변경 요약 설명 포함 (2~4줄)                         |
| `--diff`  | 어떤 변경사항을 기준으로 생성했는지 함께 출력함     |

---

## 예시 출력(git-describe-ai --lang ko --des --diff)

```bash
✨ Suggested commit message:
feat: 필터링 기능 개선
- 다중 선택 지원
- 백엔드에 파라미터 전송 방식 변경

📄 Based on git diff:

diff --git a/src/filter.ts b/src/filter.ts
index 123abc4..567def8 100644
--- a/src/filter.ts
+++ b/src/filter.ts
@@ -10,6 +10,12 @@
+  const selected = options.split(',');
+  queryParams.set('filter', selected.join(','));
```

---

## Ollama 설치 및 실행 안내(macOS 기준)

**1. 설치**
```bash
brew install ollama
```

**2. 모델 선택 및 실행 (예: mistral)**
```
ollama run mistral
```
> 처음 실행 시 모델이 다운로드됩니다.

**3. 서버 실행**
```
ollama serve
```
> 또는 ollama run mistral로도 자동 실행됩니다.

---

## .env 루트 디렉토리에 설정

```
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "mistral"
```
> `.env` 없이도 기본값(`mistral`, `localhost`)으로 동작하지만,  
> 환경에 따라 모델 이름이나 서버 주소를 설정할 수 있습니다.

---
## 🧾 라이선스

MIT © 2025 [moon0727]

