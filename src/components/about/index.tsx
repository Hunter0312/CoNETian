import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import React from 'react';

const buttonStyle = {
    border: "0",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    padding: "10px 20px",
    borderRadius: "15px",
    width: "240px"
}

const About: React.FC = () => {
    const { setPath } = useFlappyBirdContext();

    return (
        <div className='flex flex-col justify-center items-center' style={{ height: "100%", gap: "40px" }}>
            <div>
                <p style={{ color: "white", fontSize: "2rem", marginBottom: "5px" }}>CoNETian 1.0</p>
                <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "5px", textAlign: "center" }}>Welcome to The CoNETian. <br />Keep playing to keep earning CNTP.</p>
            </div>
            <button onClick={() => setPath('/')} style={{ ...buttonStyle }}>
                Main Menu
            </button>
        </div>
    )
}

export default About;