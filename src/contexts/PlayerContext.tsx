import { createContext, ReactNode, useState } from 'react';

type Episode = {
	title: string;
	members: string;
	thumbnail: string;
	duration: number;
	url: string;
};

type PlayerContextData = {
	episodeList: Episode[];
	currentEpisodeIndex: number;
	isPlaying: boolean;
	play: (episode: Episode) => void;
	togglePlay: () => void;
	setPlayingState: (state: boolean) => void;
};

type PlayerContextProviderProps = {
	children: ReactNode; //children can be anything
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
	children,
}: PlayerContextProviderProps) {
	const [episodeList, setEpisodeList] = useState([]);
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	function play(episode: Episode) {
		setEpisodeList([episode]);
		setCurrentEpisodeIndex(0);
		setIsPlaying(true);
	}

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	function setPlayingState(state: boolean) {
		setIsPlaying(state);
	}

	return (
		<PlayerContext.Provider
			value={{
				episodeList,
				currentEpisodeIndex,
				play,
				togglePlay,
				isPlaying,
				setPlayingState,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
}
