import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { cardTexts } from '../../data/index'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    //useContext hook: easily access data from a React Context within a functional component. It provides a clean and efficient way to share values between components without the need for manual prop drilling at every level.

    return (
        <div className="main">
            <div className="nav">
                <div style={{ gap: '2px' }}>
                    <h3>Lyra</h3>
                    <p>Powered by Gemini</p>
                </div>
                <img src={assets.user_icon} />
            </div>
            <div className="main-container">
                {!showResult ? <>
                    <div className="greet">
                        <p>
                            <span>Hello, Dev!</span>
                        </p>
                        <p>
                            How can I help you today?
                        </p>
                    </div>
                    <div className="cards">
                        {cardTexts.map(({ id, text, img }) => (
                            <div onClick={() => {
                                onSent(text);
                            }} className="card" key={id}>
                                <p>{text}</p>
                                <img src={img} />
                            </div>
                        ))}
                    </div>
                </> :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>
                                {recentPrompt}
                            </p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />

                                </div>
                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}>
                                </p>
                            }

                        </div>
                    </div>
                }




                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSent();
                            }
                        }} 
                        value={input}
                        type='text' 
                        placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} />
                            <img src={assets.mic_icon} />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Lyra may display inaccurate info, including about people, so double check its responses
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main