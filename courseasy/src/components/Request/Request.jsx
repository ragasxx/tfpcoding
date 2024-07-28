import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
    setCourse('');
    setName('');
    setEmail('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, message, error]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading fontSize={['1.6rem', '3xl']} children="Request a Course" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type={'text'}
              focusBorderColor="blue.300"
              autoComplete="false"
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="blue.300"
              autoComplete="false"
            />
          </Box>

          <Box marginY={'4'}>
            <FormLabel htmlFor="course" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Type the course u want..."
              focusBorderColor="blue.300"
              autoComplete="false"
            />
          </Box>
          <Button isLoading={loading} my={'4'} colorScheme="blue" type="submit">
            Send Mail
          </Button>
          <Box my={'4'}>
            See Available Courses{'  '}
            <Link to="/courses">
              <Button colorScheme={'yellow'} variant="link">
                Check Out
              </Button>
            </Link>
            {'  '}
            Here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
