import React, { ReactNode, useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Stack, Text, HStack, VStack, Divider, Avatar } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ThreadList from "../MainComponents/Generic/ThreadList";
import ReviewList from "../MainComponents/Generic/ReviewList";
import UserList from "../MainComponents/Generic/UserList";
import StyledField from "../StyledField";

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type";
import { TThread, TReview } from "@/types/Post.Type";
import useLoading from "@/hooks/useLoading";
import useAuthContext from "@/hooks/useAuthContext";
import useCustomToast from "@/hooks/useCustomToast";
import useConnection from "@/hooks/useConnection";
import { useAppSelector } from "@/hooks/useRedux";
import { cutText } from "@/utils";
import ReviewService from "@/services/Review/Review.Service";
import UserService from "@/services/User/User.Service";
//static
//import reviews from "@/static/reviewsData";
//import threads from "@/static/threadsData";
//import users from "@/static/userData";

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
        <SearchTabs
          query={query}
        />
        {children}
      </Stack>
    </Stack>
  );
};

const Tabs = ({ index, reviews, threads, users }: { index: number, reviews?: TReview[], threads?: TThread[], users?: TUser[] }) => {
  if (index === 1) {
    return (
      <ReviewList
        reviews={reviews}
        listHeight="97%"
        disableLoadingIcon
      />
    );
  } else if (index === 2) {
    return (
      <ThreadList 
        threads={threads}
        listHeight="97%"
        disableLoadingIcon
      />
    );
  } else {
    return (
      <UserList 
        users={users}
        listHeight="97%"
        disableLoadingIcon
      />
    );
  }
};

const SearchTabs = ({ query="" }: { query?: string }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchPlaceholder, setSearchPlaceholder] = useState("Buscar reseñas...")
  const [searchPrompt, setSearchPrompt] = useState(query)
  const [found, setFound] = useState(false)

  const [reviews, setReviews] = useState<TReview[]>([]);
  const [threads, setThreads] = useState<TThread[]>([]);
  const [users, setUsers] = useState<TUser[]>([]);  
  const reviewAPI = new ReviewService();
  const userAPI = new UserService();

  const { isConnected } = useConnection();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  useFocusEffect(
    useCallback(() => {
      triggerSearch(activeTab);
    }, [])
  );

  const switchTab = ( index: number ) => {
    if (activeTab!=index) {
      console.log(`Switch to tab ${index}`)
      setActiveTab(index)
      setActiveSearch(false)
      triggerSearch(index)

      if (index === 1) {
        setSearchPlaceholder("Buscar reseñas...")
      } else if (index === 2) {
        setSearchPlaceholder("Buscar hilos...")
      } else {
        setSearchPlaceholder("Buscar usuarios...")
      }
    }
  }

  const triggerSearch = ( searchType: number ) => {
    if (searchPrompt!="") {
      if (searchType===1){
        getReviews()
      } else if (searchType===3){
        getUsers()
      }
    }
  }

  const getReviews = async () => {
    startLoading();
    try {
      setReviews([]);
      if (isConnected) {

        let newReviews: TReview[] = []

        const { data }: { data: TReview[] } = await reviewAPI.search(searchPrompt);
        setActiveSearch(true)
        
        if (data?.statusCode === 404 ) {
          setFound(false)
          console.log("Data not found")
          return
        }

        { data && data?.forEach(value => {
          return newReviews.push(value);
        });
        }
        setReviews(newReviews);
        setFound(true)
      } else {
        setReviews([]);
      }

      stopLoading();
    } catch (error: any) {
      console.log(error)
    }
  }

  const getUsers = async () => {
    startLoading();
    try {
      setReviews([]);
      if (isConnected) {

        let newUsers: TUser[] = []

        const { data }: { data: TUser[] } = await userAPI.search(searchPrompt);
        console.log(data)
        setActiveSearch(true)
        
        if (data?.statusCode === 404 ) {
          setFound(false)
          console.log("Data not found")
          return
        }

        { data && data?.forEach(value => {
          return newUsers.push(value);
        });
        }
        setUsers(newUsers);
        setFound(true)
      } else {
        setReviews([]);
      }

      stopLoading();
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <Stack
      alignItems="center"
    >
      <HStack>
        <HStack
          w="60%"
          justifyContent="space-evenly"
          justifyItems="space-around"
          alignItems="center"
          alignContent="center"
        >
          <StyledField
            placeholder={searchPlaceholder}
            value={searchPrompt}
            onChangeText={text => setSearchPrompt(text)}
            onSubmitEditing={() => triggerSearch(activeTab)}
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
                    triggerSearch(activeTab)
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
        <HStack
          w="30%"
          justifyContent="space-evenly"
          justifyItems="space-around"
          alignContent="center"
          alignItems="center"
        >
          <TouchableOpacity
            onPress={() => switchTab(1)}
            style={{ alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={activeTab === 1 ? "movie-open" : "movie-open-outline"}
              color={activeTab === 1 ? colors.primary : colors.gray0}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => switchTab(2)}
            style={{ alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={activeTab === 2 ? "forum" : "forum-outline"}
              color={activeTab === 2 ? colors.primary : colors.gray0}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => switchTab(3)}
            style={{ alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={activeTab === 3 ? "account-circle" : "account-circle-outline"}
              color={activeTab === 3 ? colors.primary : colors.gray0}
              size={25}
            />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <Divider mt={3} />
      <Stack>
        { activeSearch ? <>
            { found ? 
              <Tabs index={activeTab} 
                    reviews={reviews}
                    threads={threads}
                    users={users}
                    /> : 
              <>
                <VStack
                  mt={5}
                  alignContent="center"
                  alignItems="center"
                  space={2}
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