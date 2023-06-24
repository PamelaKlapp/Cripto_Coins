import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useSelectCoins from '../Hooks/useSelectCoins';
import { coins } from '../data/coins';
import Error from './Error';

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #585bf8;
    cursor: pointer;
    color: #0a032c;
  }
`;

// eslint-disable-next-line react/prop-types
const Form = ({setCoins}) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [selectedCoin, SelectCoins] = useSelectCoins('Select Coin', coins);
  const [selectedCrypto, SelectCrypto] = useSelectCoins(
    'Select Crypto Coin',
    cryptos
  );

  useEffect(() => {
    const getAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const response = await fetch(url);
      const resultado = await response.json();

      const arrayCryptoData = resultado.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return object;
      });

      setCryptos(arrayCryptoData);
    };
    getAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([selectedCoin, selectedCrypto].includes('')) {
      setError(true);
    }
    setError(false);
    setCoins(
        {
            selectedCoin, selectedCrypto 
        }
    )
  };

  return (
    <>
      {error && <Error>All fiels are required</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCrypto />
        

        <InputSubmit type="submit" value="Quote" />
      </form>
    </>
  );
};

export default Form;
