import React, { useState, useEffect } from 'react';
import { Container, Heading, Image, Input, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import CourseCard from '../CourseCard/CourseCard';

const Courses = () => {
  const [keyword, setKeyword] = useState('');

  const { courses, loading, error, message } = useSelector(
    state => state.courses
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses(keyword));
  }, [dispatch, keyword, error, message]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY="8">
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        focusBorderColor="blue.400"
      />

      <Stack
        direction={['column', 'row']}
        marginTop={'16'}
        justifyContent={['center', 'space-between']}
        flexWrap="wrap"
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <CourseCard
              key={item._id}
              title={item.title}
              description={item.description}
              image={item.poster.url}
              id={item._id}
              creator={item.createdBy}
            />
          ))
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
