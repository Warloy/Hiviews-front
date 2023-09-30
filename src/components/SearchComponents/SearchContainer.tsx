import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Stack, Text, HStack, VStack, Divider, Avatar } from "native-base";

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type";
import useLoading from "@/hooks/useLoading";
import reviews from "@/static/reviewsData";
import threads from "@/static/threadsData";
import users from "@/static/userData";
import useAuthContext from "@/hooks/useAuthContext";
import { cutText } from "@/utils";
import { useAppSelector } from "@/hooks/useRedux";
import ThreadList from "../MainComponents/Generic/ThreadList";
import ReviewList from "../MainComponents/Generic/ReviewList";
import UserList from "../MainComponents/Generic/UserList";
import StyledField from "../StyledField";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface ISearchContainerProps {
  query?: string;
  children?: ReactNode;
}

const SearchContainer = ({ query, children }: ISearchContainerProps) => {
  const router = useRouter();

  return (
    <Stack
      bgColor={colors.white}
      minH="100%"
    >
      <Stack
        my={5}
        w="100%"
      >
        <ProfileTabs
          query={query}
        />
        {children}
      </Stack>
    </Stack>
  );
};

const Tabs = ({ index }: { index: number }) => {
  if (index === 1) {
    return (
      <ReviewList
        reviews={reviews}
        listHeight="89%"
      />
    );
  } else if (index === 2) {
    return (
      <ThreadList 
        threads={threads}
        listHeight="89%"
      />
    );
  } else {
    return (
      <UserList 
        users={users}
        listHeight="89%"
      />
    );
  }
};

const ProfileTabs = ({ query="" }: { query?: string }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchType, setSearchType] = useState(1)
  const [searchPlaceholder, setSearchPlaceholder] = useState("Buscar reseñas...")
  const [searchPrompt, setSearchPrompt] = useState(query)
  const [found, setFound] = useState(false)

  useEffect (()=>{
    triggerSearch()
  },[])

  const switchTab = ( index: number ) => {
    if (activeTab!=index) {
      setActiveTab(index)
      setSearchType(index)
      setActiveSearch(false)
      setSearchPrompt("")

      if (index === 1) {
        setSearchPlaceholder("Buscar reseñas...")
      } else if (index === 2) {
        setSearchPlaceholder("Buscar hilos...")
      } else {
        setSearchPlaceholder("Buscar usuarios...")
      }
    }
  }

  const triggerSearch = () => {
    if (searchPrompt!="") {
      setActiveSearch(true)
      setFound(true)
    }
  }

  return (
    <Stack
      alignItems="center"
    >
      <HStack
        w="80%"
        justifyContent="space-evenly"
        justifyItems="space-around"
        alignContent="center"
        alignItems="center"
        space={6}
      >
        <TouchableOpacity
          onPress={() => switchTab(1)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <MaterialCommunityIcons
              name={activeTab === 1 ? "movie-open" : "movie-open-outline"}
              color={activeTab === 1 ? colors.primary : colors.secondary}
              size={25}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: activeTab === 1 ? colors.secondary : colors.gray0
              }}
            >
              Reseñas
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchTab(2)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <MaterialCommunityIcons
              name={activeTab === 2 ? "forum" : "forum-outline"}
              color={activeTab === 2 ? colors.primary : colors.secondary}
              size={25}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: activeTab === 2 ? colors.primary : colors.gray0
              }}
            >
              Hilos
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchTab(3)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <MaterialCommunityIcons
              name={activeTab === 3 ? "account-circle" : "account-circle-outline"}
              color={activeTab === 3 ? colors.primary : colors.secondary}
              size={25}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: activeTab === 3 ? colors.primary : colors.gray0
              }}
            >
              Usuarios
            </Text>
          </VStack>
        </TouchableOpacity>
      </HStack>
      <HStack
        mt={2}
        w="80%"
        justifyContent="space-evenly"
        justifyItems="space-around"
        alignItems="center"
        alignContent="center"
      >
        <StyledField
          placeholder={searchPlaceholder}
          borderColor={colors.primary}
          borderWidth={1}
          value={searchPrompt}
          onChangeText={text => setSearchPrompt(text)}
          onSubmitEditing={() => triggerSearch()}
          w="90%"
          InputRightElement={
            <Stack
              pr={2}
              h='full'
              justifyContent='center'
              alignItems='center'
            >
              <TouchableOpacity
                onPress={()=>{
                  console.log("Search button pressed")
                  triggerSearch()
                }}
              >
                <Ionicons
                  name="search"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Stack>
          }
        />
      </HStack>
      <Divider my={4} />
      <Stack>
        { activeSearch ? <>
            { found ? 
              <Tabs index={activeTab} /> : 
              <>
                <VStack
                  alignContent="center"
                  alignItems="center"
                  space={4}
                >
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    color={colors.gray0}
                    size={50}
                  />
                  <Text
                    fontSize={18}
                    color={colors.gray5}
                  >
                    No se encontraron resultados.
                  </Text>
                </VStack>
              </>
            }
          </>
          :
          <>
          </>
        }
      </Stack>
    </Stack>
  );
};

export default SearchContainer