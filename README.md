# :bulb: 리그 오브 레전드 정보 페이지

## :tada: 프로젝트 소개

### :one: 프로젝트 주제
Typescript와 Next.js를 이용하여 라이엇 API를 활용한 리그 오브 레전드 챔피언과, 아이템 등의 정보를 알 수 있는 웹 페이지

### :two: 프로젝트 내용
라이엇 API를 이용하여 리그 오브 레전드의 챔피언의 목록을 볼 수 있는 페이지와 각 챔피언의 정보가 담긴 페이지 그리고 아이템 정보를 알 수 있는 페이지와 무료로 즐길 수 있는 로테이션 챔피언 목록을 볼 수 있는 페이지로 구성된 웹 페이지를 기획하였습니다.

### :three: 활용 방안
- 챔피언 목록 페이지: 리그 오브 레전드의 전체 챔피언의 목록을 이름과 간단한 설명을 통해 보여줄 수 있는 페이지 입니다.
- 아이템 목록 페이지: 리그 오브 레전드의 아이템의 이름과 설명의 정보를 알 수 있는 페이지 입니다.
- 챔피언 로테이션 페이지: 무료로 즐길 수 있는 챔피언의 목록만을 알 수 있는 페이지 입니다.
- 각 챔피언 정보 페이지: 각각의 챔피언의 정보가 담긴 페이지로써 이름과 이미지, 설명을 알 수 있는 페이지 입니다.

## :date: 프로젝트 수행 절차 및 방법

- 2024.09.24 ~ 2024.10.07

| 구분                     | 기간                        | 활동                                                      | 비고                                            |
| ------------------------ | --------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| 기획 완료 및 프로젝트 셋업         | 9/24(화)~9/26(목)            | 기획 준비 및 프로젝트 세팅 시작 |                                                 |
| 기능 개발            | 9/27(금)~9/30(월)               |     챔피언 목록 페이지 구현, 챔피언 상세 데이터 페이지 구현                     |                            |
| 기능 개발            | 10/01(화)~10/02(수)               |        챔피언 로테이션 페이지 구현                     |  |
| 기능, 디자인 개발 | 10/03(목)~10/04(금) | 아이템 목록 페이지 구현 및 전체 레이아웃과 해당 페이지 CSS 구현                     |                                  |
| 배포 및 트러블 슈팅           | 10/05(토)~10/07(월)               | 배포 및 트러블 슈팅 분석                   |                                                 |
| 총 개발 기간             | 9/24(목)~10/07(일) 총 14일 |                                                           |

## :hammer_and_wrench: STACK

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react%20query&logoColor=white)

## :fountain_pen: Code Convention

- prettier 사용
- `상태 관리`: context API
- `라우팅 관리`: react-router-dom
- `변수, 함수명`: camelCase
  - 명시적으로 사용: addPostHandler
- `컴포넌트`
  - 컴포넌트 명: PascalCase
  - 컴포넌트가 아닐 경우: camelCase 적용
  - export default '함수명' 사용
- `Styled-component`
  - 네이밍은 앞에 St가 붙는다. (StHeader)
  - 명시적으로 사용: StPostList

## :paintbrush: Github Rules

Branch, Commit, Commit 규칙

### :pushpin: Branch

- `main`: 배포용 브랜치
- `develop`: 릴리즈 통합 브랜치
- `feature/브랜치명`: 기능 개발 브랜치

### :pushpin: Commit

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `update`: 오타, 간단 수정 ⇒ 누락 등(로직 변화 없음)
- `refactor`: 코드 리팩토링

### :pushpin: 규칙

- 커밋 규칙
  - 최상단에 작업 타입, 현재 작업하는 페이지 작성
  - 하단엔 어떤 기능을 추가했는지 명시적으로 작성

```bash
feat: 로그인 페이지 기능 구현
- Input 함수 추가
- 회원가입과 로그인 로직 구현
- 로그인, 회원가입 폼 컴포넌트 구현
```

## :card_index_dividers: 주요 기능 소개

