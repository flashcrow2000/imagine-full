function createIdea(type, title, description, imageURL) {
    let temp = {};
    temp.typeSelect = type;
    temp.title = title;
    temp.description = description;
    //temp.user_id = this.currentUser._id;
    if (imageURL != null) {
    temp.imgUrl =imageURL;
    } else {
        if (type.includes("No Possessions") && (type.includes("No Countries") || type.includes("No Religions")))  temp.imgUrl = "//imagineallthepeople.world/imagine/assets/images/slider_generic_imagine.jpg";
        else if (type.includes("No Countries")) temp.imgUrl = "//imagineallthepeople.world/imagine/assets/images/slider_countries_imagine.jpg";
        else if (type.includes("No Possessions")) temp.imgUrl = "//imagineallthepeople.world/imagine/assets/images/slider_possessions_imagine.jpg";
        else if (type.includes("No Religions")) temp.imgUrl = "//imagineallthepeople.world/imagine/assets/images/slider_religion_imagine.jpg";
    }
    return temp;
  }
  
  var results = [];

    results.push(createIdea("No Religions","A Cup of Tea with a Buddhist","A Buddhist invites people for a weekly cup of tea at his home in order to explain why you don't have to belong to a religion in order to believe that we are not alone in this universe"))
    results.push(createIdea("No Countries","Mexican american Peace","Initiatives    A famous Mexican singer and a famous American actress start together initiatves via their social media in order to detect how many peaceful actions are currently being organized by the people to show that for many people not any border line or wall is necessary."))
    results.push(createIdea("No Possessions","Free Song by Shakira","A famous singer (Shakira) shares a new song for free and without author rights through her social media in order to promote the \"Imagine ALL THE PEOPLE\"initiative"))
    results.push(createIdea("No Possessions","Free soccer field in Gerard Pique´s garden","A famous soccer player (Gerard Pique) shares a big piece of his garden where children can play soccer every Tuesday and where he even sometimes participates. He shares this initiative on his social media in order to spread our platform \"Imagine ALL THE PEOPLE\""))
    results.push(createIdea("No Religions","Aliens Versus Religions","A famous writer about \"ancient aliens that once visited us\"opens a group at \"Imagine ALL THE PEOPLE\"in order to find out how many people believe that we are not alone and that some way all misterious things that happened in our history (now converted into religions) are actually related to aliens"))
    results.push(createIdea("No Possessions","Free Documentaries","A film producer shares free material (cameras, micros. etc.) for people that want to develop theirs own small documentary about \"Imagine  ALL THE PEOPLE\""))
    results.push(createIdea("No Religions","Religion and Money","A journalist showing figures of how much money diffrerent religions have in the banks"))
    results.push(createIdea("No Possessions, No Religions, No Countries","Publishing a Blog","A new blog with small stories about our planet in 2.222"))
    results.push(createIdea("No Possessions","Free meeting Space for Foundations","A private business school in Mexico (IPADE) shares free class rooms, meeting rooms and even their big auditorium for any Foundation that needs free space to develop their charitable projects"))
    results.push(createIdea("No Possessions","Free Room for Regugees","An 80 years old person in the Netherlands (my mother....) shares a bedroom for a refugee family from Siria waiting during months for a solution in a public refugees center"))
    results.push(createIdea("No Religions","Islam/Catholic Couples","An Islam / Catholic couple starts a campaign via different social media in order to know how much more couples like them exist in the world and to show that people believing in different religions can love eachother, have beautiful children,  and a very happy life together"))
    results.push(createIdea("No Religions","Spirtuality over Religion","Being spiritual without being religious"))
    results.push(createIdea("No Religions","Spirtuality over Religion","Celebrities talking about their way of being spiritual without being religious"))
    results.push(createIdea("No Religions","Children and Religion","Children between 5 and 10 years sharing their definitions of religions, God, Universe, and Love"))
    results.push(createIdea("No Religions","Elevator Pitch","Different religions explained in a 90 second video as a kind of elevator pitch"))
    results.push(createIdea("No Religions","1 Page","Different religions explained on a 1 page by many different profiles"))
    results.push(createIdea("No Possessions","Sharing on Schools","Sharing pencils, paper, markers etc on local schools"))
    results.push(createIdea("No Religions","Holy Gardens","Establish holy gardens that are open for anyone of any religion to pray at"))
    results.push(createIdea("No Religions","Old Religions","Examples of old religions that don't exist anymore because of a lack of support"))
    results.push(createIdea("No Religions","Bible Explained","Explaining the bible in other words by a muslim"))
    results.push(createIdea("No Religions","Quran Explained","Explaining the quran in other words by a catholic"))
    results.push(createIdea("No Religions","No Religious Schools","Getting rid of religious schools"))
    results.push(createIdea("No Religions","Things in Common Between Different Religions","In Indonesia a Hindu woman creates a group at \"Imagine ALL THE PEOPLE\"in order to invite other persons with other religious backgrounds in order to research all the positive things theirs religions share and  have in common."))
    results.push(createIdea("No Religions","Teaching All Religion","Instead of learning one religion in school, children should learn a little about every religion"))
    results.push(createIdea("No Religions","Different Religions","Make a list with all the things that are forbidden in the different religions. Something to think"))
    results.push(createIdea("No Religions","Shared Coffee","Muslims and Catholics coming together to share a coffee"))
    results.push(createIdea("No Religions","Similarities in Religions","No matter what the religion is, I have found out that all religions are very simliar. A teacher could go around the world and explain in schools and offices how similar different religions are."))
    results.push(createIdea("No Countries","Global School","Offer a school where all the history of countries are taught"))
    results.push(createIdea("No Possessions, No Countries","Rooms for Refugees","Offering rooms for refugees"))
    results.push(createIdea("No Religions","Shared Beliefs","Organizing one big event where many different religions come together and share their beliefs with the public"))
    results.push(createIdea("No Religions","Peace Workshops","Peace workshops organized by 5 different religions, then share the conversations on Youtube"))
    results.push(createIdea("No Religions","Friendships Between Different Religions","Sharing real and positive stories of friendships between muslims and christians."))
    results.push(createIdea("No Possessions, No Religions, No Countries","Publishing a Book","Writing a book about a new world \"Imagine\"2.222"))
    results.push(createIdea("No Possessions","Sharing Bike","A bike needs to move, not to stand still. Use mine","//www.bricklanebikes.co.uk/content/images/thumbs/0025433_6ku-odyssey-8spd-city-bike-delano-black_1200.jpeg"))
    results.push(createIdea("No Possessions","Shared Meeting Room","A big meeting room, free of charge, for new entrepreneurs","//ak8.picdn.net/shutterstock/videos/8474956/thumb/1.jpg?i10c=img.resize(height:160)"))
    results.push(createIdea("No Religions","Love Over Religion","A couple just married and come from 2 different (ex) religions","//1.bp.blogspot.com/-v4HrYyBxYFU/TjVzr5JSf2I/AAAAAAAAAPs/7s0Y28TjzF4/s1600/interfaithheads.jpg"))
    results.push(createIdea("No Countries","Film Maker","A film producer developing a project with the goal to see world peace in 2.222","//cdn2.rode.com/images/products/filmmaker/gallery/1.jpg"))
    results.push(createIdea("No Possessions","Shared Garden","A gardener offering his tools for free to his neighbors. A sign in his garden that says \"sharing free garden\"contact me at www.imagineallthepeople.world","//www.trendspotting.com.au/uploads/Image/eco_trend_garden_sharing_urban_farming_landshare_6(1).jpg"))
    results.push(createIdea("No Countries","Global Art","A teacher asking her kids to draw a new planet without countries","//qph.ec.quoracdn.net/main-qimg-5babd30b15ed97cfc04c2317ef7e024e-c"))
    results.push(createIdea("No Possessions","Free Transport","A truck driver offering free transport when his truck is half empty","//www.fueloyal.com/wp-content/uploads/2016/06/10-Secrets-To-Increase-Your-Truck-Driver-Salary-4.png"))
    results.push(createIdea("No Possessions","No Money Communities","An economist publishing articles about new and existing models of \"no money\"communities"))
    results.push(createIdea("No Possessions","Ex Banker","An ex banker giving weekly presentations about new ethic systems based on sharing","//media.salon.com/2013/12/dimon_blankfein.jpg"))
    results.push(createIdea("No Possessions","Food Donation","At the end of every shift retaurants should donate the left over food to local homeless shelters or food banks","//www.aafvhope.org/wp-content/uploads/2016/03/food-donations.jpg"))
    results.push(createIdea("No Countries","Global Passports","Changing expired passports into a symbolic global passport and display it as artwork","//imagineallthepeople.world/imagine/assets/images/local/tuesda651.jpg"))
    results.push(createIdea("No Countries","Double Nationalities","Children with double nationalities share experiences of speaking different native languages                             ","//tinyhandsapps.com/ka/media/files/Blog%20Pictures%20/shutterstock_204013132.jpg"))
    results.push(createIdea("No Possessions","Office Space for Foundations","Companies that share office space to foundations"))
    results.push(createIdea("No Countries","Global Friendship","Counting friendships between Israel and Palestine and other countries in war","//thumbs.dreamstime.com/z/global-friendship-11652606.jpg"))
    results.push(createIdea("No Countries","Global Museum","Create an art museum and let each country sumbit their most sacred piece of art to be displayed and represent their country","//s-media-cache-ak0.pinimg.com/736x/6e/83/5d/6e835d02179a82d693a14bf3ff047265--sunset-paintings-canvas-paintings.jpg"))
    results.push(createIdea("No Countries","Global Language","Create an international language that will be taught at all schools all over the world","//blog.activityhero.com/wp-content/uploads/2013/06/Language.jpg"))
    results.push(createIdea("No Possessions","Sharing Clothes","Sharing expensive suits and dresses","//kpbs.media.clients.ellingtoncms.com/img/photos/2009/05/18/Prom_010_tx700.jpg?8e0a8887e886a6ff6e13ee030987b3616fc57cd3"))
    results.push(createIdea("No Possessions","Bedding Sharing","Sharing your blankets and bed sheets","//thelatesthiss.org/wp-content/uploads/2012/10/Oct-29-2012-087.jpg"))
    results.push(createIdea("No Possessions","Wishlist","During the holidays, people can adopt the wishlist of a less fortunate child and buy them gifts","//csarmy.org/images/photos/programs_angeltree.jpg"))
    results.push(createIdea("No Countries","Painting Morals","Each bordering country will come together and paint morals to cover the border walls","//cronkitenews.azpbs.org/wp-content/uploads/2017/02/borderfence1start-copy-800.jpg"))
    results.push(createIdea("No Countries","Global Sports","Encourage more world wide events like The Olympics! Countries all over come together to cheer for a common goal of sports.","//i.dailymail.co.uk/i/pix/2012/08/05/article-2184128-1466E255000005DC-901_634x363.jpg"))
    results.push(createIdea("No Possessions","Sharing Houses","Exchanging appartments and houses. A kind of Airbnb, but without money.","//i3.liverpoolecho.co.uk/incoming/article12942685.ece/ALTERNATES/s615/Travelodge-room-with-truckle-beds.jpg"))
    results.push(createIdea("No Countries","War History","History teacher that teaches how wars were started in defense of a certain country","//www.resumeok.com/wp-content/uploads/2012/10/History-teacher-job-interview.jpg"))
    results.push(createIdea("No Countries","Global Conference","Hold a conference where someone is nominated by each country to go and give a speech as to why they love their country. This conference could be aired on TV for all children and adults to watch and learn about other countries","//amysheehan.net/wp-content/uploads/2011/05/person-giving-a-speech.jpg"))
    results.push(createIdea("No Countries","Food Festival","Holding a huge food festival where there are different tents setup for each country to cook native food","//www.tamilnetonline.com/wp-content/uploads/2014/01/Food-Festival.jpg"))
    results.push(createIdea("No Possessions","Free Meeting Spaces","Hospitals offering their meeting rooms and other spaces  for company meetings","//www.sunandmoonhotel.com/uploads/images/Gallery/Meeting-Room-Board-Room-Gallery/meeting-room-g1.jpg"))
    results.push(createIdea("No Possessions","Sharing Toys","Kids sharing their toys with other kids and in return making more friends","//static.kidspot.com.au/cm_assets/67813/group-of-kids-at-school-20151214163718.jpg~q75,dx720y432u1r1gg,c--.jpg"))
    results.push(createIdea("No Possessions","Bike for Share","Leaving my bike in the city center painted with the text \"Bike for Share\"","//1.bp.blogspot.com/-D1lf0KQwhtA/VmjBJbHCj5I/AAAAAAAABZQ/Dd0ugmhc670/s1600/Hangzhou%2BTech%2BSmart%2BBike.jpg"))
    results.push(createIdea("No Possessions","Clothing Share","Making a habit of going through your old clothes every month and sharing the ones you don’t wear anymore.","//i.huffpost.com/gen/1938917/images/o-DONATE-CLOTHES-facebook.jpg"))
    results.push(createIdea("No Countries","Grants for Kids","Offer grants and encourage kids to travel the world from a young age","//3.bp.blogspot.com/-Zbz5IpNUAyY/Ts0lexqBOyI/AAAAAAAAB9o/Cz_uhFdtn84/s1600/the+nomadic+family+kids+in+backpacks.jpg"))
    results.push(createIdea("No Possessions","Sharing Garden","Offering parts of your garden for children living in apartments to play and grow food","//www.smh.com.au/content/dam/images/2/h/g/p/p/image.related.articleLeadwide.620x349.2hgob.png/1365565010850.jpg"))
    results.push(createIdea("No Countries","Referendum","Organizing a global symbolic referendum about who wants a world without countries","//www.termcoord.eu/wp-content/uploads/2015/06/43-referendum_immagine.jpg"))
    results.push(createIdea("No Countries","Skyping at Schools","Organizing Skype meetings between schools of different countries to exchange cultures","//upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Skype_logo.svg/1200px-Skype_logo.svg.png"))
    results.push(createIdea("No Countries","Peaceful small actions","Peaceful small actions on the border line between the US and Mexico like cooking native food","//static.snopes.com/app/uploads/2016/10/border1.jpg"))
    results.push(createIdea("No Possessions","Art Sharing","People share and give away their art for free","//www.agora-gallery.com/advice/wp-content/uploads/20151203-172657-IMG_9979-300x200.jpg"))
    results.push(createIdea("No Possessions","Free Car Sharing","People that offer seats in their cars for free rides to work or for long trips","//www.capitolpark-travel.co.uk/wp-content/uploads/2016/04/Car-Sharing.jpg"))
    results.push(createIdea("No Countries","Less Flags","Practicing saying goodbye to your flag. People show how they put flags in a garbage bag.","//c8.alamy.com/comp/B5PMY4/american-flag-resting-in-trash-can-B5PMY4.jpg"))
    results.push(createIdea("No Possessions, No Religions, No Countries","Auroville Community","Promoting the Auroville Community in India","//www.auroville.org/system/slideshow_images/images/000/000/004/slideshow/HomePageSlide1-490.jpg?1483448750"))
    results.push(createIdea("No Possessions, No Religions, No Countries","Venus Project","Promoting the Venus Project USA"))
    results.push(createIdea("No Possessions","Sharing Money","Saving a set amount of money from each paycheck and at the end of a year share it to a homeless person","//i.huffpost.com/gen/1389965/images/o-SEATTLE-HOMELESS-TOUR-facebook.jpg"))
    results.push(createIdea("No Possessions","Free Car Sharing","Sharing an unused car during the weekend","//s-media-cache-ak0.pinimg.com/originals/61/49/40/61494099b3fc181f41f0bbf6708578f2.jpg"))
    results.push(createIdea("No Possessions","Neighborhood Library","Sharing books with neighbors and creating a small local library","//www.maabeti.com/images/content/1379499012.jpg"))
    results.push(createIdea("No Possessions","Horse Sharing","Sharing my horse for excursions on Sundays","//www.horseandrideruk.com/wp-content/uploads/2016/02/HR0519Bob-767x511.jpg"))
    results.push(createIdea("No Countries","Pen Pals","Starting at a young age, have kids pair up with other kids in other countries and have them write letters to eachother about their country","//www.bluemaize.net/im/arts-crafts-sewing/pen-pals-9.png"))
    results.push(createIdea("No Countries","Young Speakers","Universities inviting one different nationality every week in order to speak about their culture (young speakers)","//i.ytimg.com/vi/V4JUlZ5wx5Q/maxresdefault.jpg"))
    results.push(createIdea("No Countries","One History Book","Writing one history book of the history of the whole world","//whytoread.com/wp-content/uploads/2014/09/history-books.jpg"))
  

    for (let idea of results) {
        document.getElementById("ideas").innerHTML+= `
        <div class="col-sm-6 col-md-6">
            <div class="thumbnail">
                <div class="thumImg">
                    <div class="buttonbar">
                        <i class="fa fa-bars"></i>
                    </div>
                    <img width="100%" src="${idea.imgUrl}" alt="${idea.title}" class="imageFit lazyload">
                </div>
                <div class="caption">
                    <h3 class="blogPost-title">${idea.title}</h3>
                    <p>${idea.description}</p>
                </div>
            </div>
        </div>`;
    }