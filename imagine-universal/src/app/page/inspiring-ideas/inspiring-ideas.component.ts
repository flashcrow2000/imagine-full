import { Component, OnInit } from '@angular/core';
import {Idea} from "../../shared/idea.model";
import {LanguagesService} from "../../services/languages.service";

@Component({
  selector: 'app-inspiring-ideas',
  templateUrl: './inspiring-ideas.component.html',
  styleUrls: ['./inspiring-ideas.component.css']
})
export class InspiringIdeasComponent implements OnInit {
  ideas: Idea[] = [];
    availableLanguages:Object = {};
    currentLanguage: string = '';
  constructor(private langService: LanguagesService) { }

  ngOnInit() {
      this.availableLanguages = this.langService.availableLanguages;
      this.currentLanguage = this.langService.currentLanguage;
      this.langService.languageChanged.subscribe(
          (lang:string) => {
              console.log('new language set to ', lang);
              this.currentLanguage = lang;
          }
      );
    this.ideas.push(this.createIdea("No Religions",
      "My daughters are my masters and my micro religion","I have got 2 beautiful daughters called Monica and Africa. Monica was born with a serious brain damage and Africa is perfectly healthy. But both are teaching me every day important things about life, about releasing fears, about enjoying small moments and thinking very straightforward about how our world peace should work. It's just a matter of watching them and carefully listening to them. Every month I would like to share a micro example of what my daughters teach me and invite people to do the same as I am convinced that we all have our masters and spiritual leaders at home and much closer than we can imagine.","assets/images/ideas/image-1.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "NO to passports, YES to cultures and languages",
      "My name is Jil and to be honest I don't like my Dutch passport. But I do like many things of my Dutch culture and language! Therefore once a month  I will share one typical Dutch tradition or word and invite people to do the same about their cultures and languages. For example what do you think about ice skating in our cold winters in the Netherlands?","assets/images/ideas/image-2.jpg"))
    this.ideas.push(this.createIdea("No Possessions, No " +
      "Religions, No Countries","Spreading The Venus Project with friends and family","It's great to learn that a lot of people already started working a long time ago on a complete new world without possessions, religions and countries. For me the best example is The Venus Project which is incredible. Here you see in a short video what they do and what they already achieved. As I truly believe that everyone should know about this beautiful initiative (unfortunately this is still not the case)  I will share it with my friends and familiy. I won't just post it once on my social networks. I will explain it in detail every month personally by mail or during a cofffee to all my contacts and invite other people to do the same. Let's share The Venus Project altogether!","assets/images/ideas/image-3.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Sharing my big teddy bear Tommy with other children","Hi,  I am 10 years old and am very lucky to have a lot of toys. For example my favourite big teddy bear Tommy. Sometimes I have given away my toys to other children or foundations but I don't want to get rid of Tommy. That's why I want to share him with other friends and children of my village. As from now every month Tommy will sleep at another house, I will write about the experiences and perhaps new friends I will get to know thanks to Tommy. It is great to hug Tommy so let's share him. It would be great if many other children did the same with their toys :)","assets/images/ideas/image-4.jpg"))
    this.ideas.push(this.createIdea("No Religions",
      "Muslim man offering hugs in Barcelona","Hi, my name is Cristina, I am not religious but do believe that we are not alone in this universe. As I believe in peace and love, every month I want to give an example of people from different religious backgrounds sharing small peaceful and beautiful actions in order to show that in the end we all want the same. Like this muslim man offering hugs in Barcelona just after the terrible terrorist attack the city suffered. If I am the only one sharing this kind of positive micro news perhaps it will not have a deep impact in the world... but if we did this altogether?","assets/images/ideas/image-5.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Free meeting rooms in our childrens hospital","Our childrens hospital would like to share our meeting rooms and even our auditorium to those people and organizations (friends, companies, schools, foundations) that want to have a meeting or training in a free space where you will be very close to the real problems in life and where you will also immediately change attitudes once you learn about the beautiful and tough work we are doing with our patients. We believe that many meetings or trainings should not take place in cold meeting rooms in big offices or at luxury 5 star hotels including an expensive catering. Sharing our space to have meetings is not only our way to share possessions, it will also make you realize what really matters in life. At this Idea in Action we will share every month positive experiences and trust that this will inspire many others..","assets/images/ideas/image-8.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Spiritual lessons from dogs and other animals","We often forget about the importance of animals on our planet. Fortunately there is a growing number of people taking care of protecting our animals and nature and there are even experts that dedicate their time on researching and sharing very interesting information about what animals can teach us on a spiritual basis. For example Tim van der Vliet is one of these experts sharing incredible stuff in one of his books \"Spiritual Awakening\". Every month I would like to share this kind of spiritual lessons, but at the same time am also very interested in your own experiences and opinions on this subject.","assets/images/ideas/image-9.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Shared Garden","A gardener offering his tools for free to his neighbors. A sign in his garden that says \"sharing free garden\"contact me at www.imagineallthepeople.world","assets/images/ideas/12.jpg"))
    this.ideas.push(this.createIdea("No Religions",
      "Religion and Money","A journalist showing figures of how much money diffrerent religions have in the banks"))
    this.ideas.push(this.createIdea("No Possessions",
      "Free Transport","A truck driver offering free transport when his truck is half empty","assets/images/ideas/17.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Free Room for Regugees","An 80 years old person in the Netherlands (my mother....) shares a bedroom for a refugee family from Siria waiting during months for a solution in a public refugees center"))
    this.ideas.push(this.createIdea("No Possessions",
      "No Money Communities","An economist publishing articles about new and existing models of \"no money\"communities"))
    this.ideas.push(this.createIdea("No Possessions",
      "Ex Banker","An ex banker giving weekly presentations about new ethic systems based on sharing","assets/images/ideas/20.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Food Donation","At the end of every shift restaurants should donate the left over food to local homeless shelters or food banks","assets/images/ideas/22.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Office Space for Foundations","Companies that share office space to foundations","assets/images/ideas/28.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Painting Murals","Each bordering country will come together and paint morals to cover the border walls","assets/images/ideas/38.jpg"))
    this.ideas.push(this.createIdea("No Religions",
      "Holy Gardens","Establish holy gardens that are open for anyone of any religion to pray at"))
    this.ideas.push(this.createIdea("No Countries",
      "War History","History teacher that teaches how wars were started in defense of a certain country","assets/images/ideas/46.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Global Conference","Hold a conference where someone is nominated by each country to go and give a speech as to why they love their country. This conference could be aired on TV for all children and adults to watch and learn about other countries","assets/images/ideas/47.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Food Festival","Holding a huge food festival where there are different tents setup for each country to cook native food","assets/images/ideas/48.jpg"))
    this.ideas.push(this.createIdea("No Religions",
      "Things in Common Between Different Religions"
      ,"In Indonesia a Hindu woman creates a group at \"Imagine ALL THE PEOPLE\"in order to invite other persons with other religious backgrounds in order to research all the positive things theirs religions share and  have in common."))
    this.ideas.push(this.createIdea("No Religions",
      "Teaching All Religion","Instead of learning one religion in school, children should learn a little about every religion"))
    this.ideas.push(this.createIdea("No Countries",
      "Grants for Kids","Offer grants and encourage kids to travel the world from a young age","assets/images/ideas/59.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Sharing Garden","Offering parts of your garden for children living in apartments to play and grow food","assets/images/ideas/60.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Referendum","Organizing a global symbolic referendum about who wants a world without countries","assets/images/ideas/62.jpg"))
    this.ideas.push(this.createIdea("No Religions",
      "Shared Beliefs","Organizing one big event where many different religions come together and share their beliefs with the public"))
    this.ideas.push(this.createIdea("No Countries",
      "Skyping at Schools","Organizing Skype meetings between schools of different countries to exchange cultures","assets/images/ideas/64.jpg"))
    this.ideas.push(this.createIdea("No Possessions",
      "Free Car Sharing","People that offer seats in their cars for free rides to work or for long trips","assets/images/ideas/68.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Young Speakers","Universities inviting one different nationality every week in order to speak about their culture (young speakers)","assets/images/ideas/78.jpg"))
    this.ideas.push(this.createIdea("No Countries",
      "Mexican american Peace Initiatives","A famous Mexican singer and a famous American actress start together initiatves via their social media in order to detect how many peaceful actions are currently being organized by the people to show that for many people not any border line or wall is necessary."))
    this.ideas.push(this.createIdea("No Religions",
      "A Cup of Tea with a Buddhist","A Buddhist invites people for a weekly cup of tea at his home in order to explain why you don't have to belong to a religion in order to believe that we are not alone in this universe"))
    /*
    this.ideas.push(this.createIdea("No Religions","A Cup of Tea with a Buddhist","A Buddhist invites people for a weekly cup of tea at his home in order to explain why you don't have to belong to a religion in order to believe that we are not alone in this universe"))
    this.ideas.push(this.createIdea("No Countries","Mexican american Peace","Initiatives	A famous Mexican singer and a famous American actress start together initiatves via their social media in order to detect how many peaceful actions are currently being organized by the people to show that for many people not any border line or wall is necessary."))
    this.ideas.push(this.createIdea("No Possessions","Free Song by Shakira","A famous singer (Shakira) shares a new song for free and without author rights through her social media in order to promote the \"Imagine ALL THE PEOPLE\"initiative"))
    this.ideas.push(this.createIdea("No Possessions","Free soccer field in Gerard Pique´s garden","A famous soccer player (Gerard Pique) shares a big piece of his garden where children can play soccer every Tuesday and where he even sometimes participates. He shares this initiative on his social media in order to spread our platform \"Imagine ALL THE PEOPLE\""))
    this.ideas.push(this.createIdea("No Religions","Aliens Versus Religions","A famous writer about \"ancient aliens that once visited us\"opens a group at \"Imagine ALL THE PEOPLE\"in order to find out how many people believe that we are not alone and that some way all misterious things that happened in our history (now converted into religions) are actually related to aliens"))
    this.ideas.push(this.createIdea("No Possessions","Free Documentaries","A film producer shares free material (cameras, micros. etc.) for people that want to develop theirs own small documentary about \"Imagine  ALL THE PEOPLE\""))
    this.ideas.push(this.createIdea("No Religions","Religion and Money","A journalist showing figures of how much money diffrerent religions have in the banks"))
    this.ideas.push(this.createIdea("No Possessions, No Religions, No Countries","Publishing a Blog","A new blog with small stories about our planet in 2.222"))
    this.ideas.push(this.createIdea("No Possessions","Free meeting Space for Foundations","A private business school in Mexico (IPADE) shares free class rooms, meeting rooms and even their big auditorium for any Foundation that needs free space to develop their charitable projects"))
    this.ideas.push(this.createIdea("No Possessions","Free Room for Regugees","An 80 years old person in the Netherlands (my mother....) shares a bedroom for a refugee family from Siria waiting during months for a solution in a public refugees center"))
    this.ideas.push(this.createIdea("No Religions","Islam/Catholic Couples","An Islam / Catholic couple starts a campaign via different social media in order to know how much more couples like them exist in the world and to show that people believing in different religions can love eachother, have beautiful children,  and a very happy life together"))
    this.ideas.push(this.createIdea("No Religions","Spirtuality over Religion","Being spiritual without being religious"))
    this.ideas.push(this.createIdea("No Religions","Spirtuality over Religion","Celebrities talking about their way of being spiritual without being religious"))
    this.ideas.push(this.createIdea("No Religions","Children and Religion","Children between 5 and 10 years sharing their definitions of religions, God, Universe, and Love"))
    this.ideas.push(this.createIdea("No Religions","Elevator Pitch","Different religions explained in a 90 second video as a kind of elevator pitch"))
    this.ideas.push(this.createIdea("No Religions","1 Page","Different religions explained on a 1 page by many different profiles"))
    this.ideas.push(this.createIdea("No Possessions","Sharing on Schools","Sharing pencils, paper, markers etc on local schools"))
    this.ideas.push(this.createIdea("No Religions","Holy Gardens","Establish holy gardens that are open for anyone of any religion to pray at"))
    this.ideas.push(this.createIdea("No Religions","Old Religions","Examples of old religions that don't exist anymore because of a lack of support"))
    this.ideas.push(this.createIdea("No Religions","Bible Explained","Explaining the bible in other words by a muslim"))
    this.ideas.push(this.createIdea("No Religions","Quran Explained","Explaining the quran in other words by a catholic"))
    this.ideas.push(this.createIdea("No Religions","No Religious Schools","Getting rid of religious schools"))
    this.ideas.push(this.createIdea("No Religions","Things in Common Between Different Religions","In Indonesia a Hindu woman creates a group at \"Imagine ALL THE PEOPLE\"in order to invite other persons with other religious backgrounds in order to research all the positive things theirs religions share and  have in common."))
    this.ideas.push(this.createIdea("No Religions","Teaching All Religion","Instead of learning one religion in school, children should learn a little about every religion"))
    this.ideas.push(this.createIdea("No Religions","Different Religions","Make a list with all the things that are forbidden in the different religions. Something to think"))
    this.ideas.push(this.createIdea("No Religions","Shared Coffee","Muslims and Catholics coming together to share a coffee"))
    this.ideas.push(this.createIdea("No Religions","Similarities in Religions","No matter what the religion is, I have found out that all religions are very simliar. A teacher could go around the world and explain in schools and offices how similar different religions are."))
    this.ideas.push(this.createIdea("No Countries","Global School","Offer a school where all the history of countries are taught"))
    this.ideas.push(this.createIdea("No Possessions, No Countries","Rooms for Refugees","Offering rooms for refugees"))
    this.ideas.push(this.createIdea("No Religions","Shared Beliefs","Organizing one big event where many different religions come together and share their beliefs with the public"))
    this.ideas.push(this.createIdea("No Religions","Peace Workshops","Peace workshops organized by 5 different religions, then share the conversations on Youtube"))
    this.ideas.push(this.createIdea("No Religions","Friendships Between Different Religions","Sharing real and positive stories of friendships between muslims and christians."))
    this.ideas.push(this.createIdea("No Possessions, No Religions, No Countries","Publishing a Book","Writing a book about a new world \"Imagine\"2.222"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Bike","A bike needs to move, not to stand still. Use mine","https://www.bricklanebikes.co.uk/content/images/thumbs/0025433_6ku-odyssey-8spd-city-bike-delano-black_1200.jpeg"))
    this.ideas.push(this.createIdea("No Possessions","Shared Meeting Room","A big meeting room, free of charge, for new entrepreneurs","https://ak8.picdn.net/shutterstock/videos/8474956/thumb/1.jpg?i10c=img.resize(height:160)"))
    this.ideas.push(this.createIdea("No Religions","Love Over Religion","A couple just married and come from 2 different (ex) religions","http://1.bp.blogspot.com/-v4HrYyBxYFU/TjVzr5JSf2I/AAAAAAAAAPs/7s0Y28TjzF4/s1600/interfaithheads.jpg"))
    this.ideas.push(this.createIdea("No Countries","Film Maker","A film producer developing a project with the goal to see world peace in 2.222","http://cdn2.rode.com/images/products/filmmaker/gallery/1.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Shared Garden","A gardener offering his tools for free to his neighbors. A sign in his garden that says \"sharing free garden\"contact me at www.imagineallthepeople.world","http://www.trendspotting.com.au/uploads/Image/eco_trend_garden_sharing_urban_farming_landshare_6(1).jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Art","A teacher asking her kids to draw a new planet without countries","https://qph.ec.quoracdn.net/main-qimg-5babd30b15ed97cfc04c2317ef7e024e-c"))
    this.ideas.push(this.createIdea("No Possessions","Free Transport","A truck driver offering free transport when his truck is half empty","https://www.fueloyal.com/wp-content/uploads/2016/06/10-Secrets-To-Increase-Your-Truck-Driver-Salary-4.png"))
    this.ideas.push(this.createIdea("No Possessions","No Money Communities","An economist publishing articles about new and existing models of \"no money\"communities","http://hunsci.com/WDF-950635.html"))
    this.ideas.push(this.createIdea("No Possessions","Ex Banker","An ex banker giving weekly presentations about new ethic systems based on sharing","http://media.salon.com/2013/12/dimon_blankfein.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Food Donation","At the end of every shift retaurants should donate the left over food to local homeless shelters or food banks","https://www.aafvhope.org/wp-content/uploads/2016/03/food-donations.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Passports","Changing expired passports into a symbolic global passport and display it as artwork","http://www.channer.tv/tuesda651.jpg"))
    this.ideas.push(this.createIdea("No Countries","Double Nationalities","Children with double nationalities share experiences of speaking different native languages                             ","http://tinyhandsapps.com/ka/media/files/Blog%20Pictures%20/shutterstock_204013132.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Office Space for Foundations","Companies that share office space to foundations","http://yfsmagazine.com/wp-content/uploads/2015/10/3-Hidden-Advantages-Of-Shared-Office-Space.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Friendship","Counting friendships between Israel and Palestine and other countries in war","https://thumbs.dreamstime.com/z/global-friendship-11652606.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Museum","Create an art museum and let each country sumbit their most sacred piece of art to be displayed and represent their country","https://s-media-cache-ak0.pinimg.com/736x/6e/83/5d/6e835d02179a82d693a14bf3ff047265--sunset-paintings-canvas-paintings.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Language","Create an international language that will be taught at all schools all over the world","http://blog.activityhero.com/wp-content/uploads/2013/06/Language.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Clothes","Sharing expensive suits and dresses","https://kpbs.media.clients.ellingtoncms.com/img/photos/2009/05/18/Prom_010_tx700.jpg?8e0a8887e886a6ff6e13ee030987b3616fc57cd3"))
    this.ideas.push(this.createIdea("No Possessions","Bedding Sharing","Sharing your blankets and bed sheets","http://thelatesthiss.org/wp-content/uploads/2012/10/Oct-29-2012-087.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Wishlist","During the holidays, people can adopt the wishlist of a less fortunate child and buy them gifts","http://csarmy.org/images/photos/programs_angeltree.jpg"))
    this.ideas.push(this.createIdea("No Countries","Painting Morals","Each bordering country will come together and paint morals to cover the border walls","https://cronkitenews.azpbs.org/wp-content/uploads/2017/02/borderfence1start-copy-800.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Sports","Encourage more world wide events like The Olympics! Countries all over come together to cheer for a common goal of sports.","http://i.dailymail.co.uk/i/pix/2012/08/05/article-2184128-1466E255000005DC-901_634x363.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Houses","Exchanging appartments and houses. A kind of Airbnb, but without money.","http://i3.liverpoolecho.co.uk/incoming/article12942685.ece/ALTERNATES/s615/Travelodge-room-with-truckle-beds.jpg"))
    this.ideas.push(this.createIdea("No Countries","War History","History teacher that teaches how wars were started in defense of a certain country","http://www.resumeok.com/wp-content/uploads/2012/10/History-teacher-job-interview.jpg"))
    this.ideas.push(this.createIdea("No Countries","Global Conference","Hold a conference where someone is nominated by each country to go and give a speech as to why they love their country. This conference could be aired on TV for all children and adults to watch and learn about other countries","http://amysheehan.net/wp-content/uploads/2011/05/person-giving-a-speech.jpg"))
    this.ideas.push(this.createIdea("No Countries","Food Festival","Holding a huge food festival where there are different tents setup for each country to cook native food","http://www.tamilnetonline.com/wp-content/uploads/2014/01/Food-Festival.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Free Meeting Spaces","Hospitals offering their meeting rooms and other spaces  for company meetings","http://www.sunandmoonhotel.com/uploads/images/Gallery/Meeting-Room-Board-Room-Gallery/meeting-room-g1.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Toys","Kids sharing their toys with other kids and in return making more friends","http://static.kidspot.com.au/cm_assets/67813/group-of-kids-at-school-20151214163718.jpg~q75,dx720y432u1r1gg,c--.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Bike for Share","Leaving my bike in the city center painted with the text \"Bike for Share\"","http://1.bp.blogspot.com/-D1lf0KQwhtA/VmjBJbHCj5I/AAAAAAAABZQ/Dd0ugmhc670/s1600/Hangzhou%2BTech%2BSmart%2BBike.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Clothing Share","Making a habit of going through your old clothes every month and sharing the ones you don’t wear anymore.","http://i.huffpost.com/gen/1938917/images/o-DONATE-CLOTHES-facebook.jpg"))
    this.ideas.push(this.createIdea("No Countries","Grants for Kids","Offer grants and encourage kids to travel the world from a young age","http://3.bp.blogspot.com/-Zbz5IpNUAyY/Ts0lexqBOyI/AAAAAAAAB9o/Cz_uhFdtn84/s1600/the+nomadic+family+kids+in+backpacks.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Garden","Offering parts of your garden for children living in apartments to play and grow food","http://www.smh.com.au/content/dam/images/2/h/g/p/p/image.related.articleLeadwide.620x349.2hgob.png/1365565010850.jpg"))
    this.ideas.push(this.createIdea("No Countries","Referendum","Organizing a global symbolic referendum about who wants a world without countries","http://www.termcoord.eu/wp-content/uploads/2015/06/43-referendum_immagine.jpg"))
    this.ideas.push(this.createIdea("No Countries","Skyping at Schools","Organizing Skype meetings between schools of different countries to exchange cultures","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Skype_logo.svg/1200px-Skype_logo.svg.png"))
    this.ideas.push(this.createIdea("No Countries","Peaceful small actions","Peaceful small actions on the border line between the US and Mexico like cooking native food","http://static.snopes.com/app/uploads/2016/10/border1.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Art Sharing","People share and give away their art for free","http://www.agora-gallery.com/advice/wp-content/uploads/20151203-172657-IMG_9979-300x200.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Free Car Sharing","People that offer seats in their cars for free rides to work or for long trips","http://www.capitolpark-travel.co.uk/wp-content/uploads/2016/04/Car-Sharing.jpg"))
    this.ideas.push(this.createIdea("No Countries","Less Flags","Practicing saying goodbye to your flag. People show how they put flags in a garbage bag.","http://c8.alamy.com/comp/B5PMY4/american-flag-resting-in-trash-can-B5PMY4.jpg"))
    this.ideas.push(this.createIdea("No Possessions, No Religions, No Countries","Auroville Community","Promoting the Auroville Community in India","https://www.auroville.org/"))
    this.ideas.push(this.createIdea("No Possessions, No Religions, No Countries","Venus Project","Promoting the Venus Project USA","https://www.thevenusproject.com/"))
    this.ideas.push(this.createIdea("No Possessions","Sharing Money","Saving a set amount of money from each paycheck and at the end of a year share it to a homeless person","http://i.huffpost.com/gen/1389965/images/o-SEATTLE-HOMELESS-TOUR-facebook.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Free Car Sharing","Sharing an unused car during the weekend","https://s-media-cache-ak0.pinimg.com/originals/61/49/40/61494099b3fc181f41f0bbf6708578f2.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Neighborhood Library","Sharing books with neighbors and creating a small local library","http://www.maabeti.com/images/content/1379499012.jpg"))
    this.ideas.push(this.createIdea("No Possessions","Horse Sharing","Sharing my horse for excursions on Sundays","http://www.horseandrideruk.com/wp-content/uploads/2016/02/HR0519Bob-767x511.jpg"))
    this.ideas.push(this.createIdea("No Countries","Pen Pals","Starting at a young age, have kids pair up with other kids in other countries and have them write letters to eachother about their country","http://www.bluemaize.net/im/arts-crafts-sewing/pen-pals-9.png"))
    this.ideas.push(this.createIdea("No Countries","Young Speakers","Universities inviting one different nationality every week in order to speak about their culture (young speakers)","https://i.ytimg.com/vi/V4JUlZ5wx5Q/maxresdefault.jpg"))
    this.ideas.push(this.createIdea("No Countries","One History Book","Writing one history book of the history of the whole world","http://whytoread.com/wp-content/uploads/2014/09/history-books.jpg"))
    */
  }

  createIdea(type, title, description, imageURL=null) {
    let temp:Idea = new Idea();
    temp.typeSelect = type;
    temp.title = title;
    temp.description = description;
    temp.user_id = 'xxx';
    temp.followers = [];
    if (imageURL)
      temp.imgURL =imageURL;
    return temp;
  }
}
