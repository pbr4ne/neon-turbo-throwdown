import { log } from "./utilities/GameUtils";

export class GameSounds {
    static musicSound: Phaser.Sound.WebAudioSound;
    static hitSound: Phaser.Sound.WebAudioSound;
    static effectsEnabled: boolean = true;
    static musicShouldBePlaying: boolean = true;
    static currentSongKey: string | null = null;

    static init(scene: Phaser.Scene) {
        if (GameSounds.hitSound) {
            return;
        }

        GameSounds.hitSound = scene.sound.add("hit") as Phaser.Sound.WebAudioSound;
    }

    static toggleMusic() {
        GameSounds.musicShouldBePlaying = !GameSounds.musicShouldBePlaying;
        if (GameSounds.musicSound) {
            if (GameSounds.musicShouldBePlaying) {
                GameSounds.musicSound.resume();
            } else {
                GameSounds.musicSound.pause();
            }
        }
    }

    static get musicEnabled() {
        return GameSounds.musicSound && GameSounds.musicSound.isPlaying;
    }

    static toggleEffects() {
        GameSounds.effectsEnabled = !GameSounds.effectsEnabled;
    }

    static playHit() {
        if (GameSounds.effectsEnabled) {
            GameSounds.hitSound.play();
        }
    }

    static switchSong(scene: Phaser.Scene, newSongKey: string) {
        if (GameSounds.currentSongKey === newSongKey) {
            log("The same song is already playing.");
            return;
        }

        if (GameSounds.musicSound) {
            GameSounds.musicSound.stop();
            GameSounds.musicSound.destroy();
        }

        GameSounds.musicSound = scene.sound.add(newSongKey) as Phaser.Sound.WebAudioSound;
        GameSounds.currentSongKey = newSongKey;

        if (GameSounds.musicShouldBePlaying) {
            log("Playing music");
            GameSounds.musicSound.play({ loop: true, volume: 0.2 });
        } else {
            log("Not playing music");
        }
    }
}