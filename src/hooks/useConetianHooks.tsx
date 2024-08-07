import { useEffect, useState } from "react";
import { useFlappyBirdContext } from "../providers/FlappyBirdProvider";
import { EasyConetianLowFire, EasyConetianMediumFire, EasyConetianHighFire, NormalConetianLowFire, NormalConetianMediumFire, NormalConetianHighFire, HardConetianLowFire, HardConetianMediumFire, HardConetianHighFire } from '../shared/assets';

export const useConetianLowFire = () => {
  const { gameDifficulty } = useFlappyBirdContext();
  const [imageSource, setImageSource] = useState<string>(gameDifficulty === 1 ? EasyConetianLowFire : gameDifficulty === 2 ? NormalConetianLowFire : HardConetianLowFire);
  useEffect(() => {
    setImageSource(EasyConetianLowFire)

    if (gameDifficulty === 1) {
      setImageSource(EasyConetianLowFire)
    }

    if (gameDifficulty === 2) {
      setImageSource(NormalConetianLowFire)
    }

    if (gameDifficulty === 3) {
      setImageSource(HardConetianLowFire)
    }
  }, [gameDifficulty])

  return imageSource;
}

export const useConetianMediumFire = () => {
  const { gameDifficulty } = useFlappyBirdContext();

  const [imageSource, setImageSource] = useState<string>(gameDifficulty === 1 ? EasyConetianMediumFire : gameDifficulty === 2 ? NormalConetianMediumFire : HardConetianMediumFire);

  useEffect(() => {
    setImageSource(EasyConetianMediumFire)

    if (gameDifficulty === 1) {
      setImageSource(EasyConetianMediumFire)
    }

    if (gameDifficulty === 2) {
      setImageSource(NormalConetianMediumFire)
    }

    if (gameDifficulty === 3) {
      setImageSource(HardConetianMediumFire)
    }
  }, [gameDifficulty])

  return imageSource;
}

export const useConetianHighFire = () => {
  const { gameDifficulty } = useFlappyBirdContext();

  const [imageSource, setImageSource] = useState<string>(gameDifficulty === 1 ? EasyConetianHighFire : gameDifficulty === 2 ? NormalConetianHighFire : HardConetianHighFire);
  useEffect(() => {
    setImageSource(EasyConetianHighFire)

    if (gameDifficulty === 1) {
      setImageSource(EasyConetianHighFire)
    }

    if (gameDifficulty === 2) {
      setImageSource(NormalConetianHighFire)
    }

    if (gameDifficulty === 3) {
      setImageSource(HardConetianHighFire)
    }
  }, [gameDifficulty])

  return imageSource;
}
