import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {
  const[name,setName]=useState(user.name);
  const[email,setEmail]=useState(user.email);

const dispatch = useDispatch();
const navigate = useNavigate();
const submitHandler = async(e)=>{
  e.preventDefault();
  await dispatch(updateProfile(name,email));
  dispatch(loadUser());
  navigate("/profile")
}

  return (
    <Container py={"16"} minH="90vh">
      <form onSubmit={submitHandler}>
        <Heading
          textTransform={'uppercase'}
          children="Update Profile"
          my={"16"}
          textAlign={['center', 'left']}
        />
        <VStack spacing={"8"}>
        <Input
          required
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          focusBorderColor="yellow.500"
        />
        <Input
          required
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          focusBorderColor="yellow.500"
        />
        <Button w={"full"} colorScheme={"yellow"} type="submit">
           Update
        </Button>
        </VStack>
      </form>
      
       
    </Container>
  )
}

export default UpdateProfile