import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Form from "./components/Form"
import ImageCrypto from './img/imagen-criptos.png'
import Result from "./components/Result"
import Spinner from "./components/Spinner"

const Container = styled.div`
  max-width: 980px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;}
`

const Header = styled.p`
  font-family: "Lato", sans-serif;
  color: #fff;
  width: 90%;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  
  &::after{
    content: '';
    width: 120px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;

`

function App() {

  const [coins, setCoins] = useState({})
  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
    if(Object.keys(coins).length > 0){
      
      const quoteCryto = async ()=>{
        setLoading(true)
        setQuote({})


        const {selectedCoin, selectedCrypto} = coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${selectedCrypto}&tsyms=${selectedCoin}`

        const response = await fetch(url)
        const result = await response.json()

        setQuote(result.DISPLAY[selectedCrypto][selectedCoin])

        setLoading(false)

      }

      quoteCryto()
    }
  },[coins])

  return (
    <>
    <Container>

      <Imagen src={ImageCrypto} alt="Cryto Image"></Imagen>
        
      <div> 

          <Header>Instant Cryptocurrency Trading</Header>
          <Form 
          setCoins = {setCoins}
          />
          {loading && <Spinner/> }
          {quote.PRICE && <Result quote={quote}/> }
          
        
      </div>
    
    </Container>
    </>
  )
}
 
export default App
