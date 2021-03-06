import * as Discord from 'discord.js';
import * as config from '../config.json';
import { User } from 'discord.js';

class Bot {
    private client!: Discord.Client;
    private message!: Discord.Message;

    public start() {
        this.client = new Discord.Client();

        this.client.on('ready', () => {
            console.log('hello world');
        })

        this.client.on('message', async message => {
            this.message = message;

            if (message.author.username === 'German') {
                this.message.channel.send('Ой да ты вообще ебло завали');
            } else if (!message.author.bot && this.endsWith('да')) {
                await this.message.channel.send('ПИЗДА');
                await message.react('🇱');
                await message.react('🇴');
                await message.react('🇽');
            } else if (/мама германа/i.test(message.content)) {
                this.message.channel.send('ТУПАЯ ПИЗДА');
            } else if (/образование/i.test(message.content)) {
                this.message.channel.send('СОСАТЬ');
            } else if (/Марк/i.test(message.content)) {
                const user = message.guild?.member(message.mentions.users.first() as User);
                const role = message!.guild!.roles.cache.get('702545443334258759');

                user?.roles.add(role!);
            }
        })

        this.client.login(config.token);
    }

    private endsWith(ending: string): boolean {
        const regExp: RegExp = new RegExp(`.*${ending}[^а-яА-Яa-zA-Z]*$`, 'i');

        return regExp.test(this.message.content);
    }
}

const test = new Bot();
test.start();