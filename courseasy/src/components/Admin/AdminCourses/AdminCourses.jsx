import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures} from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import {toast} from "react-hot-toast";

const AdminCourses = () => {
  
  const {courses,lectures} = useSelector(state=>state.courses);
  const {loading,error,message} = useSelector(state=>state.admin);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const dispatch = useDispatch();

  const[courseId,setCourseId] = useState("");
  const[courseTitle,setCourseTitle] = useState("");

  const courseDetailsHandler = (courseId,title) => {
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
    dispatch(getCourseLectures(courseId));
  };

  const deleteButtonHandler = courseId => {
       dispatch(deleteCourse(courseId))
  };

  const deleteLectureButtonHandler = async(courseId, lectureId) => {
      await dispatch(deleteLecture(courseId,lectureId));
      dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async(e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title",title);
    myForm.append("description",description);
    myForm.append("file",video);
   await  dispatch(addLecture(courseId,myForm));
   dispatch(getCourseLectures(courseId));
  };

 

  useEffect(() => {
    dispatch(getAllCourses());
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
  }, [dispatch,message,error])
  

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '8']} overflowX="auto"> 
        <Heading
          children="All Courses"
          size={'xl'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
          my={'8'}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>poster</Th>
                <Th>title</Th>
                <Th>category</Th>
                <Th>creator</Th>
                <Th isNumeric>views</Th>
                <Th isNumeric>lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses &&
                courses.map(item => (
                  <Row
                    key={item._id} 
                    item={item}
                    loading={loading}
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                   
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteLectureButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

function Row({loading, item, courseDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
          isLoading={loading}
            onClick={() => courseDetailsHandler(item._id,item.title)}
            children="View Lectures"
            variant={'outline'}
            colorScheme="purple.500"
          ></Button>
          <Button isLoading={loading} onClick={() => deleteButtonHandler(item._id)}>
            <RiDeleteBin7Fill color="purple.600" />
          </Button>{' '}
        </HStack>
      </Td>
    </Tr>
  );
}

export default AdminCourses;
