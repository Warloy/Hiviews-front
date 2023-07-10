import React from 'react';
import { NavigationProp } from '@react-navigation/native';

import Container from '../components/Container';
import ReviewPost from '../components/ReviewComponents/ReviewPost';
import { colors } from '../styled-components/colors';
import { TReview } from '../types';
import CommentSection from '../components/CommentComponents/CommentSection';
import { Stack } from 'native-base';

interface ReviewPageProps {
  navigation?: NavigationProp<any>;
  route?: any
}

const ReviewPage: React.FC<ReviewPageProps> = ({ navigation, route }) => {
  const review:TReview = route.params.review

  return (
      <Container
        statusBarStyle='dark-content'
        navigation={navigation}
        statusBarColor={colors.white}
        backgroundTopColor={colors.white}
        backgroundBottomColor={colors.white}
        hiddenNavBar={false}
      >
        <ReviewPost 
            navigation={navigation}
            review={review}
        >
          <CommentSection
              navigation={navigation}
              listheight='60%'
          />
        </ReviewPost>
      </Container>
  );
}

export default ReviewPage;