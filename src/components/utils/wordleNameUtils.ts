const WORDS_LIST: string[] = ["APPLE", "sLACK", "SLOTS", "DATES", "SLATE", "STAKE", "STAIR", "HOUSE", "STARE", "STARS"];

export const getRandomWord = (): string => {
    const randomIndex = Math.floor(Math.random() * WORDS_LIST.length);
    return WORDS_LIST[randomIndex]
}


export type GAME_STATUS = "IN_PROGRESS" | "WON" | "LOST";
export type LETTER_STATUS = "CORRECT" | "PRESENT" | "ABSENT" | "EMPTY"
export const KEYBOARD_KEYS: string[][] = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]]

export interface EvaluatedLetter {
    letter: string;
    status: LETTER_STATUS;
}
export const checkGuess = (guessWord: string[], targetWord: string): LETTER_STATUS[] => {
    const targetLetters = targetWord.split("");
    const statuses: LETTER_STATUS[] = Array(5).fill("ABSENT");

    guessWord?.forEach((letter, i) => {
        if (letter === targetLetters[i]) {
            statuses[i] = "CORRECT";
            targetLetters[i] = "-"
        }

    })

    guessWord?.forEach((letter, i) => {
        if (statuses[i] === "CORRECT") return;

        // if (targetLetters.includes(letter)) {
        //     statuses[i] = "PRESENT";
        //     targetLetters[targetLetters.indexOf(letter)] = "-"
        // } else {
        //     statuses[i] = "ABSENT"
        // }
        const targetIndex = targetLetters.indexOf(letter)

        if (targetIndex !== -1) {
            statuses[i] = "PRESENT";
            targetLetters[targetIndex] = "-"
        }
        else {
            statuses[i] = "ABSENT"
        }
    })
    return statuses;
}
