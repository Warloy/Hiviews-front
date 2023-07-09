import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Stack, Avatar, Box, HStack, VStack, Divider, IconButton, Wrap } from 'native-base';
import TagCarousel from '../components/TimelineComponents/TagsCarousel';

import Container from '../components/Container';
import { colors } from '../styled-components/colors';

interface ProfilePageProps {
  navigation?: NavigationProp<any>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, tortor sed eleifend auctor, nisi arcu fringilla ex, in commodo leo enim nec dolor.";
  const [categoriesSelected, setCategoriesSelected] = useState([{ id: -1, name: 'Todo' }]);

  const handleCategories = (item: any) => {
    setCategoriesSelected([item]);
  };


  return (
    <ScrollView>
      <Container
        statusBarStyle='dark-content'
        navigation={navigation}
        statusBarColor={colors.white}
        backgroundTopColor={colors.white}
        backgroundBottomColor={colors.white}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          h='100%'
        >
          <Avatar
            size='2xl'
            source={{uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }}
          />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16 }}>
            John Doe
          </Text>
          <Text style={{ fontSize: 16, color: '#888', marginBottom: 16 }}>
            @johndoe
          </Text>

          <Text style={{ fontSize: 14, textAlign: 'center', marginBottom: 16 }}>
            {description}
          </Text>
          
          <TagCarousel
        tags={[
          { id: 1, name: 'Action' },
          { id: 2, name: 'Sci-Fi' },
          { id: 3, name: 'Adventure' },
          { id: 4, name: 'Drama' },
          { id: 5, name: 'Horror' },
          { id: 6, name: 'Thriller' },
        ]}
        handleCategories={handleCategories}
        getCategory={(value) => {
          return categoriesSelected.find((item) => item.name === value.name);
        }}
        selectedBadges={categoriesSelected}
      />

          <HStack justifyContent='space-between' px={4} py={2} bg='white' w='100%'>
            <VStack alignItems='center'>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>100</Text>
              <Text style={{ fontSize: 12, color: '#888' }}>Hilos</Text>
            </VStack>
            <VStack alignItems='center'>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>500</Text>
              <Text style={{ fontSize: 12, color: '#888' }}>Reseñas</Text>
            </VStack>
            <VStack alignItems='center'>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>1</Text>
              <Text style={{ fontSize: 12, color: '#888' }}>Seguidos</Text>
            </VStack>
            <VStack alignItems='center'>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>1000</Text>
              <Text style={{ fontSize: 12, color: '#888' }}>Seguidores</Text>
            </VStack>
          </HStack>

          <Divider my={4} w='90%'/>
          

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
          </View>
        </Stack>
      </Container>
    </ScrollView>
  );
}

export default ProfilePage;