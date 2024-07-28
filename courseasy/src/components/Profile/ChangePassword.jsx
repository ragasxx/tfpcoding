import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { changePassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, error, message } = useSelector(state => state.profile);

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
    <Container py={'16'} minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          fontSize={['1.6rem', '3xl']}
          textTransform={'uppercase'}
          children="Change Password"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            type="password"
            focusBorderColor="blue.300"
          />
          <Input
            required
            placeholder="Enter New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            type="password"
            focusBorderColor="blue.300"
          />
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme={'blue'}
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
