import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { Game } from '../types/game';
import {
  Crown,
  Swords,
  Brain,
  Users,
  Trophy,
  Activity,
  ArrowRight,
  Flame,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const gamesList: Game[] = [
    // {
    //   id: 'game1',
    //   title: 'Friendly Chess',
    //   description: 'Clash of intelligence. Challenge a friend in a tactical 1v1 chess match or practice with our custom engine.',
    //   status: 'active',
    //   minPlayers: 2,
    //   maxPlayers: 2,
    //   currentPlayers: 42,
    //   icon: 'Crown',
    //   difficulty: 'Hard',
    //   category: 'Board',
    // },
    // {
    //   id: 'game2',
    //   title: 'Tic Tac Toe Arena',
    //   description: 'Quick-fire rounds of classic 3x3 grids. Make your moves, block your opponent, and secure the winning line.',
    //   status: 'active',
    //   minPlayers: 2,
    //   maxPlayers: 2,
    //   currentPlayers: 18,
    //   icon: 'Swords',
    //   difficulty: 'Easy',
    //   category: 'Casual',
    // },
    // {
    //   id: 'game3',
    //   title: 'Memory Match',
    //   description: 'Train your brain in this card flipping trial. Match identical pairs as fast as possible to claim a high score.',
    //   status: 'maintenance',
    //   minPlayers: 1,
    //   maxPlayers: 4,
    //   currentPlayers: 0,
    //   icon: 'Brain',
    //   difficulty: 'Medium',
    //   category: 'Puzzle',
    // },
    {
      id: "Wordle",
      title: "Wordle",
      description: "Guess the word in 6 tries",
      status: "active",
      minPlayers: 1,
      maxPlayers: 1,
      currentPlayers: 0,
      icon: "Brain",
      difficulty: "Easy",
      category: "Puzzle",
    }
  ];

  const getGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="h-6 w-6 text-amber-400" />;
      case 'Swords':
        return <Swords className="h-6 w-6 text-rose-400" />;
      case 'Brain':
        return <Brain className="h-6 w-6 text-emerald-400" />;
      default:
        return <Crown className="h-6 w-6 text-indigo-400" />;
    }
  };

  const handlePlayGame = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-purple-950/20 p-6 md:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Welcome back, <span className="text-indigo-400">{user?.username}</span>!
              <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
            </h1>
            <p className="mt-2 text-slate-400 text-sm md:text-base">
              The arena is active. Join an open game room or invite your friends to start playing.
            </p>
          </div>
          <div className="flex gap-4">
            {/* Quick Stat Indicators */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/80 px-4 py-2.5">
              <Users className="h-5 w-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Lobby Users</p>
                <p className="text-sm font-bold text-slate-200">1,248 Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-800/80 px-4 py-2.5">
              <Trophy className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Your Rank</p>
                <p className="text-sm font-bold text-slate-200">#42 Gold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid List Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Activity className="h-5 w-5 text-indigo-500" />
          <h2 className="text-xl font-bold tracking-tight text-slate-200">Featured Games</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gamesList.map((game) => {
            const isMaintenance = game.status === 'maintenance';

            return (
              <Card
                key={game.id}
                isGlass={true}
                className={`flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${isMaintenance ? 'opacity-75' : 'hover:shadow-xl hover:shadow-indigo-500/5 hover:border-slate-800'
                  }`}
              >
                {/* Accent border on top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] ${isMaintenance
                    ? 'bg-slate-700'
                    : game.id === 'game1'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                      : 'bg-gradient-to-r from-rose-500 to-pink-500'
                    }`}
                />

                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-800">
                      {getGameIcon(game.icon)}
                    </div>
                    {/* Game Badges */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isMaintenance
                          ? 'bg-slate-800 text-slate-400 border border-slate-700'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15'
                          }`}
                      >
                        {game.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mt-4 text-slate-100">{game.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-6">
                  <CardDescription className="text-slate-400 text-sm leading-relaxed">
                    {game.description}
                  </CardDescription>

                  {/* Player Stats */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-900 pt-4">
                    <span className="text-xs text-slate-500 font-medium">Player Count</span>
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${isMaintenance ? 'bg-slate-700' : 'bg-emerald-500 animate-pulse'
                          }`}
                      />
                      {isMaintenance ? 'Offline' : `${game.currentPlayers} Active`}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 border-t border-slate-900/50 p-6">
                  <Button
                    onClick={() => handlePlayGame(game.id)}
                    disabled={isMaintenance}
                    variant={isMaintenance ? 'secondary' : 'default'}
                    className={`w-full group ${!isMaintenance && 'bg-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-800 hover:border-indigo-500'
                      }`}
                  >
                    {isMaintenance ? (
                      'Under Maintenance'
                    ) : (
                      <>
                        Launch Arena
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
