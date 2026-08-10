# Minimalism Expo 공통 템플릿 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 앱별 GitHub 레포지토리의 시작점으로 사용할 Expo 기반 미니멀 UI 템플릿을 만든다.

**Architecture:** Expo Router의 `src/app`에는 라우트만 두고, 화면 본문은 `src/screens`, 재사용 UI는 `src/components`, 디자인 토큰은 `src/theme`에 둔다. 템플릿은 기능별 네이티브 모듈과 외부 DB를 포함하지 않으며, 로컬 저장은 `StorageAdapter` 인터페이스만 제공해 각 앱이 필요한 구현을 선택한다.

**Tech Stack:** 작업 시점의 공식 최신 안정 Expo SDK, React Native, TypeScript, Expo Router, React Native Paper MD3, Jest Expo, React Native Testing Library, npm.

## Global Constraints

- Expo SDK는 고정 숫자가 아니라 작업 시작 시점의 공식 최신 안정 버전을 사용한다.
- `beta`, `preview`, `canary` 등 사전 릴리스는 사용하지 않는다.
- 현재 계획 작성 시점의 안정 템플릿 기준은 SDK 57이며, scaffold 직전에 Expo 공식 문서에서 다시 확인한다.
- SDK에 맞는 React·React Native·TypeScript 버전을 `npx expo install --fix`로 동기화한다.
- 앱별 기능 모듈(`expo-camera`, `expo-location`, `expo-contacts`, 센서, 알림 등)은 템플릿에 설치하지 않는다.
- Supabase, 서버 API, 외부 DB를 추가하지 않는다.
- `src/app`에는 Expo Router 라우트만 둔다.
- 색상·간격·모서리·타이포그래피 값은 `src/theme` 토큰에서 가져온다.
- 새 함수와 동작은 테스트를 먼저 작성하고 실패를 확인한 뒤 구현한다.
- `android/`와 `ios/` 디렉터리는 생성하지 않고 CNG/EAS 설정을 사용한다.
- `eas build`와 `npm run build`는 사용자가 별도로 요청하기 전까지 실행하지 않는다.
- 커밋 메시지는 저장소 규칙에 맞는 한국어 이모지 형식을 사용하고 `Co-Authored-By`를 추가하지 않는다.

---

### Task 1: Expo 최신 안정 프로젝트 뼈대 생성

**Files:**
- Create: `package.json`, `package-lock.json`, `app.json`, `eas.json`, `tsconfig.json`, `.gitignore`, `jest.config.js`, `jest-setup.ts`, `src/app/_layout.tsx`, `src/app/index.tsx`, `assets/*`, `README.md`

**Interfaces:**
- Produces: Expo Router 프로젝트 진입점, `@/*` 경로 별칭, CNG 기반 앱 설정

- [ ] **Step 1: 실행 환경 확인**

```powershell
node --version
npm --version
```

현재 안정 SDK가 57이면 Node.js `22.13.x` 이상인지 확인한다. 더 최신 안정 SDK가 공식 문서에 표시되면 해당 SDK가 요구하는 최소 Node.js 버전을 적용한다.

- [ ] **Step 2: 임시 폴더에 공식 안정 템플릿 생성**

```powershell
npx create-expo-app@latest .expo-scaffold --template default@sdk-57 --no-install
```

SDK 확인 결과가 57과 다르면 `default@sdk-57`만 공식 최신 안정 템플릿 버전으로 교체한다. 생성 후 `src`, `assets`, `app.json`, `eas.json`, `package.json`, `tsconfig.json`, `.gitignore`를 저장소 루트로 이동하고 `.expo-scaffold`를 제거한다.

- [ ] **Step 3: 의존성 설치 및 SDK 동기화**

```powershell
npm install
npx expo install --fix
```

생성된 SDK가 요구하는 버전으로 Expo 패키지를 맞추고, `android/` 또는 `ios/`가 생성되지 않았는지 확인한다.

테스트를 먼저 실행할 수 있도록 아래 개발 의존성을 설치한다.

```powershell
npx expo install jest-expo
npm install --save-dev @testing-library/react-native
npm install --save-dev @types/jest
```

`jest.config.js`는 `jest-expo` preset과 `jest-setup.ts`를 사용하고, `jest-setup.ts`에는 RNTL 패키지 루트(`@testing-library/react-native`)를 import한다. 설치된 RNTL 14는 패키지 import 시 내장 Jest matcher를 자동 등록한다.

`tsconfig.json`의 `compilerOptions.types`에는 `jest`를 추가해 테스트 파일도 `tsc --noEmit` 대상에 포함한다.

- [ ] **Step 4: 앱 식별자 설정**

