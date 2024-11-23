import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command, type Context, type Lavamusic } from '../../structures/index';

export default class About extends Command {
	constructor(client: Lavamusic) {
		super(client, {
			name: 'about',
			description: {
				content: 'cmd.about.description',
				examples: ['about'],
				usage: 'about',
			},
			category: 'info',
			aliases: ['ab'],
			cooldown: 3,
			args: false,
			vote: false,
			player: {
				voice: false,
				dj: false,
				active: false,
				djPerm: null,
			},
			permissions: {
				dev: false,
				client: ['SendMessages', 'ReadMessageHistory', 'ViewChannel', 'EmbedLinks'],
				user: [],
			},
			slashCommand: true,
			options: [],
		});
	}

	public async run(client: Lavamusic, ctx: Context): Promise<any> {
		const inviteButton = new ButtonBuilder()
			.setLabel(ctx.locale('buttons.invite'))
			.setStyle(ButtonStyle.Link)
			.setURL(
				`https://discord.com/api/oauth2/authorize?client_id=${client.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`,
			);
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(inviteButton);
		const embed = this.client
			.embed()
			.setAuthor({
				name: 'WaclanBot',
				iconURL: 'https://file.waclan.net/api/public/dl/ZVsjyBjs?inline=true',
			})
			.setThumbnail(
				'https://file.waclan.net/api/public/dl/ZVsjyBjs?inline=true',
			)
			.setColor(this.client.color.main)
			.addFields(
				{
					name: ctx.locale('cmd.about.fields.creator'),
					value: '[KimPig](https://github.com/KimPig)',
					inline: true,
				},
				{
					name: ctx.locale('cmd.about.fields.repository'),
					value: '[링크](https://github.com/KimPig/WaclanBot)',
					inline: true,
				},
				{
					name: ctx.locale('cmd.about.fields.support'),
					value: '[링크](https://waclan.net)',
					inline: true,
				},
				{
					name: '\u200b',
					value: ctx.locale('cmd.about.fields.description'),
					inline: true,
				},
			);
		await ctx.sendMessage({
			content: '',
			embeds: [embed],
			components: [row],
		});
	}
}

/**
 * Project: lavamusic
 * Author: Appu
 * Main Contributor: LucasB25
 * Company: Coders
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/ns8CTk9J3e
 */
