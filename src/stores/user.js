import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        userID: '',
        highScore: 0,
        timesPlayed: 0
    }),
    actions: {
        setUserID() {
            if(!localStorage.getItem('userID')) {
                const userID = window.crypto.randomUUID();
                localStorage.setItem('userID', userID);
                this.userID = userID;
            } else {
                this.userID = localStorage.getItem('userID');
            }
        },
        setHighScore(highScore) {
            if(!localStorage.getItem('highScore')) {
                localStorage.setItem('highScore', this.highScore);
            } else {
                localStorage.setItem('highScore', highScore);
                this.highScore = highScore;
            }
        },
        setTimesPlayed() {
            // set timesPlayed to 0, the default value of timesPlayed in the store
            if(!localStorage.getItem('timesPlayed')) {
                localStorage.setItem('timesPlayed', this.timesPlayed);
            } else {
                this.timesPlayed = localStorage.getItem('timesPlayed');
            }
        },
        incrementTimesPlayed() {
            localStorage.setItem('timesPlayed', parseInt(localStorage.getItem('timesPlayed')) + 1);
            this.timesPlayed = localStorage.getItem('timesPlayed');
        }
    }
});