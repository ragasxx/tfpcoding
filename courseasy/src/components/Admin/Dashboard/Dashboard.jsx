import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';

const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading size={'sm'} children={title} />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={`${profit ? 0 : -value}%`}></Text>
      <Progress w={'full'} value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const DataBox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p={'8'}
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />

      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text children={'Since Last Month'} opacity={'0.5'} />
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, stats, usersCount, usersPercentage, usersProfit } =
    useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      {loading || !stats ? (
        <Loader />
      ) : (
        <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
          <Text
            textAlign={'center'}
            opacity={0.5}
            children={`Last Change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          ></Text>
          <Heading
            children="DashBoard"
            ml={['0', '16']}
            mb={'16'}
            textAlign={['center', 'left']}
          />
          <Stack
            direction={['column', 'row']}
            minH={'24'}
            justifyContent={'space-evenly'}
          >
            <DataBox
              title="Users"
              qty={usersCount}
              qtyPercentage={usersPercentage}
              profit={usersProfit}
            />
          </Stack>

          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children={'Views Graph'}
              pt={['8', '0']}
            />

            <LineChart usersArray={stats.map(item => item.users)} />
          </Box>

          <Box p={'4'}>
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              my={'8'}
              ml={['0', '16']}
              children="Progress Bar"
            />

            <Box>
              <Bar profit={usersProfit} title="Users" value={usersPercentage} />
            </Box>
          </Box>
        </Box>
      )}

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
