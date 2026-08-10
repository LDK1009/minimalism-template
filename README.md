# Minimalism Template

Expo 기반 미니멀 앱 공통 템플릿입니다.

## 기준

- 작업 시점의 공식 최신 안정 Expo SDK
- Expo Router + TypeScript
- 흑색–회색–백색 디자인 시스템
- 앱별 네이티브 모듈 설치
- 서버·Supabase·외부 DB 미사용

## 개발 명령

```powershell
npm run start
npm test -- --runInBand
npm run typecheck
npm run lint
```

## 로컬 저장소

템플릿은 특정 저장소 패키지를 기본 설치하지 않습니다. 앱별 데이터 모델과 용량 요구사항에 맞는 구현을 `StorageAdapter`에 연결합니다.

```ts
export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

## 앱별 네이티브 모듈

카메라처럼 특정 앱에만 필요한 기능은 해당 앱 저장소에서만 설치합니다.

```powershell
npx expo install expo-camera
```

설치 후 권한 설정과 Development Build를 앱별로 검증합니다.

## 새 앱 시작

1. 템플릿을 앱별 저장소로 복제합니다.
2. `app.json`의 `name`, `slug`, Android package를 변경합니다.
3. 앱 기능에 필요한 네이티브 모듈과 로컬 저장소 구현만 추가합니다.
4. 기능 검증 후 앱별 GitHub 저장소에 저장합니다.

## EAS 배포 준비

앱별 `app.json` 식별자와 EAS 프로젝트 연결을 완료한 뒤 아래 프로필을 사용합니다.

```powershell
eas build --profile preview
eas build --profile production
eas submit --profile production
```
