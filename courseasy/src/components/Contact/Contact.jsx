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
import { contactUs } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const {
    loading,
    error,
    message: contactMessage,
  } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (contactMessage) {
      toast.success(contactMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, contactMessage, error]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading fontSize={['1.6rem', '3xl']} children="Contact Us" />
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
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message"
              focusBorderColor="blue.300"
              autoComplete="false"
            />
          </Box>
          <Button isLoading={loading} my={'4'} colorScheme="blue" type="submit">
            Send Mail
          </Button>
          <Box my={'4'}>
            Request for a course?{'  '}
            <Link to="/request">
              <Button colorScheme={'yellow'} variant="link">
                Request
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

export default Contact;
