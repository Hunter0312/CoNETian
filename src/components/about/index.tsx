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
        <div className='flex flex-col justify-between items-center' style={{ height: "100%" }}>
            <div style={{ marginTop: "15rem" }}>
                <p style={{ color: "white", fontSize: "2rem", marginBottom: "5px" }}>CoNETian 1.0</p>
                <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "5px", textAlign: "center" }}>Welcome to The CoNETian. <br />Keep playing to keep earning CNTP.</p>
            </div>
            <button onClick={() => setPath('/')} style={{ ...buttonStyle, marginBottom: "5rem" }}>
                Main Menu
            </button>
        </div>
    )
}

export default About;