import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

const fetchBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/book/list`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const importBooks = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/data-import`, data);
    return response.data;
  } catch (error) {
    console.error('Error importing books:', error);
    throw error;
  }
};

const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/book`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/book/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

const fetchMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/member/list`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/member`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

const updateMember = async (memberId, memberData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/member/${memberId}`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

const deleteMember = async (memberId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/member/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

const bookTransaction = async (memberId, requestData) => {
  try{
    console.log(memberId)
    console.log(requestData)
    const response = await axios.post(`${BASE_URL}/api/member/book/${memberId}`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error in transaction:', error);
    throw error;
}
};

export {
  fetchBooks,
  importBooks,
  createBook,
  updateBook,
  deleteBook,
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
  bookTransaction,
};