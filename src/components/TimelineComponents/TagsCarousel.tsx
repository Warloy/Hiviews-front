import React, { useEffect, useState } from 'react'

import { ScrollView, Stack } from 'native-base'

import { TTag } from '../../types'
import StyledBadge from './StyledBadge'

interface ITagCarousel {
  tags: TTag[]
  handleCategories: (item: TTag) => void
  getCategory: (item: TTag) => TTag | undefined
  selectedBadges: TTag[]
}

const TagCarousel = ({ tags, handleCategories, getCategory, selectedBadges }: ITagCarousel) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      minH={7}
      maxH={7}
    >
      {tags?.map((item, index) =>
        <Stack
          key={index}
          m={1}
        >
          <StyledBadge
            bold
            text={item?.name}
            w={100}
            px={0}
            value={getCategory(item)}
            onChangeValue={() => handleCategories(item)}
          />
        </Stack>
      )}
    </ScrollView>
  )
}

export default TagCarousel