`app.json`의 프로젝트 식별자를 아래 값으로 맞춘다.

```json
{
  "expo": {
    "name": "Minimalism Template",
    "slug": "minimalism-template",
    "scheme": "minimalism-template",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "android": {
      "package": "com.minimalism.template"
    },
    "plugins": ["expo-router"]
  }
}
```

템플릿은 실제 출시 앱이 아니므로 기본 패키지 식별자를 사용하고, README에 앱 복제 후 식별자를 반드시 변경하도록 기록한다.

`eas.json`은 아래 세 가지 프로필만 둔다.

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
```

- [ ] **Step 5: 기본 실행 확인 및 커밋**

```powershell
npx expo-doctor
git add package.json package-lock.json app.json eas.json tsconfig.json .gitignore jest.config.js jest-setup.ts src/app assets README.md
git commit -m "✨ Expo 공통 템플릿 뼈대 생성"
```

Expected: Expo Doctor reports no dependency error and the commit contains only the scaffold files.

---

### Task 2: 디자인 토큰과 Paper 테마 구현

**Files:**
- Create: `src/theme/colors.ts`, `src/theme/spacing.ts`, `src/theme/radii.ts`, `src/theme/typography.ts`, `src/theme/theme.ts`
- Test: `src/theme/colors.test.ts`, `src/theme/typography.test.ts`

**Interfaces:**
- Produces: `colors`, `spacing`, `radii`, `typography`, `paperTheme`

- [ ] **Step 1: 무채색 토큰 테스트 작성**

```tsx
import { colors } from "./colors";

