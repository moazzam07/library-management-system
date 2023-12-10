import axios from 'axios';

const BASE_URL = 'https://frappe-api.example.com';

const fetchBooks = async (params) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/books`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

const importBooks = async (data) => {
  try {
    console.log(data)
    const response = await axios.get('https://frappe.io/api/method/frappe-library');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error importing books:', error);
    throw error;
  }
};

const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/books`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/books/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

const createMember = async (memberData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/members`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

const updateMember = async (memberId, memberData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/members/${memberId}`, memberData);
    return response.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

const deleteMember = async (memberId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

export {
  fetchBooks,
  importBooks,
  createBook,
  updateBook,
  deleteBook,
  createMember,
  updateMember,
  deleteMember,
};