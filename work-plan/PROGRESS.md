# Anti-Gravity 프로젝트 진행 상황

## 🗓️ 현재 상태: Phase 3 (작업 중)

### Phase 1: 프로젝트 초기 설정 🏗️ (100%)
- [x] Next.js 14 프로젝트 생성 (App Router)
- [x] Tailwind CSS v4 설정 및 디자인 시스템 반영
- [x] 필수 패키지 설치 (NextAuth, Supabase, Framer Motion 등)
- [x] 프로젝트 폴더 구조 생성
- [x] 디자인 시스템 구축 (Color, Typography, Global Styles)
- [x] 메인 히어로 섹션 구현 (`app/page.tsx`)
- [x] 환경 변수 템플릿 생성 (`.env.example`, `.env.local`)

### Phase 2: 인증 시스템 🔐 (100%)
- [x] NextAuth.js v5 설정 (`src/lib/auth.ts`)
- [x] GitHub Provider 연동 및 세션 콜백 구현
- [x] 관리자 권한 시스템 (Whitelist 연동)
- [x] 인증 UI 적용 (로그인/로그아웃 버튼 및 대시보드 리다이렉션)
- [x] 보호된 관리자 라우트 설정 (`src/app/admin/layout.tsx`)

### Phase 4: GitHub API 연동 🐙 (100%)
- [x] GitHub REST API 클라이언트 설정
- [x] Repository URL 파싱 로직
- [x] README.md 콘텐츠 fetch 기능
- [x] Markdown -> HTML 변환 및 스타일링

### Phase 5: 핵심 기능 개발 ⚡ (80%)
- [x] 메인 페이지 히어로 섹션
- [x] 관리자 대시보드 구조 및 사이드바
- [x] 프로젝트 목록 조회 및 삭제
- [x] 새 프로젝트 추가 기능 (GitHub 연동 포함)
- [x] 메인 페이지 프로젝트 그리드
- [x] 프로젝트 상세 페이지 (Markdown 렌더링 포함)
- [ ] 사용자 커스텀 테마 설정

---

## ✅ 최근 완료된 작업
1. **관리자 경험(UX) 개선**: 프로페셔널한 사이드바와 대시보드 위젯을 추가하여 관리 편의성 향상.
2. **CRUD 기능 활성화**: 프로젝트를 실제 Supabase DB에 저장하고 목록에서 관리(삭제 등)하는 연동 성공.
3. **서버-클라이언트 동기화**: Server Actions를 이용한 효율적인 데이터 처리 및 리다이렉션 로직 안정화.

## 🚀 다음 목표
1. **GitHub 자동 연동**: 프로젝트 등록 시 GitHub 주소를 넣으면 제목, 설명, README를 자동으로 불러오는 기능.
2. **Markdown 렌더링**: 불러온 README를 상세 페이지에서 아름답게 보여주기 위한 스타일링.
3. **메인 페이지 그리드**: 등록된 프로젝트들을 메인 화면에서 카드 형태로 전시.
