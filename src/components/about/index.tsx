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

            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>
                Welcome to The CoNETian!
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                The CoNETian isn't just a game – it's your gateway to joining the revolutionary CoNET ecosystem.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                We've developed this mining mini-game on Telegram as an innovative way to let everyone participate in our decentralized network.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Why did we build this game?
                We created The CoNETian to make it easy for anyone, anywhere in the world, to join our project.
                By playing this game, you’re not just having fun – you’re actively participating in a decentralized future.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                The CoNETian uses Blockchain technology for rewards distribution, emphasizing our commitment to decentralization.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                As you play, you’ll start mining and earning $CNTP.
                We’re also introducing exciting features like box openings for bigger prizes and more interactive gameplay.
                Every day, 200k $CNTP are up for grabs through spinning and other in-game activities.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                This isn’t just about rewards – it’s about giving you a chance to be part of something bigger.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Soon, this game will allow players to mine in our DePIN network simply by sharing bandwidth, all while enjoying the gameplay.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                What’s Next?
                As we prepare to launch our main-net, The CoNETian will evolve, allowing users to contribute to and benefit from our decentralized infrastructure just by playing and sharing their bandwidth.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                No complicated setups – just your mobile device and the game.
            </p>

            <p style={{ color: "white", fontSize: "2rem", margin: 0 }}>
                About CoNET:
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                CoNET is a DePIN project focused on Decentralization, Privacy, and Rewards. Our unique Layer Minus protocol replaces traditional IP addresses with wallet addresses, ensuring your online activities remain private and secure.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Additionally, we've launched Silent Pass, a fast and secure privacy tool, as part of our commitment to protecting your online presence.Join us in building the future of the internet – decentralized, secure, and rewarding.
            </p>

            <p style={{ ...textStyle, textAlign: "left" }}>
                Welcome to The CoNETian and the new era of online participation!
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