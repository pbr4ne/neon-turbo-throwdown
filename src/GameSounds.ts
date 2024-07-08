export class GameSounds {

    static musicSound: Phaser.Sound.WebAudioSound;

    static ballSound: Phaser.Sound.WebAudioSound;

    static effectsEnabled: boolean;

    static init(scene: Phaser.Scene) {

        if (GameSounds.musicSound) {

            return;
        }

        GameSounds.musicSound = scene.sound.add("music") as Phaser.Sound.WebAudioSound;
        GameSounds.musicSound.play({ loop: true, volume: 0.2 });

        GameSounds.ballSound = scene.sound.add("ball") as Phaser.Sound.WebAudioSound;
        GameSounds.effectsEnabled = true;
    }

    static toggleMusic() {

        if (GameSounds.musicEnabled) {

            GameSounds.musicSound.pause();

        } else {

            GameSounds.musicSound.resume();
        }
    }

    static get musicEnabled() {

        return GameSounds.musicSound && GameSounds.musicSound.isPlaying;
    }

    static toggleEffects() {

        GameSounds.effectsEnabled = !GameSounds.effectsEnabled;
    }

    static playball() {

        if (GameSounds.effectsEnabled) {

            GameSounds.ballSound.play();
        }
    }
}