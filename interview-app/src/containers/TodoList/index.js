import {StyledPaper, StyledTypography} from "./index.styled";
import {ArrowIcon} from "../../assets/icons/general";
import {Box, TextField, Typography} from "@mui/material";
import TodoItem from "../../components/TodoItem";
import {useContext, useEffect, useState} from "react";
import {createTodo, deleteTodo, getTodos, markTodoCompleted, markTodoUncompleted} from "../../services/Todo";
import {ALL, STATUS_COMPLETED, STATUS_UNCOMPLETED} from "../../constants/general";
import {TodoAppContext, TodoAppDispatchContext} from "../../context/TodoContext";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const {selectedStatus} = useContext(TodoAppContext);
  const { saveTodoAppDetails } = useContext(TodoAppDispatchContext);

  useEffect(() => {
    if (selectedStatus) {
      fetchTodos();
    }
  }, [selectedStatus])

  const handleChange = async (e, todoId) => {
    const checked = e.target.checked;
    const fn = checked ? markTodoCompleted : markTodoUncompleted;

   try {
     const params = { todoId };

     await fn(params);
     await fetchTodos();
   } catch (e) {
     console.log(e);
   }
  };

  const handleDelete = async (todoId) => {
    try {
      const params = { todoId };

      await deleteTodo(params);
      await fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateTodo = async () => {
    if (!newTodo) {
      return;
    }

    const data = {
      name: newTodo,
      status: STATUS_UNCOMPLETED,
    };

    try {
      await createTodo(data);
      await fetchTodos();

      setNewTodo('');
    } catch (e) {
      console.log(e);
    }
  }

  const handleChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  }

  const fetchTodos = async () => {
    const params = { filter: { status: selectedStatus }};
    const { data } = await getTodos(params);

    setTodos(data);
  }

  const handleFilter = (status) => {
    saveTodoAppDetails({selectedStatus: status});
  }

  return (
    <Box display="flex" justifyContent="center" height="80vh" alignItems="center">
      <StyledPaper>
        <ArrowIcon />

        <Typography variant="h5" mt={3} fontWeight={600} mb={4.5}>
          Todo List
        </Typography>

        <TextField
          variant="standard"
          placeholder="Add a new todo"
          fullWidth
          onBlur={handleCreateTodo}
          onChange={handleChangeNewTodo}
          value={newTodo}
        />

        {todos?.length > 0 && (
          <Box display="flex" flexDirection="column" mt={3}>
            {todos.map((todo) => (
              <Box mt={0.5} key={todo?.id}>
                <TodoItem
                  checked={todo?.status === STATUS_COMPLETED}
                  label={todo?.name}
                  handleChange={(e) => handleChange(e, todo?.id)}
                  handleDelete={() => handleDelete(todo?.id)}
                />
              </Box>
            ))}
          </Box>
        )}

        <Box display="flex" alignItems="center" mt={6}>
          <Typography variant="body2" color="secondary" fontWeight={600} sx={{ color: 'rgba(31, 42, 75, 0.59)' }}>
            Show:
          </Typography>

          <StyledTypography variant="body2" ml={2} isActive={selectedStatus === ALL} onClick={() => handleFilter(ALL)}>
            All
          </StyledTypography>

          <StyledTypography variant="body2" ml={1.25} isActive={selectedStatus === STATUS_COMPLETED} onClick={() => handleFilter(STATUS_COMPLETED)}>
            Completed
          </StyledTypography>

          <StyledTypography variant="body2" ml={1.25} isActive={selectedStatus === STATUS_UNCOMPLETED} onClick={() => handleFilter(STATUS_UNCOMPLETED)}>
            Incompleted
          </StyledTypography>
        </Box>
      </StyledPaper>
    </Box>
  );
}
