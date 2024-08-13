import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import React from 'react';

const buttonStyle = {
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    padding: "10px 20px",
    borderRadius: "15px",
    width: "240px",
}

const linkStyle = {
    ...buttonStyle,
    textDecoration: "none",
    fontFamily: "FlappyBird",
}

const textStyle = {
    color: "white",
    fontSize: "1.5rem",
    margin: "0",
    width: "100%"
}

const About: React.FC = () => {
    const { setPath } = useFlappyBirdContext();

    return (
        <div className='flex flex-col items-center' style={{ height: "100%", justifyContent: "space-evenly", overflow: "auto", padding: '20px', boxSizing: 'border-box', gap: "40px" }}>

            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>The CoNETian 1.0</p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Welcome to The CoNETian, where every tap unlocks the potential to mine and earn $CNTP!
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                As soon as you start playing, you begin mining and accumulating rewards.
                Spin the wheel for a chance to win even more $CNTP, and choose to take your winnings or go for double or nothing!
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                We're continuously adding exciting features, like box openings to win bigger prizes and more interactive gameplay elements.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Every day, 200k $CNTP are up for grabs through spinning and other in-game activities.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                CoNET is a DePIN project focused on Decentralization, Privacy, and Rewards.
                Utilizing our unique Layer Minus protocol, we replace traditional IP addresses with wallet addresses, ensuring complete privacy and security.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                At CoNET we also launched Silent Pass, an enhanced privacy tool, fast, and secure, as part of our commitment to protecting your online activities.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Check out CoNET platform and welcome to the new internet!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: "center", gap: "16px" }}>
                <a target="_blank" style={{ ...linkStyle, boxSizing: 'border-box' }} className='startButton' href='https://platform.conet.network'>Open Platform</a>

                <button onClick={() => setPath('/')} style={{ ...buttonStyle }}>
                    Main Menu
                </button>
            </div>
        </div>
    )
}

export default About;