import { log } from "./GameUtils";

export class GameSounds {
    static musicSound: Phaser.Sound.WebAudioSound;
    static hitSound: Phaser.Sound.WebAudioSound;
    static blockSound: Phaser.Sound.WebAudioSound;
    static buttonSound: Phaser.Sound.WebAudioSound;
    static cardSound: Phaser.Sound.WebAudioSound;
    static healSound: Phaser.Sound.WebAudioSound;
    static winSound: Phaser.Sound.WebAudioSound;
    static loseSound: Phaser.Sound.WebAudioSound;
    static effectsEnabled: boolean = true;
    static musicShouldBePlaying: boolean = true;
    static currentSongKey: string | null = null;
    static fadeDuration: number = 1000; //ms

    static init(scene: Phaser.Scene) {
        if (GameSounds.hitSound && GameSounds.blockSound && GameSounds.buttonSound && GameSounds.cardSound && GameSounds.healSound && GameSounds.winSound && GameSounds.loseSound) {
            return;
        }

        GameSounds.hitSound = scene.sound.add("sound_hit") as Phaser.Sound.WebAudioSound;
        GameSounds.blockSound = scene.sound.add("sound_block") as Phaser.Sound.WebAudioSound;
        GameSounds.buttonSound = scene.sound.add("sound_button") as Phaser.Sound.WebAudioSound;
        GameSounds.cardSound = scene.sound.add("sound_card") as Phaser.Sound.WebAudioSound;
        GameSounds.healSound = scene.sound.add("sound_heal") as Phaser.Sound.WebAudioSound;
        GameSounds.winSound = scene.sound.add("sound_win") as Phaser.Sound.WebAudioSound;
        GameSounds.loseSound = scene.sound.add("sound_lose") as Phaser.Sound.WebAudioSound;
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
            GameSounds.hitSound.play({ volume: 0.2});
        }
    }

    static playBlock() {
        if (GameSounds.effectsEnabled && GameSounds.blockSound) {
            GameSounds.blockSound.play({ volume: 0.2 });
        }
    }

    static playButton() {
        if (GameSounds.effectsEnabled && GameSounds.buttonSound) {
            GameSounds.buttonSound.play({ volume: 0.2 });
        }
    }

    static playCard() {
        if (GameSounds.effectsEnabled && GameSounds.cardSound) {
            GameSounds.cardSound.play({ volume: 0.2 });
        }
    }

    static playHeal() {
        if (GameSounds.effectsEnabled && GameSounds.healSound) {
            GameSounds.healSound.play({ volume: 0.2 });
        }
    }

    static playWin() {
        if (GameSounds.effectsEnabled && GameSounds.winSound) {
            GameSounds.winSound.play({ volume: 0.2 });
        }
    }

    static playLose() {
        if (GameSounds.effectsEnabled && GameSounds.loseSound) {
            GameSounds.loseSound.play({ volume: 0.2 });
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