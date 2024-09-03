'use client'

import { FlexDiv } from "@/components/div";
import MiningStatus from "@/components/miningStatus";
import { P } from "@/components/p";
import Image from "next/image";

import conetAnonymousIcon from '@/assets/conet-anonymous-icon.svg'
import { useState } from "react";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import BackButton from "@/components/backButton";

export default function Profile() {
    const { setRouter, highScore } = useGameContext();
    const [name, setName] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBio = e.target.value;

        if (newBio.length > 140) {
            setError('* The number of characters exceeded the limit.');
        } else {
            setError('');
        }

        setBio(newBio.slice(0, 140));
    };

    return (
        <FlexDiv $direction="column" $gap="32px" $margin="32px 0 0 0">
            <MiningStatus />
            <BackButton text="My Profile" />
            <FlexDiv $padding="0 16px">
                <FlexDiv $justify="space-between" $align="flex-start" $width="100%">
                    <Image src={conetAnonymousIcon} height={120} width={120} alt="profile-logo" />
                    <FlexDiv $direction="column" $justify="space-between">
                        <input placeholder="Anonymous User" value={name} onChange={(e) => setName(e.target.value)} style={{ backgroundColor: 'transparent', border: '1px solid #FFFFFF1A', borderRadius: '16px', height: '56px', padding: '12px 14px', marginBottom: '28px' }} />
                        <FlexDiv>
                            <FlexDiv $direction="column"
                                $padding="0 12px"
                                style={{
                                    borderRight: '1px solid',
                                    borderImageSource: 'linear-gradient(to bottom, rgba(121, 248, 255, 0) 0.47%, #79F8FF 50.82%, #D775FF 76%, rgba(215, 117, 255, 0) 101.18%)',
                                    borderImageSlice: 1,
                                    borderWidth: '0 1px 0 0',
                                }}
                            >
                                <P $color="#929092" $fontSize="12px" style={{ lineHeight: '28px' }}>Highest Score</P>
                                <P $fontSize="20px">{highScore}</P>
                            </FlexDiv>
                            <FlexDiv $direction="column" $padding="0 16px">
                                <P $color="#929092" $fontSize="12px" style={{ lineHeight: '28px' }}>World Ranking</P>
                                <P $fontSize="20px">4.614</P>
                            </FlexDiv>
                        </FlexDiv>

                    </FlexDiv>
                </FlexDiv>
            </FlexDiv>
            <FlexDiv $padding="0 16px" $direction="column">
                <P $fontSize="24px" style={{ marginBottom: '16px', lineHeight: '32px', letterSpacing: '0.1px' }}>My Bio</P>
                <textarea
                    placeholder="Add a bio to share a little bit about yourself."
                    value={bio}
                    onChange={handleChange}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #FFFFFF1A',
                        borderRadius: '16px',
                        height: '160px',
                        padding: '14px',
                        width: '100%',
                        resize: 'none',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                    }}
                />
                {error && <P $color="#FFDAD6" $fontSize="10px" style={{ lineHeight: '12px' }}>{error}</P>}
            </FlexDiv>
            <FlexDiv $padding="0 16px" $direction="column" $gap="16px">
                <P $fontSize="24px" style={{ lineHeight: '32px', letterSpacing: '0.1px' }}>My Achievements</P>
                <P $fontSize="20px" style={{ lineHeight: '16px' }}>1645.000645 CNTP EARNED</P>
            </FlexDiv>
        </FlexDiv>
    )
}