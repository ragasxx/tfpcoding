import { Button, Container, Heading, VStack, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();

  console.log(params.token);

  const { loading, error, message } = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
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
          children="Reset Password"
          fontSize={['1.6rem', '3xl']}
          my={'16'}
          textTransform="uppercase"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'6'}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="blue.300"
          />
          <Button
            isLoading={loading}
            type="submit"
            w={'full'}
            colorScheme="blue"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
