import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading
          fontSize={['1.6rem', '3xl']}
          children={'Welcome to TFP Coding'}
        />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
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
              autoComplete="off"
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="*******"
              type={'password'}
              focusBorderColor="blue.300"
            />
          </Box>
          <Box marginY={'4'}>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant="link">
                Forget Password
              </Button>
            </Link>
          </Box>
          <Button my={'4'} colorScheme={'blue'} type="submit">
            Login
          </Button>
          <Box my={'4'}>
            New User?{'  '}
            <Link to="/register">
              <Button colorScheme={'yellow'} variant="link">
                SignUp
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

export default Login;
