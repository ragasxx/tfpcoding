import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.profile);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
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
  }, [dispatch, error, message]);

  return (
    <Container py={'16'} height={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          fontSize={['1.6rem', '3xl']}
          children="Forget Password"
          my={'16'}
          textTransform="uppercase"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'6'}>
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            type={'email'}
            focusBorderColor="blue.300"
          />
          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="blue"
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
