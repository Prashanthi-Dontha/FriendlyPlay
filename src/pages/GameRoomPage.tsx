import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  User as UserIcon,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const GameRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Tic Tac Toe State
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string }[]>([
    { sender: 'System', text: 'Welcome to the arena! Match is ready.' },
    { sender: 'MockOpponent', text: 'Good luck, let\'s have a friendly match!' },
  ]);

  const handleCellClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Simulate mock opponent move after 600ms if game is active
    if (!calculateWinner(newBoard) && newBoard.includes(null)) {
      setTimeout(() => {
        const emptyIndices = newBoard
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null) as number[];

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          newBoard[randomIndex] = isXNext ? 'O' : 'X';
          setBoard(newBoard);
          setIsXNext(isXNext); // Keeps turn order intact
        }
      }, 600);
    }
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatLog((prev) => [...prev, { sender: user?.username || 'You', text: chatMessage.trim() }]);
    const currentMessage = chatMessage;
    setChatMessage('');

    // Mock response
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        { sender: 'MockOpponent', text: `Nice move! ("${currentMessage}" replied)` },
      ]);
    }, 1200);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  const statusMessage = winner
    ? `Winner: ${winner === 'X' ? user?.username : 'Opponent'}`
    : isDraw
    ? 'Game Draw!'
    : `Next Turn: ${isXNext ? 'Your Turn (X)' : 'Opponent (O)'}`;

  // Chess Board Mock Layout
  const renderChessboard = () => {
    const boardCells = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const initialRowPieces: Record<string, string> = {
      a: '♜', b: '♞', c: '♝', d: '♛', e: '♚', f: '♝', g: '♞', h: '♜'
    };

    for (let row = 8; row >= 1; row--) {
      for (let colIndex = 0; colIndex < 8; colIndex++) {
        const file = files[colIndex];
        const isDark = (row + colIndex) % 2 === 0;
        const cellId = `${file}${row}`;
        
        let piece = '';
        if (row === 8) piece = initialRowPieces[file];
        else if (row === 7) piece = '♟';
        else if (row === 2) piece = '♙';
        else if (row === 1) piece = initialRowPieces[file].replace('♜','♖').replace('♞','♘').replace('♝','♗').replace('♛','♕').replace('♚','♔').replace('♜','♖').replace('♞','♘').replace('♝','♗');
        
        // Custom replacement helper for white pieces
        if (row === 1) {
          if (file === 'a' || file === 'h') piece = '♖';
          if (file === 'b' || file === 'g') piece = '♘';
          if (file === 'c' || file === 'f') piece = '♗';
          if (file === 'd') piece = '♕';
          if (file === 'e') piece = '♔';
        }

        boardCells.push(
          <div
            key={cellId}
            className={`aspect-square flex items-center justify-center text-3xl font-semibold select-none transition-all hover:scale-105 duration-200 cursor-pointer ${
              isDark ? 'bg-slate-900 border border-slate-950/20' : 'bg-slate-800 border border-slate-900/10'
            }`}
          >
            <span className={row > 4 ? 'text-indigo-400' : 'text-slate-200 shadow-sm'}>
              {piece}
            </span>
          </div>
        );
      }
    }
    return boardCells;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Navigation header */}
      <div className="flex items-center justify-between border-b border-slate-900/50 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="text-slate-400 border-slate-900 hover:bg-slate-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest bg-slate-900/30 border border-slate-900/50 px-3 py-1.5 rounded-full">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
          Live Room: FP-{id?.toUpperCase()}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Game Main Stage */}
        <Card isGlass={true} className="lg:col-span-2 border-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-100">
                  {id === 'game1' ? 'Friendly Chess' : 'Tic Tac Toe Arena'}
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">
                  {id === 'game1'
                    ? '1v1 Match versus opponent. Move pieces strategically.'
                    : 'Get three of your marks in a horizontal, vertical, or diagonal row.'}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleResetGame}
                className="text-slate-400 border-slate-900 hover:bg-slate-900 hover:text-slate-200"
                title="Restart Game"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Render Chess */}
            {id === 'game1' && (
              <div className="mx-auto max-w-[450px] aspect-square rounded-lg overflow-hidden border border-slate-900 shadow-2xl grid grid-cols-8 grid-rows-8 bg-slate-950">
                {renderChessboard()}
              </div>
            )}

            {/* Render Tic Tac Toe */}
            {id === 'game2' && (
              <div className="flex flex-col items-center">
                <div className="mb-4 text-sm font-semibold px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
                  {statusMessage}
                </div>
                <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full max-w-[320px] aspect-square p-2 bg-slate-950/60 rounded-xl border border-slate-900">
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => handleCellClick(index)}
                      className={`aspect-square rounded-lg flex items-center justify-center text-4xl font-extrabold transition-all duration-150 ${
                        cell
                          ? cell === 'X'
                            ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-slate-900 hover:bg-slate-800 border border-slate-850 cursor-pointer active:scale-95'
                      }`}
                    >
                      {cell}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between items-center text-xs text-slate-500 border-t border-slate-900/50 pt-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Latency: 14ms
            </span>
            <span>Rules: Standard Friendly Mode</span>
          </div>
        </Card>

        {/* Sidebar Info & Chat */}
        <div className="space-y-6">
          {/* Opponent Card */}
          <Card isGlass={true} className="border-slate-900/50 p-6">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Match Info
            </CardTitle>
            <div className="space-y-4">
              {/* Player 1 (You) */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-900">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400 text-xs">
                    {user?.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-300">{user?.username}</p>
                    <p className="text-[10px] text-slate-500">Player 1 (X)</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-indigo-400">Host</div>
              </div>

              {/* Opponent */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-900">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-rose-500/20 flex items-center justify-center font-bold text-rose-400 text-xs">
                    MO
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-300">MockOpponent</p>
                    <p className="text-[10px] text-slate-500">Player 2 (O)</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-emerald-400">Ready</div>
              </div>
            </div>
          </Card>

          {/* Chat Panel */}
          <Card isGlass={true} className="border-slate-900/50 flex flex-col h-[320px] overflow-hidden">
            <div className="p-4 border-b border-slate-900/50 flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-indigo-400" />
              <span className="text-sm font-semibold text-slate-300">Match Chat</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
              {chatLog.map((chat, idx) => {
                const isMe = chat.sender === user?.username;
                const isSystem = chat.sender === 'System';

                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      isMe ? 'items-end' : isSystem ? 'items-center' : 'items-start'
                    }`}
                  >
                    {isSystem ? (
                      <span className="px-2.5 py-1 rounded bg-slate-950 text-slate-500 border border-slate-900">
                        {chat.text}
                      </span>
                    ) : (
                      <>
                        <span className="text-[10px] text-slate-500 mb-0.5">{chat.sender}</span>
                        <span
                          className={`px-3 py-2 rounded-lg max-w-[85%] leading-relaxed ${
                            isMe
                              ? 'bg-indigo-600 text-white rounded-tr-none'
                              : 'bg-slate-900 text-slate-300 rounded-tl-none border border-slate-850'
                          }`}
                        >
                          {chat.text}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-900/50 flex gap-2">
              <Input
                placeholder="Send a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="bg-slate-950/80 border-slate-900 text-xs"
              />
              <Button type="submit" size="icon" className="h-9 w-9 bg-indigo-600 hover:bg-indigo-500">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default GameRoomPage;
