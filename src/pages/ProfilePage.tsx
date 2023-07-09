import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Avatar, Divider } from 'native-base';

import Container from '../components/Container';
import { colors } from '../styled-components/colors';

interface ProfilePageProps {
  navigation?: NavigationProp<any>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur, tortor sed eleifend auctor, nisi arcu fringilla ex, in commodo leo enim nec dolor.";

  return (
    <ScrollView>
      <Container
        statusBarStyle='dark-content'
        navigation={navigation}
        statusBarColor={colors.white}
        backgroundTopColor={colors.white}
        backgroundBottomColor={colors.white}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingTop: 16 }}>
          <Avatar
            size='lg'
            source={{uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}}
          />
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.gray3 }}>
              John Doe
            </Text>
            <Text style={{ fontSize: 16, color: colors.gray2 }}>
              @johndoe
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 14, textAlign: 'justify', marginHorizontal: 14, marginTop: 18, marginBottom: 14, color: colors.gray5 }}>
          {description}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => navigation?.navigate('ChangePasswPage')} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary}}>100</Text>
            <Text style={{ fontSize: 12, color: colors.gray3 }}>Hilos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Reseñas')} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary}}>500</Text>
            <Text style={{ fontSize: 12, color: colors.gray3 }}>Reseñas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Seguidos')} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary}}>1</Text>
            <Text style={{ fontSize: 12, color: colors.gray3 }}>Seguidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Seguidores')} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary}}>1k</Text>
            <Text style={{ fontSize: 12, color: colors.gray3 }}>Seguidores</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Favoritos')} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.secondary}}>1.7k</Text>
            <Text style={{ fontSize: 12, color: colors.gray3 }}>Favoritos</Text>
          </TouchableOpacity>
        </View>

        <Divider my={4} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Aquí puedes agregar más contenido si es necesario */}
        </View>
        
      </Container>
    </ScrollView>
  );
}

export default ProfilePage;
