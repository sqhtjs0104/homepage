# Homepage
Side project - Homepage

> 2023.03.07 ~    
> Example site link: https://sqhtjs0104.github.io/homepage/   
> Notion page: https://www.notion.so/Momentum-Clone-f1bb57c9a6d74e9389b69402567150fa

## Skills
- HTML5/CSS3
- SCSS
- ReactJS
- Javascript

## Libraries
- dayjs
- lodash
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome
- react-redux
- @reduxjs/toolkit
- gh-pages
- dotenv
- axios
- react-modal
- styled-components
- firebase

## About
구글 확장 프로그램 중 홈페이지 사이트로 유명한   
모멘텀(https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=ko)에   
영감을 받아 제작한 사이트입니다.   
날씨와 시간을 dayjs, OpenWeatherMap API를 이용해 출력하며,   
배경 사진 파일과 간단한 JSON 파일을 이용해 배경에 영화 명장면과 명대사를 출력합니다.   
화면 좌상단의 메뉴를 이용(Button hover), To Do List와 일정 달력을 Modal 팝업으로 이용 가능합니다.
중단 검색 바를 이용해 구글 / 네이버 검색을 이용 가능하며, 검색바 좌측 토글 버튼을 이용해 검색 엔진을 변경 가능합니다.

## Supplementable
1. 사용자 이름을 입력받은 뒤, 해당 값을 스토리지에 저장해놓은 뒤 Firebase 등 Cloud DB API 요청 시 활용하여 각각 다른 이용자 별 To Do 혹은 일정을 관리할 수 있도록 하는 방안
2. 배경 화면을 새로고침하지 않고 슬라이드 형식으로 변경하는 방안
3. To Do / 일정 중 리마인더 알림 출력(설정해놓은 시간에 따라 일정 시간 전에 알림 메세지 출력)하는 방안

## Example

### 메인 화면
[!IMG](./capture/1.PNG)

### To Do List Modal
[!IMG](./capture/2.PNG)   
모달 콘텐츠 사이드 프로젝트 -> https://github.com/sqhtjs0104/todolist

### Calendar Modal
[!IMG](./capture/3.PNG)   
모달 콘텐츠 사이드 프로젝트 -> https://github.com/sqhtjs0104/calendar
