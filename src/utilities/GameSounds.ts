import { log } from "./GameUtils";
import { StorageManager } from "./StorageManager";

export class GameSounds {
    static musicSound: Phaser.Sound.WebAudioSound;
    static hitSound: Phaser.Sound.WebAudioSound;
    static blockSound: Phaser.Sound.WebAudioSound;
    static buttonSound: Phaser.Sound.WebAudioSound;
    static cardSound: Phaser.Sound.WebAudioSound;
    static healSound: Phaser.Sound.WebAudioSound;
    static winSound: Phaser.Sound.WebAudioSound;
    static loseSound: Phaser.Sound.WebAudioSound;
    static catchSound: Phaser.Sound.WebAudioSound;
    static debuffSound: Phaser.Sound.WebAudioSound;
    static buffSound: Phaser.Sound.WebAudioSound;
    static dodgeSound: Phaser.Sound.WebAudioSound;
    static effectsEnabled: boolean = true;
    static musicShouldBePlaying: boolean = true;
    static currentSongKey: string | null = null;
    static fadeDuration: number = 1000; //ms

    static async init(scene: Phaser.Scene) {
        const settings = await StorageManager.loadSoundSettings();
        console.log(settings?.effectsEnabled);
        console.log(settings?.musicEnabled);
        if (settings) {
            GameSounds.effectsEnabled = settings.effectsEnabled;
            GameSounds.musicShouldBePlaying = settings.musicEnabled;
        }

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
        GameSounds.catchSound = scene.sound.add("sound_catch") as Phaser.Sound.WebAudioSound;
        GameSounds.debuffSound = scene.sound.add("sound_debuff") as Phaser.Sound.WebAudioSound;
        GameSounds.buffSound = scene.sound.add("sound_buff") as Phaser.Sound.WebAudioSound;
        GameSounds.dodgeSound = scene.sound.add("sound_dodge") as Phaser.Sound.WebAudioSound;

        if (GameSounds.musicSound && GameSounds.musicShouldBePlaying) {
            GameSounds.musicSound.resume();
        }
    }

    static async toggleMusic() {
        GameSounds.musicShouldBePlaying = !GameSounds.musicShouldBePlaying;
        await StorageManager.saveSoundSettings(GameSounds.musicShouldBePlaying, GameSounds.effectsEnabled);

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

    static async toggleEffects() {
        GameSounds.effectsEnabled = !GameSounds.effectsEnabled;
        await StorageManager.saveSoundSettings(GameSounds.musicShouldBePlaying, GameSounds.effectsEnabled);
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
            GameSounds.cardSound.play({ volume: 1.2 });
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

    static playCatch() {
        if (GameSounds.effectsEnabled && GameSounds.catchSound) {
            GameSounds.catchSound.play({ volume: 0.2 });
        }
    }

    static playDebuff() {
        if (GameSounds.effectsEnabled && GameSounds.debuffSound) {
            GameSounds.debuffSound.play({ volume: 0.2 });
        }
    }

    static playBuff() {
        if (GameSounds.effectsEnabled && GameSounds.buffSound) {
            GameSounds.buffSound.play({ volume: 0.2 });
        }
    }

    static playDodge() {
        if (GameSounds.effectsEnabled && GameSounds.dodgeSound) {
            GameSounds.dodgeSound.play({ volume: 0.2 });
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
            GameSounds.musicSound.play({ loop: true, volume: 0.2 });
        } else {
            log("Not playing music");
        }
    }
}