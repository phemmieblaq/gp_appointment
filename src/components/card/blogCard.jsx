import React from 'react'
import styled from 'styled-components'
import blogImage from '../../assets/images/blogImage.png'

const BlogCard = ({time='9 mins read'}) => {
  return (
    <div>
        <Wrapper>
            <ImageWrapper>
                <img src={blogImage} alt="" />
            </ImageWrapper>
            <LowerContainer>
            <Heading>
            Symptoms and how to treat diabetes
        </Heading>
        <Content>
        Diabetes is a chronic condition that affects millions of people worldwide. It is characterized by high levels of sugar in the blood, which can lead to various health complications if left untreated.
        </Content>
        <DateWrapper>
            <TimeWrapper>
               <Circle/>
                <Time>{time}</Time>


            </TimeWrapper>
       </DateWrapper>
       </LowerContainer>


        </Wrapper>

      
    </div>
  )
}

export default BlogCard

const Wrapper = styled.div`
max-width: 368px;

display: flex;
flex-direction: column;
justify-content: center;
border-radius: 8px
border: 1px solid #E7E6E9;
box-shadow: 0px 2px 4px -1px #0000001A;




`
const ImageWrapper = styled.div`
width: 100%;
max-height: 230px;

`
const Heading = styled.h3`
font-family: Inter;
font-size: 18px;
font-weight: 500;
line-height: 21.78px;
text-align: left;
color: #292D32;
margin-bottom: 8px;
`;


const Content = styled.p`
font-family: Inter;
font-size: 16px;
font-weight: 400;
line-height: 19.36px;
text-align: left;
margin-bottom: 16px;

`
const DateWrapper = styled.div`
display:flex;
max-width:215px;
align-items: center;
justify-content: space-between;
`
const TimeWrapper = styled.div`
display:flex;
gap:8px;
align-items: center;
justify-content: center;
`

const Time = styled.h4`
font-family: Inter;
font-size: 12px;
font-weight: 400;
line-height: 14.52px;
text-align: left;
`
const Circle = styled.div`
height: 4px;
width: 4px;
border-radius: 50%;`

const LowerContainer = styled.div`
width: 100%;
padding:16px;`