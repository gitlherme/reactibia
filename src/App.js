import React from 'react'
import './App.css';
import axios from 'axios'


function App() {
  const [character, setCharacter] = React.useState('')

  const getData = async (name) => {
    const { data } = await axios.get(`https://api.tibiadata.com/v2/characters/${name}.json`)
    console.log(data)
    setCharacter(data.characters.data)
  }


  const handleCharacterChange = async e => {
    e.preventDefault()
    await getData(e.target[0].value)
  }

  const vocation = (vocation) => {
    const vocations = {
      'Elite Knight': '⚔️ Elite Knight',
      'Knight': '⚔️ Knight',
      'Royal Paladin': '🏹 Royal Paladin',
      'Paladin': '🏹 Paladin',
      'Elder Druid': '❄️ Elder Druid',
      'Druid': '❄️ Druid',
      'Master Sorcerer': '🔥 Master Sorcerer',
      'Sorcerer': '🔥 Sorcerer',
    }

    return vocations[vocation]
  }

  return (
    <div className="App bg-gray-50 h-screen w-full">
      <div className="flex flex-col h-full w-full p-10">
        <form className="grid grid-cols-12 gap-5" onSubmit={(e) => handleCharacterChange(e)}>

          <input 
            className="shadow-xl p-5 col-span-12 lg:col-span-11 rounded-md" 
            type="text" 
            placeholder="Procure por um personagem..."
          />

          <input 
            className="shadow-lg cursor-pointer p-5 col-span-12 lg:col-span-1 bg-blue-900 text-white rounded-md" 
            type="submit" 
            value="Procurar"
          />

        </form>
          { 
            character.name 
            ? 
              <div className="grid grid-cols-12 gap-5 mt-10">
                <div className="flex flex-col bg-white p-5 rounded-md shadow-xl col-span-12">
                { character.account_status === 'Premium Account' 
                  ? <span className="flex items-center justify-end text-gray-500">
                    🏆 Premium account 
                  </span>
                  : ''
                }
                { character.status === 'online' 
                  ? <span className="flex items-center justify-end text-green-500">🟢 Online</span> 
                  : <span className="flex items-center justify-end text-red-400">🔴 Offline</span> 
                }
                

                {character.sex === 'male' ? <span className="mb-2"> 🙎🏻‍♂️ {character.name} </span> : <span className="mb-2"> 🙎🏻‍♀️ {character.name} </span>  }
                <span className="mb-2">{vocation(character.vocation)}</span>
                <span className="mb-2"> 🔰 Level {character.level} </span> 
                { character.guild ? <span className="mb-2">💠 {character.guild.rank} na {character.guild.name}</span> : '' }
                <span className="mb-2"> 🌏 {character.world} </span> 
              </div>
              </div>
              
            : 
            <span className="col-span-12">Personagem não encontrado.</span> 
          }
          
        <small className="mt-5">Caso não conheça nenhum personagem, tente por nomes famosos como: Bobeek ou Goraca</small>
        </div>

      </div>
  );
}

export default App;
