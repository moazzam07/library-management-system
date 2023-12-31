import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';

const fetchBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/book/list`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const importBooks = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/data-import`, data);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/book`, bookData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/book/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const fetchMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/member/list`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/member`, memberData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const updateMember = async (memberId, memberData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/member/${memberId}`, memberData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

const deleteMember = async (memberId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/member/${memberId}`);
    return response.data;
  } catch (error) {
    alert('Member has pending dept');
    throw error;
  }
};

const bookTransaction = async (memberId, requestData) => {
  try{
    const response = await axios.post(`${BASE_URL}/api/member/book/${memberId}`, requestData);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
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