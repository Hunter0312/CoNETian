import { Button } from "@/components/button";
import { FlexDiv } from "@/components/div";
import MiningStatus from "@/components/miningStatus";
import { P } from "@/components/p";
import { formatToken, slice } from "@/utilitiy/functions";
import { Img } from "@/utilitiy/images";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaCheck } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import { fetchImportWallet, fetchstopMining } from "@/API/getData";
import { ConfirmToast } from "react-confirm-toast";
import { toast } from "react-toastify";

export default function Wallet() {
  const [newWallet, setNewWallet] = useState<string>("");

  const { setRouter, profile, miningErrorTimeout, setMining, setProfile } =
    useGameContext();
  const [walletAddr, setWalletAddr] = useState<boolean>(false);
  const [privateK, setPrivateK] = useState<boolean>(false);
  const [isImportingWallet, setIsImportingWallet] = useState<boolean>(false);
  const [showImportWalletConfirmModal, setShowImportWalletConfirmModal] =
    useState<boolean>(false);

  const copyText = (text: string, type: string) => {
    copy(text);
    if (type === "walletAddress") {
      if (!walletAddr) setWalletAddr(true);
      return;
    }
    if (type === "walletPrivateKey") {
      if (!privateK) setPrivateK(true);
      return;
    }
  };

  useEffect(() => {
    if (walletAddr) {
      setTimeout(() => {
        setWalletAddr(false);
      }, 4000);
    }
  }, [walletAddr]);

  useEffect(() => {
    if (privateK) {
      setTimeout(() => {
        setPrivateK(false);
      }, 4000);
    }
  }, [privateK]);

  const handleImportWalletButton = () => {
    if (newWallet) {
      setShowImportWalletConfirmModal(true);
    } else {
      toast.error("Please enter a private key");
    }
  };

  const handleImportWalletConfirm = async () => {
    setIsImportingWallet(true);

    if (newWallet) {
      const stopMiningResult = await fetchstopMining(profile?.keyID);

      if (stopMiningResult && !stopMiningResult?.error) {
        miningErrorTimeout.current && clearTimeout(miningErrorTimeout.current);
        setMining(false);

        const importResult = await fetchImportWallet(newWallet);
        if (importResult && !importResult?.error) {
          setProfile(importResult);
          setNewWallet("");
          toast.success("Import Successful!");
        } else {
          toast.error(importResult?.message);
        }
      } else {
        toast.error("Failed to stop mining to import wallet");
      }
    } else {
      toast.error("Please enter a private key");
    }

    setIsImportingWallet(false);
  };

  return (
    <>
      <FlexDiv $direction="column" $gap="32px" $margin="32px 16px 140px 16px">
        <MiningStatus />

        <FlexDiv $direction="column" $align="flex-start" $width="100%">
          <Button onClick={() => setRouter("/")}>
            <FlexDiv $align="center">
              <Image width={32} height={32} alt="Arrow" src={Img.ArrowImg} />
              <P $fontSize="32px" $color="#F6F1F2">
                My Wallet
              </P>
            </FlexDiv>
          </Button>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="12px" $width="100%">
          <FlexDiv $gap="8px" $align="center">
            <Image src={Img.LogoImg} width={32} height={32} alt="Conet" />
            <P $fontSize="24px">Current balance</P>
          </FlexDiv>
          <FlexDiv $gap="8px" $align="center" $justify="space-between">
            <P $fontSize="28px">
              {profile ? (
                formatToken(profile?.tokens?.cCNTP?.balance)
              ) : (
                <Skeleton width={200} />
              )}
            </P>
            <P $fontSize="12px">CNTP EARNED</P>
          </FlexDiv>
        </FlexDiv>

        <FlexDiv $direction="column" $gap="8px" $width="100%">
          <FlexDiv
            $direction="column"
            $gap="16px"
            $height="200px"
            $width="100%"
            $padding="14px 24px"
            $border="1px solid rgba(255, 255, 255, .1)"
            $radius="16px"
          >
            <P $fontSize="24px">Your CoNETian Wallet</P>
            <FlexDiv $direction="column" $gap="16px">
              <FlexDiv $direction="column" $gap="12px">
                <P $color="#C8C6C8">Wallet Address</P>
                <FlexDiv $padding="0 16px" $justify="space-between">
                  <P>
                    {slice(profile?.keyID)}
                    {!profile?.keyID && <Skeleton width={100} />}
                  </P>
                  <Button
                    onClick={() => copyText(profile?.keyID, "walletAddress")}
                  >
                    {walletAddr ? (
                      <FaCheck />
                    ) : (
                      <Image
                        height={24}
                        width={24}
                        alt="Copy"
                        src={Img.CopyImg}
                      />
                    )}
                  </Button>
                </FlexDiv>
              </FlexDiv>
              <FlexDiv $direction="column" $gap="12px">
                <P $color="#C8C6C8">Private key</P>
                <FlexDiv $padding="0 16px" $justify="space-between">
                  <P>
                    {slice(profile?.privateKeyArmor)}
                    {!profile?.privateKeyArmor && <Skeleton width={100} />}
                  </P>
                  <Button
                    onClick={() =>
                      copyText(profile?.privateKeyArmor, "walletPrivateKey")
                    }
                  >
                    {privateK ? (
                      <FaCheck />
                    ) : (
                      <Image
                        height={24}
                        width={24}
                        alt="Copy"
                        src={Img.CopyImg}
                      />
                    )}
                  </Button>
                </FlexDiv>
              </FlexDiv>
            </FlexDiv>
          </FlexDiv>
          <FlexDiv $gap="8px" $align="center" $padding="0 0 0 24px">
            <P $fontSize="14px" $color="#C8C6C8">
              Your inviter:
            </P>
            <P $fontSize="12px">
              {slice(profile?.referrer)}
              {!profile?.keyID && <Skeleton width={100} />}
            </P>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv $direction="column" $gap="18px">
          <FlexDiv $direction="column" $gap="8px">
            <P $fontSize="24px">Import Another Wallet</P>
            <P $color="#C8C6C8">
              Import a wallet from CoNET platform into CoNETian for easier
              management and boosted benefits!
            </P>
          </FlexDiv>
          <input
            value={newWallet}
            onChange={(e) => setNewWallet(e.target.value)}
            placeholder="Enter Private Key"
            style={{
              padding: "14px 16px",
              fontSize: "16px",
              background: "rgba(99, 99, 99, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
            }}
          />
          <Button
            $padding="18px"
            $radius="32px"
            $border="1px solid #04DAE8"
            onClick={isImportingWallet ? () => {} : handleImportWalletButton}
            disabled={isImportingWallet}
          >
            Import Wallet
          </Button>
        </FlexDiv>
      </FlexDiv>
      <FlexDiv $justify="center" $align="center">
        <ConfirmToast
          toastText={
            "If you import a new wallet, you will lose your current one. Are you sure you want to continue?"
          }
          buttonNoText="No"
          buttonYesText="Yes"
          showCloseIcon={false}
          asModal={true}
          customFunction={handleImportWalletConfirm}
          setShowConfirmToast={setShowImportWalletConfirmModal}
          showConfirmToast={showImportWalletConfirmModal}
          buttonYesAttributes={{
            style: {
              backgroundImage: "linear-gradient(to right, #D775FF, #8DA8FF)",
            },
          }}
          buttonNoAttributes={{
            style: { border: "1px solid black" },
          }}
          className="confirm-toast-style"
        />
      </FlexDiv>
    </>
  );
}
