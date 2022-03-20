const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "serverinfo",
    description: "Montre les statistiques du serveur en temps réel",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const { guild } = interaction;
    
        const boosts = guild.premiumSubscriptionCounts;
        if(boosts > 1) { s = `boosts`} else {s = `boost`}

        const members = guild.members.cache;
        const online = members.filter(m => m.presence?.status === 'online').size;
        const offline = members.filter(m => m.presence?.status === 'offline').size + members.filter(m => m.presence?.status === undefined).size;

        const embed = new MessageEmbed()
        .setTitle(`Informations de ${guild.name}`)
        .addField("👑 Propriétaire du serveur :", `<@${guild.ownerId}>`, true)
        .addField("👤 Membres : ", `${guild.memberCount}`, true)
        .addField("<:StatusOnline:954468044472741988> Membres en ligne : ", `${online}`, true)
        .addField("<:StatusOffline:954469549732954202> Membres hors-ligne : ", `${offline}`, true)
        .addField("<:robots:954456436832874596> Nombre de robots :", `${guild.members.cache.filter(m => m.user.bot).size}`, true)
        .addField("<:info:954465321648001136> Date de création du serveur :", `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, true)
        .addField("💎 Nombre de rôles :", `${guild.roles.cache.size}`, true)
        .addField(`:crystal_ball: Nombre de ${s} :`, `${boosts ?? "0"}`, true)
        .addField("Nombre d'emoji : ", `${guild.emojis.cache.size}`, true)
        .setColor("WHITE")
        .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
        .setTimestamp()
        interaction.followUp({embeds: [embed]})
    }
}