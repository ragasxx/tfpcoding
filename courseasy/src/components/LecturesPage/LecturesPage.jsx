import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import LectureAccordion from '../Accordion/Accordion';
import { Box, Heading } from '@chakra-ui/react';

const LecturesPage = () => {
  const { lectures } = useSelector(state => state.courses);

  const dispatch = useDispatch();
  const params = useParams();

  let { state } = useLocation();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  return (
    <Box minH={'100vh'} p={['2', '28']} mt={['16', '2']}>
      {lectures.length > 0 && (
        <Heading p={['3', '6']} fontSize={['xl', '3xl']} fontFamily={'cursive'}>
          {state.title}
        </Heading>
      )}
      {lectures.length > 0 ? (
        lectures.map(lecture => (
          <LectureAccordion
            key={lecture._id}
            title={lecture.title}
            description={lecture.description}
          />
        ))
      ) : (
        <Heading
          textAlign={'center'}
          mt={'44'}
          fontSize={['lg']}
          lineHeight={'10'}
          letterSpacing={'wide'}
        >
          {`Oops!! No Lectures out yet for ${state.title}`}
        </Heading>
      )}
    </Box>
  );
};

export default LecturesPage;
