const {Discord,MessageEmbed} = require('discord.js')
const corona = require('wio-covid-19-tr')


exports.run = function(client, message, args) {
  corona().then(a=>{
     const embed = new MessageEmbed()
     .setColor('#0AFF00')
     .addField('Toplam ölüm:',a.toplamOlum,true)
     .addField('Toplam test:',a.toplamTest,true)
     .addField('Toplam vaka:',a.toplamVaka,true)
     .addField('Toplam kurtarılan:',a.toplamKurtarilan,true)
     .addField('Toplam yoğun bakım:',a.toplamYogunBakim,true)
     .addField('Bugünkü test:',a.bugunkuTest,true)
     .addField('Bugünkü vaka:',a.bugunkuVaka,true)
     .addField('Bugünkü kurtarılma:',a.bugunkuKurtarilan,true)
     .setFooter(`${client.user.username} Covid 19 türkiye sistemi.`,message.guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrQeC2cDl87WkEmQI6mkgX5Xhtl6tuTcedVQ&usqp=CAU')
     message.channel.send(embed)
    
  })
  
  
}



exports.yardim = {
    isim: "corona",
    kullanimlar: ['corona-türkiye'],
    aciklamalar:'Türkiyenin covid 19 istatistiklerini gösterir.'

}