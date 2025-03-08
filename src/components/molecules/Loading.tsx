import { Player } from "@lottiefiles/react-lottie-player";
import { t } from "i18next";

type LoadingProps_TP = {
  mainTitle?: string;
  subTitle?: string;
};

export const Loading = ({
  mainTitle,
  subTitle = t("loading").toString(),
}: LoadingProps_TP) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData:
      "https://lottie.host/927c56c8-5cbf-4294-b786-34650c4902e2/7MesbFP41y.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Player
      autoplay
      loop
      src="https://lottie.host/e1099239-142b-4cf6-9e1d-c815959a6010/xF3HG10kOW.json"
      style={{ height: "600px", width: "200px", color:"red" }}
    ></Player>
  );
};
