import React, { useState,useEffect } from 'react';
import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getAllCourses } from '../../redux/actions/course';
import {toast} from "react-hot-toast";
import { addToPlaylist } from '../../redux/actions/profile';
import {loadUser} from '../../redux/actions/user'

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        size={'sm'}
        textAlign={['center', 'left']}
        maxWidth="200px"
        fontFamily={'sans-serif'}
        noOfLines="3"
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform="uppercase"
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform="uppercase"
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectures- ${lectureCount}`}
        textTransform="uppercase"
      />
      <Heading
        size="xs"
        children={`Views- ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
        isLoading={loading}
          variant={'ghost'}
          colorScheme={'yellow'}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const {courses,loading,error,message} = useSelector(state=>state.courses);

  const dispatch = useDispatch();

  useEffect(() => {

    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
     
  dispatch(getAllCourses(keyword,category)); 

  }, [dispatch,keyword,category,error,message]);
  

  const addToPlaylistHandler = async(courseId) => {
    console.log('added to playlist',courseId);
    await dispatch(addToPlaylist(courseId))
    dispatch(loadUser());
  };

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures and Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY="8">
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        focusBorderColor="yellow.500"
      />
      <HStack display={'flex'} justifyContent="space-evenly" paddingY={'8'}>
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minWidth={'60'}>
            <Text children={item}></Text>
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
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
