import axiosClient from "../axiosClient";

const baseExpense = "expense";

export const createExpense = async((data,roomId) => {
  return axiosClient.post(`/${baseExpense}/${roomId}`, data);
});

export const deleteExpense = async((expenseId) => {
  return axiosClient.delete(`/${baseExpense}/${expenseId}`);
});

export const updateExpense = async((expenseId,data) => {
  return axiosClient.patch(`/${baseExpense}/${expenseId}`,data);
});

export const getExpenseDetails = async((expenseId) => {
  return axiosClient.get(`/${baseExpense}/${expenseId}`);
});

export const getPendingPayments = async((expenseId) => {
  return axiosClient.get(`/${baseExpense}/pending`);
});

export const getUserExpense = async(() => {
  return axiosClient.get(`/${baseExpense}/user`);
});

export const updatePayment = async (data) => {
    return axiosClient.patch(`/${baseExpense}`, data);
};