test("모든 색상 토큰은 무채색 hex 값이다", () => {
  for (const color of Object.values(colors)) {
    const channels = color.slice(1).match(/.{2}/g)?.map((channel) => parseInt(channel, 16));
    expect(channels).toHaveLength(3);
    expect(channels?.[0]).toBe(channels?.[1]);
    expect(channels?.[1]).toBe(channels?.[2]);
  }
});
```

- [ ] **Step 2: 테스트가 토큰 모듈 부재로 실패하는지 확인**

```powershell
npm test -- src/theme/colors.test.ts --runInBand
```

Expected: FAIL because `src/theme/colors.ts` does not exist yet.

- [ ] **Step 3: 색상·간격·반경·타이포그래피 토큰 구현**

```ts
export const colors = {
  ink: "#111111",
  charcoal: "#2B2B2B",
  graphite: "#666666",
  mist: "#D9D9D9",
  paper: "#F6F6F6",
  white: "#FFFFFF",
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radii = { sm: 8, md: 12, lg: 16 } as const;
```

`typography.ts`에는 `display`, `title`, `body`, `caption` 변형을 정의하고 `theme.ts`에서는 `MD3LightTheme`을 무채색 토큰으로 확장한다.

- [ ] **Step 4: Paper 테마와 타이포그래피 테스트 통과 확인**

```powershell
npm test -- src/theme/colors.test.ts src/theme/typography.test.ts --runInBand
npm run typecheck
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: 커밋**

```powershell
git add src/theme
git commit -m "🎨 흑백 디자인 토큰과 테마 추가"
```

---

### Task 3: 화면 기반 공통 UI 구현

**Files:**
- Create: `src/components/ui/app-screen.tsx`, `src/components/ui/app-text.tsx`, `src/components/ui/primary-button.tsx`, `src/components/ui/secondary-button.tsx`
- Test: `src/components/ui/primary-button.test.tsx`, `src/components/ui/app-text.test.tsx`

**Interfaces:**
- `AppScreenProps = { children: ReactNode; scrollable?: boolean }`
- `AppTextProps = { children: ReactNode; variant?: "display" | "title" | "body" | "caption" }`
- `ButtonProps = { label: string; onPress: () => void; disabled?: boolean }`

- [ ] **Step 1: 버튼 동작 테스트 작성**

```tsx
test("PrimaryButton은 누르면 onPress를 호출한다", async () => {
  const onPress = jest.fn();
  const rendered = await render(
    <PaperProvider theme={paperTheme}>
      <PrimaryButton label="확인" onPress={onPress} />
    </PaperProvider>,
  );

  fireEvent.press(rendered.getByRole("button", { name: "확인" }));
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: 버튼 테스트가 구현 부재로 실패하는지 확인**

```powershell
npm test -- src/components/ui/primary-button.test.tsx --runInBand
```

Expected: FAIL because `PrimaryButton` does not exist yet.

- [ ] **Step 3: AppScreen·AppText·PrimaryButton·SecondaryButton 구현**

Paper 컴포넌트와 `StyleSheet.create`를 사용하고, 여백·색상·반경은 `src/theme`에서 가져온다. 버튼의 접근성 이름은 `label`이 되게 한다.

- [ ] **Step 4: 테스트와 타입 검사 통과 확인**

```powershell
npm test -- src/components/ui/primary-button.test.tsx src/components/ui/app-text.test.tsx --runInBand
npm run typecheck
```

Expected: PASS with no warnings caused by the new components.

- [ ] **Step 5: 커밋**

```powershell
git add src/components/ui/app-screen.tsx src/components/ui/app-text.tsx src/components/ui/primary-button.tsx src/components/ui/secondary-button.tsx src/components/ui/*.test.tsx
git commit -m "✨ 기본 화면과 버튼 컴포넌트 추가"
```

---

### Task 4: 카드·입력·빈 상태 UI 구현

**Files:**
- Create: `src/components/ui/surface-card.tsx`, `src/components/ui/app-input.tsx`, `src/components/ui/empty-state.tsx`
- Test: `src/components/ui/app-input.test.tsx`, `src/components/ui/empty-state.test.tsx`

**Interfaces:**
- `SurfaceCardProps = { children: ReactNode }`
- `AppInputProps = { label: string; value: string; onChangeText: (value: string) => void; placeholder?: string; errorMessage?: string }`
- `EmptyStateProps = { title: string; description?: string; actionLabel?: string; onAction?: () => void }`

- [ ] **Step 1: 빈 상태 액션 테스트 작성**

```tsx
test("EmptyState는 actionLabel이 있을 때 액션 버튼을 보여준다", () => {
  const onAction = jest.fn();
  render(<EmptyState title="아직 항목이 없습니다" actionLabel="추가" onAction={onAction} />);

  fireEvent.press(screen.getByRole("button", { name: "추가" }));
  expect(onAction).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: 테스트가 구현 부재로 실패하는지 확인**

```powershell
npm test -- src/components/ui/empty-state.test.tsx --runInBand
```

Expected: FAIL because `EmptyState` does not exist yet.

- [ ] **Step 3: 카드·입력·빈 상태 구현**

입력 컴포넌트는 `label`, `placeholder`, `errorMessage`를 사용자에게 명확히 표시하고 `onChangeText`를 그대로 전달한다. 빈 상태는 액션 속성이 없으면 버튼을 렌더링하지 않는다.

- [ ] **Step 4: 테스트와 타입 검사 통과 확인**

```powershell
npm test -- src/components/ui/app-input.test.tsx src/components/ui/empty-state.test.tsx --runInBand
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: 커밋**

```powershell
git add src/components/ui/surface-card.tsx src/components/ui/app-input.tsx src/components/ui/empty-state.tsx src/components/ui/app-input.test.tsx src/components/ui/empty-state.test.tsx
git commit -m "✨ 카드 입력 빈 상태 컴포넌트 추가"
```

---

### Task 5: 로컬 저장소 경계 정의

**Files:**
- Create: `src/storage/storage-adapter.ts`, `src/storage/index.ts`
- Modify: `README.md`

**Interfaces:**

```ts
export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

- [ ] **Step 1: 타입 계약 작성**

`StorageAdapter`와 공개 export만 작성한다. 템플릿에는 실제 저장 패키지를 설치하지 않는다.

- [ ] **Step 2: 타입 검사로 계약 확인**

```powershell
npm run typecheck
```

Expected: PASS. 저장소 인터페이스는 런타임 구현이 없으므로 별도 mock 동작을 추가하지 않는다.

- [ ] **Step 3: README에 구현 예시 추가**

문서에 앱별 저장 패키지를 선택하는 원칙과 아래 네이티브 모듈 추가 예시를 기록한다.

```powershell
npx expo install expo-camera
```

카메라·위치·연락처 등 기능별 패키지는 해당 앱에서만 설치하고, 설치 후 권한 설정과 Development Build 재생성을 수행한다.

- [ ] **Step 4: 커밋**

```powershell
git add src/storage README.md
git commit -m "⚙ 로컬 저장소 경계 정의"
```

---

### Task 6: 템플릿 쇼케이스 화면과 Router 연결

**Files:**
- Create: `src/screens/template-showcase/template-showcase-screen.tsx`, `src/screens/template-showcase/index.ts`
- Modify: `src/app/_layout.tsx`, `src/app/index.tsx`
- Test: `src/screens/template-showcase/template-showcase-screen.test.tsx`

**Interfaces:**
- `TemplateShowcaseScreen(): JSX.Element`
- `src/app/index.tsx` renders `TemplateShowcaseScreen` and contains no design-token definitions.

- [ ] **Step 1: 쇼케이스 렌더링 테스트 작성**

```tsx
test("쇼케이스는 템플릿 제목과 공통 UI를 렌더링한다", () => {
  render(
    <PaperProvider theme={paperTheme}>
      <TemplateShowcaseScreen />
    </PaperProvider>,
  );

  expect(screen.getByText("Minimalism Template")).toBeOnTheScreen();
  expect(screen.getByRole("button", { name: "Primary action" })).toBeOnTheScreen();
});
```

- [ ] **Step 2: 테스트가 화면 부재로 실패하는지 확인**

```powershell
npm test -- src/screens/template-showcase/template-showcase-screen.test.tsx --runInBand
```

Expected: FAIL because `TemplateShowcaseScreen` does not exist yet.

- [ ] **Step 3: Root layout과 쇼케이스 구현**

`_layout.tsx`에서 `PaperProvider`에 `paperTheme`를 주입하고 Stack 헤더를 숨긴다. 쇼케이스는 `AppScreen`, `AppText`, `PrimaryButton`, `SecondaryButton`, `SurfaceCard`, `AppInput`, `EmptyState`를 실제로 사용한다.

- [ ] **Step 4: 테스트 통과와 수동 화면 확인**

```powershell
npm test -- src/screens/template-showcase/template-showcase-screen.test.tsx --runInBand
npm run typecheck
npx expo start
```

Expected: `/` route renders the monochrome showcase without red-screen errors. Stop the dev server after the manual check.

- [ ] **Step 5: 커밋**

```powershell
git add src/app src/screens/template-showcase
git commit -m "✨ 디자인 시스템 쇼케이스 화면 추가"
```

---

### Task 7: 테스트·스크립트·템플릿 문서 정리

**Files:**
- Create: `eslint.config.js`, `src/test/test-provider.tsx`
- Modify: `package.json`, `README.md`, `eas.json`

**Interfaces:**
- `test-provider.tsx` exports a `renderWithTheme` helper that wraps React Native Testing Library renders with `PaperProvider` and `paperTheme`.
- `package.json` scripts: `test`, `typecheck`, `lint`.

- [ ] **Step 1: 테스트 provider 작성**

`renderWithTheme`는 `@testing-library/react-native`의 `render`를 감싸고 테스트 컴포넌트에 `paperTheme`를 제공한다.

- [ ] **Step 2: 테스트 도구 설치 및 전체 테스트 실행**

```powershell
npm test -- --runInBand
```

Expected: all theme, component, and showcase tests PASS.

- [ ] **Step 3: 스크립트와 README 작성**

```json
{
  "scripts": {
    "start": "expo start",
    "test": "jest",
    "typecheck": "tsc --noEmit",
    "lint": "expo lint"
  }
}
```

README에는 템플릿 복제 후 `name`, `slug`, Android package, EAS project 설정을 변경하는 순서와 기능별 네이티브 모듈 설치 규칙을 단계별로 기록한다.

- [ ] **Step 4: 커밋**

```powershell
git add eslint.config.js src/test package.json package-lock.json README.md eas.json
git commit -m "🧪 템플릿 테스트와 사용 문서 추가"
```

---

### Task 8: 최종 정합성 검증

**Files:**
- Test: all `*.test.ts`, `*.test.tsx`
- Inspect: `package.json`, `app.json`, `src/theme`, `src/components/ui`, `src/storage`, `README.md`

**Interfaces:**
- Produces: 설치 가능한 최신 안정 Expo 템플릿과 독립 앱으로 복제 가능한 문서

- [ ] **Step 1: 전체 테스트·타입·린트 실행**

```powershell
npm test -- --runInBand
npm run typecheck
npm run lint
npx expo-doctor
```

Expected: all commands exit successfully without dependency, type, lint, or diagnostic errors.

- [ ] **Step 2: 기능별 네이티브 모듈 미포함 확인**

```powershell
rg "expo-camera|expo-location|expo-contacts|expo-sensors|expo-notifications" package.json app.json src README.md
```

Expected: matches appear only in README's optional installation example, not in `package.json`, `app.json`, or source imports.

- [ ] **Step 3: 기본 구조와 디자인 토큰 정적 검토**

`src/app` 외부의 화면 코드가 라우트에 들어가지 않았는지, UI의 색상·간격·반경 값이 `src/theme` 밖에 하드코딩되지 않았는지 확인한다.

- [ ] **Step 4: 최종 커밋**

```powershell
git add .
git commit -m "🌱 Expo 미니멀 앱 공통 템플릿 완성"
```

GitHub `minimalism-template` 레포 생성과 push는 이 검증 이후 별도 승인 단계에서 진행한다.
