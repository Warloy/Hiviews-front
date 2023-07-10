import React from 'react';
import { NavigationProp } from '@react-navigation/native';

import Container from '../components/Container';
import { colors } from '../styled-components/colors';

import ThreadPost from '../components/ThreadComponents/ThreadPost';
import { TThread } from '../types';
import CommentSection from '../components/CommentComponents/CommentSection';

interface ThreadPageProps {
  navigation?: NavigationProp<any>;
  route?: any
}

const ThreadPage: React.FC<ThreadPageProps> = ({ navigation, route }) => {
  const thread:TThread = route.params.thread

  return (
      <Container
        statusBarStyle='dark-content'
        navigation={navigation}
        statusBarColor={colors.white}
        backgroundTopColor={colors.white}
        backgroundBottomColor={colors.white}
        hiddenNavBar={false}
      >
        <ThreadPost
            navigation={navigation}
            thread={thread}
        >
            
        <CommentSection
            navigation={navigation}
            listheight='33%'
        />
        </ThreadPost>
      </Container>
  );
}

export default ThreadPage;