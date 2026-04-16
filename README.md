# 🚀 Vibecoding - 협업 플랫폼

Vibecoding은 채널 기반의 커뮤니케이션과 애자일 프로젝트 관리(Kanban)를 하나로 결합한 Slack 스타일의 현대적인 협업 플랫폼입니다.

## ✨ 주요 기능

*   **📱 Slack 스타일 인터페이스**: 왼쪽 사이드바를 통해 여러 채널(`#general`, `#development`, `#design` 등)을 직관적으로 탐색할 수 있습니다.
*   **💬 채널 기반 채팅**: 각 채널의 메인 화면에서 실시간 채팅을 통해 팀원들과 소통하며, 대화의 맥락을 채널별로 관리합니다.
*   **📋 통합 칸반 보드**: 채널 상단의 "Board" 탭을 클릭하여 해당 채널의 업무 현황을 확인하고 관리할 수 있습니다.
*   **🖱️ 드래그 앤 드롭 작업 관리**: HTML5 기본 API를 활용하여 칸반 카드를 Todo, In Progress, Done 컬럼 간에 자유롭게 드래그하여 옮길 수 있습니다.
*   **📝 상호작용 가능한 작업 카드**: 보드의 카드를 클릭하면 상세 모달이 열리며, 누구나 제목과 상세 내용을 수정할 수 있습니다.

## 🛠️ 기술 스택

*   **프론트엔드 프레임워크**: React 18
*   **언어**: TypeScript
*   **빌드 도구**: Vite (빠른 HMR 및 최적화된 빌드 지원)
*   **스타일링**: Vanilla CSS (Grid 및 Flexbox 레이아웃 활용)
*   **상태 관리**: **Command 패턴**과 **Event Bus**를 활용한 견고한 커스텀 아키텍처 및 인메모리 스토어.

## 🏗️ 프로젝트 구조

확장성을 고려하여 설계된 아키텍처입니다:
*   **`/src/components`**: UI 컴포넌트 (`Sidebar`, `ChannelView`, `KanbanBoard`, `CardModal` 등)
*   **`/src/core/domain`**: 핵심 데이터 모델 (`Channel`, `Message`, `Card`, `Column`, `Board`)
*   **`/src/core/commands`**: 비즈니스 로직 캡슐화 (`CreateCardCommand`, `UpdateCardCommand`, `SendMessageCommand`)
*   **`/src/core/events`**: 상태 변경과 UI 렌더링을 분리하기 위한 `EventBus`

## 🚀 시작하기

### 사전 준비 사항
컴퓨터에 [Node.js](https://nodejs.org/)가 설치되어 있어야 합니다.

### 설치 및 실행

1. 저장소를 클론합니다:
   ```bash
   git clone <your-github-repo-url>
   cd vibecoding
   ```

2. 의존성 패키지를 설치합니다:
   ```bash
   npm install
   ```

3. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```

4. 브라우저에서 `http://localhost:5173` 접속하여 확인합니다.

### 프로덕션 빌드

프로덕션용 빌드 파일을 생성하려면:
```bash
npm run build
```
결과물은 `dist` 폴더에 생성됩니다.
