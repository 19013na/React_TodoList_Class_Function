### 1. useCallback() 적용 효과
* handleChange, handleToggle, handleRemove: 의존성 배열이 []이므로 컴포넌트 마운트 시 한 번만 생성
* handleCreate: nextId와 todo가 변경될 때만 새로 생성
* handleEnter: handleCreate가 변경될 때만 새로 생성

* 효과: 자식 컴포넌트들이 memo로 감싸져 있기 때문에, 함수 참조가 동일하면 불필요한 리렌더링을 방지합니다.

### 2. useMemo() 적용 효과

* formProps, todoListProps: props 객체를 메모이제이션하여 참조 동일성 보장
* todoList in TodoItemList: 500개의 TodoItem 컴포넌트 생성을 캐싱
* 효과:
    * myTodos 배열이 변경되지 않으면 500개의 TodoItem 재생성을 방지
    * props 객체의 참조가 동일하므로 memo로 감싼 컴포넌트의 불필요한 리렌더링 방지

### 3. 함수형 setState 패턴 적용
```js
setTodos(prevTodos => [...prevTodos, newTodo]);
```
* 효과:
    * 클로저 문제 방지
    * 최신 state 값을 항상 보장
    * useCallback의 의존성 배열에서 todos를 제거할 수 있음

### 4. 성능 개선 시나리오
* 초기 렌더링: 500개 TodoItem이 한 번에 생성되지만 이후 최적화됨
* 새 할일 추가: handleCreate만 새로 생성, 나머지 함수는 재사용
* 할일 토글/삭제: 해당 함수들이 캐시되어 있어 빠른 실행
* 텍스트 입력: handleChange가 캐시되어 타이핑 시 부드러운 성능    


