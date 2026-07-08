# SignalDesk FE

보안 이벤트 운영 화면입니다. 이벤트 상태, 처리 우선순위, 레거시 리포트 동기화 상태를 React 대시보드에서 확인합니다.

## 기능

- 보안 이벤트 metric 카드
- 이벤트 상태 목록
- D3 이벤트 추세 차트
- `ky` 공통 API client
- TanStack Query 기반 dashboard cache
- jQuery/Ajax 레거시 리포트 adapter

## 구조

```text
src/features/dashboard/api.ts
src/features/dashboard/hooks.ts
src/features/dashboard/types.ts
src/features/dashboard/dashboard.tsx
src/features/chart/d3-trend.ts
src/features/legacy/jquery-adapter.ts
src/shared/api/client.ts
```

## 실행

```bash
npm install
npm run dev
npm run build
npm run test:e2e
```

## 환경 변수

```bash
VITE_API_URL=http://localhost:8000/api
```
