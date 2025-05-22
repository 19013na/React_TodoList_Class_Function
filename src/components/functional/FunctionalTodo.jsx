import { useState, useCallback, useMemo } from "react";
import FunctionalForm from "./FuctionalForm";
import FunctionalTodoItemList from "./FunctionalTodoItemList";
import FuctionalTodoListTemplate from "./FuntionalTodoListTemplate";

const initialTodos = new Array(500)
  .fill(0)
  .map((item, idx) => ({ id: idx, text: `일정 ${idx}`, checked: true }));

const FunctionalTodo = () => {
  // useState 훅을 사용하여 상태 관리
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  // const [todos, setTodos] = useState([
  //     { id: 0, text: '함수형 소개', checked: false },
  //     { id: 1, text: '함수형 구조', checked: true },
  //     { id: 2, text: '함수형 사용', checked: false }
  //   ]);
  const [nextId, setNextId] = useState(3); // 이미 0,1,2 가 존재하므로 3으로 설정

  // 이벤트핸들러 함수 선언
  // const handleChange = (e) => {
  //   setTodo(e.target.value); // input field의 다음 바뀔 값
  // };

  // useCallback을 사용하여 이벤트핸들러 함수 최적화
  //의존성 배열이 []이므로 컴포넌트 마운트 시 한 번만 생성
  const handleChange = useCallback((e) => {
    setTodo(e.target.value); // input field의 다음 바뀔 값
  }, []);

  // const handleCreate = () => {
  //   const newTodo = {
  //     id: nextId,
  //     text: todo,
  //     checked: false
  //   };

  //   setTodos([...todos, newTodo]);
  //   setTodo(''); // input 초기화
  //   setNextId(nextId + 1);
  // };

  //nextId와 todo가 변경될 때만 새로 생성
  const handleCreate = useCallback(() => {
    const newTodo = {
      id: nextId,
      text: todo,
      checked: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo(""); // input 초기화
    setNextId((prevId) => prevId + 1);
  }, [nextId, todo]);

  // const handleEnter = (e) => {
  //   // 눌려진 키가 Enter Key 이면 handleCreate 호출
  //   if (e.keyCode === 13) {
  //     handleCreate();
  //   }
  // };

  //handleCreate가 변경될 때만 새로 생성
  const handleEnter = useCallback(
    (e) => {
      // 눌려진 키가 Enter Key 이면 handleCreate 호출
      if (e.keyCode === 13) {
        handleCreate();
      }
    },
    [handleCreate]
  );

  // const handleToggle = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, checked: !todo.checked } : todo
  //     )
  //   );
  // };

  //의존성 배열이 []이므로 컴포넌트 마운트 시 한 번만 생성
  const handleToggle = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  // const handleRemove = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  //의존성 배열이 []이므로 컴포넌트 마운트 시 한 번만 생성
  const handleRemove = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  //   return (
  //     <FuctionalTodoListTemplate
  //       form={
  //         <FunctionalForm
  //           myTodo={todo}
  //           myEnter={handleEnter}
  //           myChange={handleChange}
  //           myCreate={handleCreate}
  //         />
  //       }
  //     >
  //       <FunctionalTodoItemList
  //         myTodos={todos}
  //         myToggle={handleToggle}
  //         myRemove={handleRemove}
  //       />
  //     </FuctionalTodoListTemplate>
  //   );
  // };

  //formProps, todoListProps: props 객체를 메모이제이션하여 참조 동일성 보장
  // useMemo를 사용하여 Form 컴포넌트 props 최적화
  const formProps = useMemo(
    () => ({
      myTodo: todo,
      myEnter: handleEnter,
      myChange: handleChange,
      myCreate: handleCreate,
    }),
    [todo, handleEnter, handleChange, handleCreate]
  );

  // useMemo를 사용하여 TodoItemList 컴포넌트 props 최적화
  const todoListProps = useMemo(
    () => ({
      myTodos: todos,
      myToggle: handleToggle,
      myRemove: handleRemove,
    }),
    [todos, handleToggle, handleRemove]
  );

  return (
    <FuctionalTodoListTemplate 
        form={<FunctionalForm {...formProps} />}>
      <FunctionalTodoItemList {...todoListProps} />
    </FuctionalTodoListTemplate>
  );
};

export default FunctionalTodo;
