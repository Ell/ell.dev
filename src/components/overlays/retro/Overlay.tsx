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
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  const achievements = gameData?.data?.achievements ?? {};
  const latestAchievement = Object.keys(achievements)
    .map(id => achievements[parseInt(id, 10)])
    .filter(achievement => achievement.dateEarned)
    .sort((a, b) => Date.parse(b.dateEarned) - Date.parse(a.dateEarned))[0];

  return (
    <>
      <BackgroundVideo videoURL={video} />
      <div className="w-full h-screen flex flex-col fixed z-50 bg-[#222]/80">
        {latestAchievement && (
          <div className="w-full h-[256px] flex flex-row">
            <LatestAchievement achievement={latestAchievement} />
          </div>
        )}
        <div className="w-full h-full flex flex-row justify-center content-center">
          <Grid achievements={achievements} />
        </div>
        <div className="w-full h-full flex flex-row justify-center mt-20">
          <div className="flex flex-col">
            <h1 className="text-2xl uppercase font-mono text-center">[ gamezone ]</h1>
            <h1 className="text-xl uppercase font-mono text-center">[ ell.dev ]</h1>
            <h1 className="text uppercase font-mono text-center mt-2">{profileData?.data?.richPresenceMsg}</h1>
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
        <div className="flex flex-col m-4 overflow-ellipsis font-mono uppercase whitespace-nowrap overflow-hidden">
          <div className="text-white text">{game.title} ({game.released})</div>
          <div className="text-white text">{game.developer}</div>
          <div className="text-white text">{game.consoleName}</div>
          <div className="text-white text">{game.numAwardedToUser} / {Object.keys(game.achievements).length}</div>
        </div>
      </div>
    </div>
  )
};

type LatestAchievementProps = {
  achievement: GameExtendedAchievementEntityWithUserProgress,
};

const LatestAchievement: FunctionComponent<LatestAchievementProps> = ({ achievement }) => {
  return (
    <div className="w-full h-full flex flex-row bg-[#222]">
      <img src={`https://retroachievements.org/Badge/${achievement.badgeName}.png`} title={achievement.title} className="w-[128px] h-[128px]" />
      <div className="flex flex-col w-full h-full font-mono uppercase m-4">
        <h1 className="text-3xl">{achievement.title}</h1>
        <h1 className="text">{achievement.description}</h1>
        <h1 className="text">{achievement.dateEarned}</h1>
      </div>
      <div className="m-4">
        <h1>{achievement.points}</h1>
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
    <div className={`w-full flex flex-row flex-wrap content-start`}>
      {gridEntries}
    </div>
  )
}