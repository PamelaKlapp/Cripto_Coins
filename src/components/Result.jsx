/* eslint-disable react/prop-types */
import styled from "@emotion/styled"

const ResultContainer = styled.div`
    font-family: 'Lato',sans-serif;
    color: #fff;
    display: flex;
    align-items: start;
    gap: 1rem;
    margin-top: 30px;

    
`

const ResultText = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
    
`
const ResultPrice = styled.p`
    font-size: 30px;
    span{
        font-weight: 700;
    }
   
`
const ResultImg = styled.img`
    display: block;
    width: 120px;

`

// eslint-disable-next-line react/prop-types
const Result = ({quote}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = quote


  return (
    <>
        <ResultContainer>
            <ResultImg src={`https://www.cryptocompare.com${IMAGEURL}`} alt="crypto" />
            <div>
                <ResultPrice>The Price is: <span>{PRICE}</span></ResultPrice>
                <ResultText>the highest price of the day: <span>{HIGHDAY}</span></ResultText>
                <ResultText>The lowest price of the day: <span>{LOWDAY}</span></ResultText>
                <ResultText>The variation last 24 hours: <span>{CHANGEPCT24HOUR}</span></ResultText>
                <ResultText>Last update: <span>{LASTUPDATE}</span></ResultText>
            </div>
        </ResultContainer>
    </>
  )
}

export default Result