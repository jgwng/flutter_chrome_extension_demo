# Flutter Chrome Extension Template

## 1. 프로젝트 소개
본 프로젝트는 Flutter를 사용해 Chrome 확장 프로그램 개발 방법을 소개하는 기본 템플릿으로,<br>ToDo 리스트를 관리하고 생성, 삭제, 완료 처리가 가능합니다.

## 2. 프로젝트 사용  방법
1. **저장소를 클론 또는 다운로드 받습니다.**
```
https://github.com/jgwng/flutter_chrome_extension_demo.git
```

2. **크롬 확장 프로그램 빌드하기**
```
make chrome
```

3. **크롬 브라우저에서 크롬 익스텐션 관리 페이지 열기**
```
chrome://extensions/
```

4. **개발자 모드 활성화**
   - Chrome 확장 프로그램 관리 페이지(`chrome://extensions/`)에서 우측 상단에 있는 "개발자 모드" 스위치를 클릭하여 활성화합니다.
   ![개발자 모드 활성화](https://github.com/user-attachments/assets/a466d8fd-8961-4826-b420-9ca2dc4396a9)

5. **압축 해제된 확장 프로그램 로드**
   - "압축 해제된 확장 프로그램을 로드합니다" 버튼을 클릭합니다.
  ![압축 해제된 확장 프로그램 로드](https://github.com/user-attachments/assets/2db94852-3d80-411d-8279-c21b3c58e638)
   - 아래 경로의 폴더를 선택하여 업로드 합니다!
     ```
     ./build/web
     ```
 

## 3. 데모 영상
https://github.com/user-attachments/assets/49999358-5626-4e2a-8f2f-510ef58223d5


## 4. 사용 기술

- **IndexedDB**: 이 프로젝트에서 IndexedDB는 클라이언트 측에서 ToDo 항목들을 저장하고 관리하는 데 사용됩니다.<br>사용자가 생성한 ToDo 항목들은 브라우저가 종료되어도 유지되며, 이를 통해 오프라인 상태에서도 데이터 접근성과 지속성을 보장합니다.

### 5. 참고 링크
https://velog.io/@gunwng123/Flutter-Web-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EC%A7%802-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-%ED%86%B5%EC%8B%A0%ED%95%98%EA%B8%B0
