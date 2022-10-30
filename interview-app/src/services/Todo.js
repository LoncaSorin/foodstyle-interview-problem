import {CREATE_TODO, DELETE_TODO, GET_TODOS, MARK_TODO_COMPLETED, MARK_TODO_UNCOMPLETED} from "../constants/apiRoutes";
import {runDeleteApiRequest, runGetApiRequest, runPostApiRequest, runUpdateApiRequest} from "./Api";
import {formatRoute} from "../utils/formatters";

export const getTodos = async (params) => (
  runGetApiRequest(GET_TODOS, params)
);

export const createTodo = async (data) => (
  runPostApiRequest(CREATE_TODO, data)
)

export const markTodoCompleted = async (params, data = {}) => (
  runUpdateApiRequest(formatRoute(MARK_TODO_COMPLETED, params), data)
)

export const markTodoUncompleted = async (params, data = {}) => (
  runUpdateApiRequest(formatRoute(MARK_TODO_UNCOMPLETED, params), data)
)

export const deleteTodo = async (params) => (
  runDeleteApiRequest(formatRoute(DELETE_TODO, params))
)
