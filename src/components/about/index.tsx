import { useFlappyBirdContext } from '../../providers/FlappyBirdProvider';
import React from 'react';

const About: React.FC = () => {

    const { setPath } = useFlappyBirdContext();

    return (
        <div className='flex flex-col justify-between items-center' style={{ height: "100%" }}>
            <div style={{marginTop: "15rem"}}>
                <p style={{ color: "white", fontSize: "2rem", marginBottom: "5px" }}>CoNETian 1.0</p>
                <p style={{ color: "white", fontSize: "1.5rem", marginBottom: "5px", textAlign: "center" }}>Welcome to be CoNETian to keep <br />MINING & ENJOYING</p>
            </div>
            <button onClick={() => setPath('/')} style={{ color: "white", padding: 0, backgroundColor: "transparent", border: 0, fontFamily: "FlappyBird", fontSize: "2.5rem", marginBottom: "4rem" }}>
                Main Menu
            </button>
        </div>
    )
}

export default About;