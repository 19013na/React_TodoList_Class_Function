import ClassTodo from './components/ClassTodo';
import FunctionalTodo from './components/functional/FunctionalTodo';

const App = () => {
  return (
    <div>
      <ClassTodo />

      <FunctionalTodo/>      
    </div>
  );
};

export default App;