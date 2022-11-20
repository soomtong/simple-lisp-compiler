> 내가 처음으로 구독한 개인 메일인 [Phil](https://notes.eatonphil.com) 의 웹 페이지에 있는 2018년 말 포스트인 'Writing a lisp compiler from scratch in JavaScript' 를 학습하며 기록한 글이다.

1. https://faultnote.github.io/posts/write-simple-compiler-1/

우선 Node 환경에서 구동되는 Lisp 컴파일러를 구현하는 투토리얼을 따라가 보도록 한다. 본문은 여기에 있다.

- https://notes.eatonphil.com/compiler-basics-lisp-to-assembly.html

시리즈의 목표는 아래와 같은 코드를 계산하는 프로그램을 만드는 것이다.

```scheme
(+ 1 (+ (2 3)))
```

이 과정에서 '파싱', '코드 생성', '어셈블리 기본', '시스템 콜' 에 대한 내용을 다루지만 '함수 정의', '비 심볼/비 산술 데이터 타입', '3개 이상의 인자 전달', '예외 처리', '에러 핸들링' 등은 다루지 않는다.
