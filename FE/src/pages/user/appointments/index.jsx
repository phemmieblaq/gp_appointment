import React from 'react'
import { appointment } from './constant'
import CheckUpCard from '../../../components/card/checkUpCard'
import styled from 'styled-components'

const UpcomingAppointment = () => {
  return (
    <Wrapper>
      {appointment?.map((el, index) => (
        <CheckUpCard
        key={index}
        reason={el?.reason}
        address={el?.address}
        date={el?.date}
        time={el?.time}/>
      ))}
    </Wrapper>
  )
}

export default UpcomingAppointment

const Wrapper = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
gap:24px;`
