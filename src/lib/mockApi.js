export const updateTaskStatus = (taskId, newStatus) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ❗ 20% failure simulation
      const shouldFail = Math.random() < 0.2;

      if (shouldFail) {
        reject(new Error("Server error"));
      } else {
        resolve({ taskId, newStatus });
      }
    }, 1500); // ❗ 1.5 second delay
  });
};