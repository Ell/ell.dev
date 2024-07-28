import React from "react";
import type { FunctionComponent } from "react";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { GameExtendedAchievementEntityWithUserProgress, GameInfoAndUserProgress } from "@retroachievements/api";

import { getAchievements, getProfile } from "../../../clients/retro";
import { BackgroundVideo, getRandomVideo } from "../../BackgroundVideo";

const VIDEO_INTERVAL = 1000 * 60 * 2;

const queryClient = new QueryClient();

export const OverlayApp: FunctionComponent<{ username: string }> = ({ username }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Overlay username={username} />
    </QueryClientProvider>
  )
}

const Overlay: FunctionComponent<{ username: string }> = ({ username }) => {
  const [video, setVideo] = React.useState<string>(getRandomVideo());

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomVideo = getRandomVideo();

      setVideo(randomVideo);
    }, VIDEO_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const profileData = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
    refetchInterval: 5000,
    refetchIntervalInBackground: true
  });

  const gameId = profileData?.data?.lastGameId ?? null;

  const gameData = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getAchievements(username, gameId!),
    enabled: !!gameId,
  });

  const achievements = gameData?.data?.achievements ?? {};

  return (
    <>
      <BackgroundVideo videoURL={video} />
      <div className="w-full h-screen flex flex-col fixed z-50">
        <div className="w-full h-full flex flex-row justify-center content-center">
          <Grid achievements={achievements} />
        </div>
        <div className="w-full h-full flex flex-row justify-center mt-24">
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase font-mono text-center">[ gamezone ]</h1>
            <h1 className="text-xl uppercase font-mono text-center">[ ell.dev ]</h1>
            <h1 className="text-xl uppercase font-mono text-center mt-2">[ {profileData?.data?.richPresenceMsg} ]</h1>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-end">
          {gameData?.data && <GameInfo game={gameData.data} />}
        </div>
      </div>
    </>
  )
};

type GameInfoProps = {
  game: GameInfoAndUserProgress,
};

const GameInfo: FunctionComponent<GameInfoProps> = ({ game }) => {
  return (
    <div className="justify-end w-full h-[128px] bg-[#222]">
      <div className="flex flex-row">
        <img src={`https://retroachievements.org/${game.imageTitle}`} title={game.title} className="w-[128px] h-[128px]" />
        <div className="flex flex-col m-2">
          <div className="text-white text">{game.title} ({game.released})</div>
          <div className="text-white text">{game.developer}</div>
          <div className="text-white text">{game.consoleName}</div>
          <div className="text-white text">{game.numAwardedToUser} / {Object.keys(game.achievements).length}</div>
        </div>
      </div>
    </div>
  )
};

type GridProps = {
  achievements: Record<number, GameExtendedAchievementEntityWithUserProgress>
}

const Grid: FunctionComponent<GridProps> = ({ achievements }) => {
  const achievementCount = Object.keys(achievements).length;

  const gridImages = Object.keys(achievements).map(id => {
    const achievement = achievements[parseInt(id, 10)];

    if (achievement.dateEarned || achievement.dateEarnedHardcore) {
      return [id, `https://retroachievements.org/Badge/${achievement.badgeName}.png`];
    }

    return [id, `https://retroachievements.org/Badge/${achievement.badgeName}_lock.png`];
  });

  const gridEntries = gridImages.map((src) => {
    const [id, url] = src;

    return (
      <img src={url} title={id} className="w-[32px] h-[32px]" />
    )
  });

  return (
    <div className={`w-full bg-opacity-50 flex flex-row flex-wrap content-start bg-[#222]`}>
      {gridEntries}
    </div>
  )
}