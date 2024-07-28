import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import {server} from "../../redux/Store"
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { buySubscription } from '../../redux/actions/user';
import toast from "react-hot-toast";
import logo from "../../assets/images/logo.png"


const Subscribe = ({user}) => {
 
  const dispatch = useDispatch();
  const[key,setKey] = useState("");
   
  const {loading,error,subscriptionId} = useSelector(state=>state.subscription)
  const {error:courseError} = useSelector(state=>state.courses)

  const subscribeHandler =async()=>{
    
    const {data} = await axios.get(`${server}/razorpaykey`);
    setKey(data.key)
    dispatch(buySubscription());

  }

  useEffect(() => {
      
    if(error){
      toast.error(error);
      dispatch({type:"clearError"});
    }
    if(courseError){
      toast.error(courseError);
      dispatch({type:"clearError"});
    }

    if(subscriptionId){
      const openPopUp=()=>{
       const options={
        key,
        name:"Courseasy",
        description:"Get access to all premium courses",
        image:logo,
        subscription_id:subscriptionId,
        callback_url:`${server}/paymentverification`,
        prefill:{
          name:user.name, 
          email:user.email
        },
        notes:{
          address:"sidvid"
        },
        theme:{
          color:"#FFC800"
        }

       };
       const razor = new window.Razorpay(options);
       razor.open();
      }
      openPopUp();
    }

  }, [dispatch,error,user.name,user.email,key,subscriptionId,courseError])
  



  return (
    <Container h={'90vh'} p="16">
      <Heading children="Welcome" my={'8'} textAlign="center" />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg={'yellow.400'} p="4" css={{ borderRadius: '8px 8px 0 0' }}>
          <Text children={`Pro Pack - Rs 299.00`} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
            <Text
              children={`Join Pro Pack and Get Access to all the content`}
            ></Text>
            <Heading size={'md'} children={'Rs 299 Only'} />
          </VStack>
          <Button isLoading={loading} my={'8'} w="full" colorScheme={'yellow'} onClick={subscribeHandler}>
            Buy Now
          </Button>
        </Box>
        <Box bg={'blackAlpha.600'} p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            color={'white'}
            size={'sm'}
            textTransform="uppercase"
            children={'100% refund at cancellation'}
          />
          <Text
            fontSize={'xs'}
            color="white"
            children={'*Terms & Conditions Apply'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