| 요구사항              | 선택                     | 이유                                                                                               |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| 상태 관리 라이브러리 | zustand, tanstack-query                 | 불필요한 전역 state를 로컬 state로 관리하고, <br/>가벼운 전역 state 관리를 위해 zustand 채택 |
| DB 활용       | json-server            | 로그인/회원가입 기능의 인증/인가 로직이 필요하고, <br/>Restful한 개발을 훈련해 볼 수 있으며,<br/> 실무에서는 거의 REST API를 사용하기 때문에 채택             |
| API                | 카카오,축제,유튜브                    | 키워드에 따른 검색 결과를 데이터로 받기 위해 youtube data api를 사용하고<br/> 그 데이터를 영상으로 띄우기 위해 iframe player api 사용, 카카오 지도의 경우 축제 주제가 국내 한정인 이유와 함께<br/> 다양한 api 기능을 보여주고 접근성이 좋기 때문에 채택하였고 축제 데이터의 경우에는 최신 상태의 다양한 축제 데이터가 존재하기 때문에 채택   |
| 코드블럭              | react-syntax-highlighter | npm.js 사이트에서 demo코드도 확인이 가능하고 설명이 잘 되어있었음                                  |
| RRD(react-router-dom)                | useNavigate, useLocation, useParams, useSearchParms         | 효율적으로 페이지를 전환하고 URL에 맞는 컴포넌트를 보여주기 위해 매우 유용하기 때문에 채택    |

### :one: 메인 페이지

![mainpage](https://github.com/user-attachments/assets/b69e279b-268c-429c-ba43-0633fbd3be8c)


- 사용자의 현재 위치 측정
- 축제 전체 리스트 노출
  - 각 게시물의 축제 정보 노출
  - 버튼
    - 카카오 지도: 새 창으로 카카오 맵 길찾기 서비스 이용 
    - 상세보기: 축제 상세페이지로 이동
    - 저장하기: 북마크에 저장 (마이페이지에서 확인 가능) 

### :two: 로그인,회원가입

![auth](https://github.com/user-attachments/assets/de79eb2c-1ae6-4522-b531-df2c10733340)

- 회원가입
  - 사용자의 아이디, 비밀번호, 닉네임을 입력 후 등록된 아이디인지 판별하여 회원가입 처리
- 로그인
  - 사용자의 아이디, 비밀번호 판별 후 로그인 처리

### :three: 상세 페이지

![detail](https://github.com/user-attachments/assets/528f9e60-5b55-49ad-b2e9-1fa4a5446b86)

- 선택한 축제 YOUTUBE 상위 검색 영상 노출
- 선택한 축제 KAKAO MAP 마커 등록
- 선택한 축제 상세 데이터 노출

### :four: 마이 페이지

![mypage](https://github.com/user-attachments/assets/271c0e55-9708-4d53-83d1-9b9c809ab39f)

- 북마크에 저장한 축제 리스트를 확인할 수 있습니다.
  - 상세페이로 이동이 가능합니다.
  - 북마크 취소가 가능합니다.

## 소감
- 김민규
  - 프로젝트 초기 기획단계에서 필수기능구현과 도전기능을 결정하는 부분에서 안전하게 프로젝트를 진행하기 위해 도전 기능을 추가하는 것에 소극적인 부분이 아쉬운 부분도 있었지만, 프로젝트를 진행하며 모두 적극적으로 임하였고 최종적으로 필수,도전 기능 구현에 있어 완성도있게 잘 마무리되어 좋았습니다. 
- 선채훈
  - 처음 프로젝트 기획하고 파트 분배할 때 어떻게 나눠야할지에 대해 어려움이 있었지만 역할 분배 이후에 팀적으로 어려웠던 부분은 크게 없었던거같고 추석 연휴에도 팀원분들이 휴식없이 프로젝트를 진행해주셔서 기간안에 잘 끝낼 수 있었던거같습니다
- 강수진
  - 처음부터 필수 기능을 목적으로 가볍게 기획을 하여서 심적 부담이 크게 줄어서 좋았고, 기획을 하는 데에 다들 의견이 많아 회의가 늘어지는 부분이 좀 아쉬웠지만 기획 단계가 지나고서부터는 다들 원활하게 소통하며 팀 과제를 진행하여서 만족스러웠습니다. API를 다룰 수 있게 되어 매우 뿌듯합니다.
- 이재호
  - 처음으로 다양한 API를 활용하여 프로젝트를 진행하려고 했다보니 업무 분배에 있어서 원활하지 못했던 것이 아쉬웠고 팀원들께서 맡은 업무를 다 잘 수행해주셔서 시간이 지날 수록 수월하게 프로젝트를 진행하였던 것 같습니다. 
