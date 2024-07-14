import { log } from "./utilities/GameUtils";

export class GameSounds {
    static musicSound: Phaser.Sound.WebAudioSound;
    static hitSound: Phaser.Sound.WebAudioSound;
    static effectsEnabled: boolean = true;
    static musicShouldBePlaying: boolean = true;
    static currentSongKey: string | null = null;
    static fadeDuration: number = 1000; //ms

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
        if (GameSounds.effectsEnabled && GameSounds.hitSound) {
            GameSounds.hitSound.play();
        }
    }

    static switchSong(scene: Phaser.Scene, newSongKey: string) {
        if (GameSounds.currentSongKey === newSongKey) {
            log("The same song is already playing.");
            return;
        }

        //fade out current song
        if (GameSounds.musicSound) {
            scene.tweens.add({
                targets: GameSounds.musicSound,
                volume: 0,
                duration: GameSounds.fadeDuration,
                onComplete: () => {
                    GameSounds.musicSound.stop();
                    GameSounds.musicSound.destroy();
                    GameSounds.startNewSong(scene, newSongKey);
                }
            });
        } else {
            GameSounds.startNewSong(scene, newSongKey);
        }
    }

    static startNewSong(scene: Phaser.Scene, newSongKey: string) {
        GameSounds.musicSound = scene.sound.add(newSongKey) as Phaser.Sound.WebAudioSound;
        GameSounds.currentSongKey = newSongKey;

        if (GameSounds.musicShouldBePlaying) {
            GameSounds.musicSound.play({ loop: true, volume: 0 });
            //fade in new song
            scene.tweens.add({
                targets: GameSounds.musicSound,
                volume: 0.2,
                duration: GameSounds.fadeDuration
            });
        } else {
            log("Not playing music");
        }
    }
}