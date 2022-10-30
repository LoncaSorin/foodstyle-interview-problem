export const saveTodoAppDetailsToStorage = (todoAppDetails) => {
  localStorage.setItem('todoAppDetails', JSON.stringify(todoAppDetails));
};

export const getTodoAppDetails = () => {
  try {
    const todoAppDetails = localStorage.getItem('todoAppDetails') || null;
    return todoAppDetails ? JSON.parse(todoAppDetails) : null;
  } catch (error) {
    return null;
  }
};

export const removeTodoAppDetails = () => {
  localStorage.removeItem('todoAppDetails');
};
