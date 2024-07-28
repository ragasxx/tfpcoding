import { server } from '../Store';
import axios from 'axios';

export const getAllCourses =
  (keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const { data } = await axios.get(`${server}/courses?keyword=${keyword}`);

      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payoad: error.response.data.message,
      });
    }
  };

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const { data } = await axios.get(`${server}/course/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseFail',
      payoad: error.response.data.message,
    });
  }
};
