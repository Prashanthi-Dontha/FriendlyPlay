import { Button } from '@/components/ui/button';
import { checkGuess, getRandomWord, KEYBOARD_KEYS, LETTER_STATUS } from '@/components/utils/wordleNameUtils';
import React, { useState } from 'react';

const WordleGame = () => {
  // wordle states
  const [targetWord] = useState<string>(() => getRandomWord().toUpperCase());
  const [wordleBoard, setWordleBoard] = useState<string[][]>(() => Array.from({ length: 6 }, () => Array(5).fill(''))); // for tiles setup
  const [wordleRow, setWordleRow] = useState(0); // row index
  const [wordleColumn, setWordleColumn] = useState(0); // col index
  const [boardStatuses, setBoardStatuses] = useState<LETTER_STATUS[][]>(() => Array.from({ length: 6 }, () => Array(5).fill("EMPTY")))
  const [keyboardStatuses, setKeyboardStatuses] = useState<Record<string, LETTER_STATUS>>({})


  const handleKeyWord = (key: string) => {

    if (key === "DELETE") {
      if (wordleColumn === 0) return;
      const newcol = wordleColumn - 1;
      setWordleColumn(newcol);
      setWordleBoard((prev) => prev?.map((row, rowInd) => rowInd === wordleRow ? row?.map((col, colInd) => colInd === newcol ? " " : col) : row))
      return;
    }
    if (key === 'ENTER') {
      if (wordleColumn < 5) {
        alert("word is too short");
        return

      }

      const currentGuess = wordleBoard[wordleRow];
      const rowStatuses = checkGuess(currentGuess, targetWord)
      setBoardStatuses((prev) => prev?.map((row, ridx) => ridx === wordleRow ? rowStatuses : row))


      setKeyboardStatuses((prev) => {
        const updated = { ...prev };
        currentGuess?.forEach((letter, index) => {
          const currentStatus = rowStatuses[index];
          const existingStatus = updated[letter];

          if (existingStatus === "CORRECT") return;
          if (existingStatus === "PRESENT" && currentStatus === "ABSENT") return;

          updated[letter] = currentStatus;
        })
        return updated;
      })
      if (wordleRow < 5) {
        setWordleRow((prev) => prev + 1);
        setWordleColumn(0);
        alert(1)
      }

      else {
        alert("Game over")
      }
      return

    }
    if (wordleColumn < 5) {
      setWordleBoard((prev) => prev?.map((row, rowIndex) => rowIndex === wordleRow ? row?.map((col, colIndex) => colIndex === wordleColumn ? key : col) : row))
      setWordleColumn((prev) => prev + 1)
    }

  };

  const getColorClass = (status: LETTER_STATUS) => {
    switch (status) {
      case 'CORRECT': return 'bg-green-600 text-white border-green-600';
      case 'PRESENT': return 'bg-orange-500 text-white border-orange-500';
      case 'ABSENT': return 'bg-gray-500 text-white border-gray-500';
      default: return 'border-blue-300 text-black';
    }
  };
  return (
    <div className="flex flex-col w-full mt-16 items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        {wordleBoard?.map((i, rowIndex) => {
          return (
            <div key={rowIndex} className="flex gap-2">
              {i?.map((j, index) => {
                const cellStatus = boardStatuses[rowIndex][index]
                return (
                  <div key={index}>
                    <p className={`border border-blue-300 rounded-sm w-10 h-10 text-center flex items-center justify-center text-3xl font-bold ${getColorClass(cellStatus)}`}>
                      {j}
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 mt-16 w-full items-center justify-center">
        {KEYBOARD_KEYS?.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row?.map((key, colIndex) => {
              const isActionKey = key === 'ENTER' || key === 'DELETE';
              const keyStatus = keyboardStatuses[key] || "EMPTY"
              return (
                <Button
                  key={colIndex}
                  className={`border h-full p-2 flex items-center justify-center 
                    ${isActionKey ? 'w-full' : 'min-w-10'} ${getColorClass(keyStatus)}`}
                  onClick={() => handleKeyWord(key)}
                >
                  {key}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;
