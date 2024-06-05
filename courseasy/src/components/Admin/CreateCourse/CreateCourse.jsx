import React, { useState,useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import {toast} from "react-hot-toast";

const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',

  backgroundColor: '#D6BCFA',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures and Algorithms',
    'App Development',
    'Data Science',
    'Game Development',
  ];
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const {loading,message,error} = useSelector(state=>state.admin);
  
  useEffect(() => {

    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
  }, [dispatch,error,message]);
  

  const submitHandler = (e)=>{
     e.preventDefault();
     const formdata = new FormData();
     formdata.append("title",title);
     formdata.append("description",description);
     formdata.append("createdBy",createdBy);
     formdata.append("category",category);
     formdata.append("file",image);
     dispatch(createCourse(formdata));
  }

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading
            children="Create Course"
            textAlign={['center', 'left']}
            my={'16'}
          />

          <VStack spacing={'8'} m={'auto'}>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              placeholder="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              placeholder="Creator name"
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              type="text"
              focusBorderColor="purple.300"
            />

            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Select Category"
            >
              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type={'file'}
              focusBorderColor="purple.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} objectFit="contain" boxSize={'60'} />
            )}

            <Button isLoading={loading} w={'full'} colorScheme="purple" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
