const { SlashCommandBuilder } = require('discord.js');
const { getToken } = require("../osu-api-token");
import fetch from 'node-fetch';


module.exports = {
	data: new SlashCommandBuilder()
		.setName('link')
		.setDescription('links the user\'s osu account')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('your osu! username')),
	async execute(interaction) {
		const username = interaction.options.getString('username');
        const token = await getToken();

        const url = new URL(
            `https://osu.ppy.sh/api/v2/users/${username}/osu`
        );
        
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        
        const response = await fetch(url, {
            method: "GET",
            headers,
        }).then(response => response.json());

        interaction.reply(response)
	},
};