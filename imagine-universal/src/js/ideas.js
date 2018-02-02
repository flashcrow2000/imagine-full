function createIdea(type, title, description, imageURL) {
    let temp = {};
    temp.typeSelect = type;
    temp.title = title;
    temp.description = description;
    //temp.user_id = this.currentUser._id;
    if (imageURL != null) {
    temp.imgUrl =imageURL;
    } else {
        if (type.includes("No Possessions") && (type.includes("No Countries") || type.includes("No Religions")))  temp.imgUrl = "assets/images/slider_generic_imagine.jpg";
        else if (type.includes("No Countries")) temp.imgUrl = "assets/images/slider_countries_imagine.jpg";
        else if (type.includes("No Possessions")) temp.imgUrl = "assets/images/slider_possessions_imagine.jpg";
        else if (type.includes("No Religions")) temp.imgUrl = "assets/images/slider_religion_imagine.jpg";
    }
    return temp;
  }
  
  var results = [];

    results.push(createIdea("No Religions","My daughters are my masters and my micro religion","I have got 2 beautiful daughters called Monica and Africa. Monica was born with a serious brain damage and Africa is perfectly healthy. But both are teaching me every day important things about life, about releasing fears, about enjoying small moments and thinking very straightforward about how our world peace should work. It's just a matter of watching them and carefully listening to them. Every month I would like to share a micro example of what my daughters teach me and invite people to do the same as I am convinced that we all have our masters and spiritual leaders at home and much closer than we can imagine.","assets/images/ideas/image-1.jpg"))
    results.push(createIdea("No Countries","NO to passports, YES to cultures and languages","My name is Jil and to be honest I don't like my Dutch passport. But I do like many things of my Dutch culture and language! Therefore once a month  I will share one typical Dutch tradition or word and invite people to do the same about their cultures and languages. For example what do you think about ice skating in our cold winters in the Netherlands? Check out this video, this is beautiful <a href='https://www.youtube.com/watch?v=0KZtgWoARsw'>youtube.com/watch?v=0KZtgWoARsw</a>","assets/images/ideas/image-2.jpg"))
    results.push(createIdea("No Possessions, No Religions, No Countries","Spreading The Venus Project with friends and family","It's great to learn that a lot of people already started working a long time ago on a complete new world without possessions, religions and countries. For me the best example is The Venus Project which is incredible. Here you see in a short video what they do and what they already achieved. <a href='https://www.youtube.com/watch?v=gco1UUXFH4M'>youtube.com/watch?v=gco1UUXFH4M</a> </br></br>As I truly believe that everyone should know about this beautiful initiative (unfortunately this is still not the case)  I will share it with my friends and familiy. I won't just post it once on my social networks. I will explain it in detail every month personally by mail or during a cofffee to all my contacts and invite other people to do the same. Let's share The Venus Project alltogether!","assets/images/ideas/image-3.jpg"))
    results.push(createIdea("No Possessions","Sharing my big teddy bear Tommy with other children","Hi,  I am 10 years old and am very lucky to have a lot of toys. For example my favourite big teddy bear Tommy. Sometimes I have given away my toys to other children or foundations but I don't want to get rid of Tommy. That's why I want to share him with other friends and children of my village. As from now every month Tommy will sleep at another house, I will write about the experiences and perhaps new friends I will get to know thanks to Tommy. It is great to hug Tommy so let's share him. It would be great if many other children did the same with their toys :)","assets/images/ideas/image-4.jpg"))
    results.push(createIdea("No Religions","Muslim man offering hugs in Barcelona","Hi, my name is Cristina, I am not religious but do believe that we are not alone in this universe. As I believe in peace and love, every month I want to give an example of people from different religious backgrounds sharing small peaceful and beautiful actions in order to show that in the end we all want the same. Like this muslim man offering hugs in Barcelona just after the terrible terrorist attack the city suffered...<a href='https://www.youtube.com/watch?v=YuiIWFkvVYU'>https://www.youtube.com/watch?v=YuiIWFkvVYU</a> </br>If I am the only one sharing this kind of positive micro news perhaps it will not have a deep impact in the world... but if we did this alltogether?","assets/images/ideas/image-5.jpg"))
    results.push(createIdea("No Possessions","Free meeting rooms in our childrens hospital","Our childrens hospital would like to share our meeting rooms and even our auditorium to those people and organizations (friends, companies, schools, foundations) that want to have a meeting or training in a free space where you will be very close to the real problems in life and where you will also immediately change attitudes once you learn about the beautiful and tough work we are doing with our patients. We believe that many meetings or trainings should not take place in cold meeting rooms in big offices or at luxury 5 star hotels including an expensive catering. Sharing our space to have meetings is not only our way to share possessions, it will also make you realize what really matters in life. At this Idea in Action we will share every month positive experiences and trust that this will inspire many others..","assets/images/ideas/image-8.jpg"))
    results.push(createIdea("No Possessions","Spiritual lessons from dogs and other animals","We often forget about the importance of animals on our planet. Fortunately there is a growing number of people taking care of protecting our animals and nature and there are even experts that dedicate their time on researching and sharing very interesting information about what animals can teach us on a spiritual basis. For example Tim van der Vliet is one of these experts sharing incredible stuff in one of his books \"Spiritual Awakening\" <a href='https://www.healyourlife.com/5-spiritual-lessons-you-can-learn-from-your-dog'>www.healyourlife.com/5-spiritual-lessons-you-can-learn-from-your-dog</a> Every month I would like to share this kind of spiritual lessons, but at the same time am also very interested in your own experiences and opinions on this subject.","assets/images/ideas/image-9.jpg"))
    results.push(createIdea("No Religions","A Cup of Tea with a Buddhist","A Buddhist invites people for a weekly cup of tea at his home in order to explain why you don't have to belong to a religion in order to believe that we are not alone in this universe"))
    results.push(createIdea("No Countries","Mexican american Peace Initiatives","A famous Mexican singer and a famous American actress start together initiatves via their social media in order to detect how many peaceful actions are currently being organized by the people to show that for many people not any border line or wall is necessary."))
    results.push(createIdea("No Possessions","Shared Garden","A gardener offering his tools for free to his neighbors. A sign in his garden that says \"sharing free garden\"contact me at www.imagineallthepeople.world","assets/images/ideas/12.jpg"))
    results.push(createIdea("No Religions","Religion and Money","A journalist showing figures of how much money diffrerent religions have in the banks"))
    results.push(createIdea("No Possessions","Free Transport","A truck driver offering free transport when his truck is half empty","assets/images/ideas/17.jpg"))
    results.push(createIdea("No Possessions","Free Room for Regugees","An 80 years old person in the Netherlands (my mother....) shares a bedroom for a refugee family from Siria waiting during months for a solution in a public refugees center"))
    results.push(createIdea("No Possessions","No Money Communities","An economist publishing articles about new and existing models of \"no money\"communities"))
    results.push(createIdea("No Possessions","Ex Banker","An ex banker giving weekly presentations about new ethic systems based on sharing","assets/images/ideas/20.jpg"))
    results.push(createIdea("No Possessions","Food Donation","At the end of every shift restaurants should donate the left over food to local homeless shelters or food banks","assets/images/ideas/22.jpg"))
    results.push(createIdea("No Possessions","Office Space for Foundations","Companies that share office space to foundations","assets/images/ideas/28.jpg"))
    results.push(createIdea("No Countries","Painting Murals","Each bordering country will come together and paint morals to cover the border walls","assets/images/ideas/38.jpg"))
    results.push(createIdea("No Religions","Holy Gardens","Establish holy gardens that are open for anyone of any religion to pray at"))
    results.push(createIdea("No Countries","War History","History teacher that teaches how wars were started in defense of a certain country","assets/images/ideas/46.jpg"))
    results.push(createIdea("No Countries","Global Conference","Hold a conference where someone is nominated by each country to go and give a speech as to why they love their country. This conference could be aired on TV for all children and adults to watch and learn about other countries","assets/images/ideas/47.jpg"))
    results.push(createIdea("No Countries","Food Festival","Holding a huge food festival where there are different tents setup for each country to cook native food","assets/images/ideas/48.jpg"))
    results.push(createIdea("No Religions","Things in Common Between Different Religions","In Indonesia a Hindu woman creates a group at \"Imagine ALL THE PEOPLE\"in order to invite other persons with other religious backgrounds in order to research all the positive things theirs religions share and  have in common."))
    results.push(createIdea("No Religions","Teaching All Religion","Instead of learning one religion in school, children should learn a little about every religion"))
    results.push(createIdea("No Countries","Grants for Kids","Offer grants and encourage kids to travel the world from a young age","assets/images/ideas/59.jpg"))
    results.push(createIdea("No Possessions","Sharing Garden","Offering parts of your garden for children living in apartments to play and grow food","assets/images/ideas/60.jpg"))
    results.push(createIdea("No Countries","Referendum","Organizing a global symbolic referendum about who wants a world without countries","assets/images/ideas/62.jpg"))
    results.push(createIdea("No Religions","Shared Beliefs","Organizing one big event where many different religions come together and share their beliefs with the public"))
    results.push(createIdea("No Countries","Skyping at Schools","Organizing Skype meetings between schools of different countries to exchange cultures","assets/images/ideas/64.jpg"))
    results.push(createIdea("No Possessions","Free Car Sharing","People that offer seats in their cars for free rides to work or for long trips","assets/images/ideas/68.jpg"))
    results.push(createIdea("No Countries","Young Speakers","Universities inviting one different nationality every week in order to speak about their culture (young speakers)","assets/images/ideas/78.jpg"))


    for (let idea of results) {
        document.getElementById("ideas").innerHTML+= `
        <div class="col-sm-6 col-md-6 thumbnail_wrap">
            <div class="thumbnail">
                <div class="thumImg">
                    <img width="100%" src="${idea.imgUrl}" alt="${idea.title}" class="imageFit lazyload">
                </div>
                <div class="caption">
                    <h3 class="blogPost-title">${idea.title}</h3>
                    <p class="description">${idea.description}
                        <br>
                        <span _ngcontent-c4="">
                           <!----><a _ngcontent-c4="" class="btn btn-join" role="button">JOIN</a>
                           <!---->
                           <!---->
                           |
                           <a _ngcontent-c4="" class="btn btn-share" role="button">SHARE</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>`;
    }